const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || "sua_chave_secreta";

// Banco de dados e rotas
const db = require("./db");
const loginRoutes = require("./routes/login");
const gestoresRoutes = require("./routes/gestores");
const cadastroAlunoRoutes = require("./routes/cadastroAluno");

// Middleware global
app.use(express.json());
app.use(cors({
  origin: "https://projeto-selecao-de-alunos-kz1q.vercel.app",
  credentials: true,
}));

// Arquivos estáticos (caso precise usar futuramente)
app.use(express.static(path.join(__dirname, "public")));

// Rotas principais
app.use("/", loginRoutes);
app.use("/gestores", gestoresRoutes);
app.use("/alunos", cadastroAlunoRoutes);

// Middleware para proteger rotas com token JWT
const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ mensagem: "Token não fornecido." });

  const token = authHeader.split(" ")[1]; // Ex: "Bearer TOKEN"
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: "Token inválido." });
    req.cpf = decoded.cpf;
    next();
  });
};

// Rota protegida: buscar alunos com médias calculadas
app.get("/alunos", verificarToken, (req, res) => {
  const query = `
    SELECT a.nome, a.cpf, 
           ROUND(AVG(n.nota), 2) AS media,
           CASE WHEN AVG(n.nota) >= 8 THEN 'Aprovado' ELSE 'Reprovado' END AS status
    FROM alunos a
    JOIN notas n ON a.id = n.aluno_id
    GROUP BY a.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar alunos:", err);
      return res.status(500).json({ mensagem: "Erro ao buscar alunos." });
    }
    res.json(results);
  });
});

// Rota pública: cadastrar aluno com média final (sem login)
app.post("/alunos", (req, res) => {
  const {
    cpf,
    nome,
    data_nascimento,
    comprovante_residencia,
    media_final,
  } = req.body;

  if (!cpf || !nome || !data_nascimento || !comprovante_residencia || isNaN(media_final)) {
    return res.status(400).json({ mensagem: "Dados inválidos ou incompletos." });
  }

  const sql = `
    INSERT INTO alunos (cpf, nome, data_nascimento, comprovante_residencia, media_final)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [cpf, nome, data_nascimento, comprovante_residencia, media_final], (err) => {
    if (err) {
      console.error("Erro ao inserir aluno:", err);
      return res.status(500).json({ mensagem: "Erro ao cadastrar aluno." });
    }
    res.status(200).json({ mensagem: "Aluno cadastrado com sucesso." });
  });
});

// Exporta para a Vercel (serverless)
module.exports = app;
