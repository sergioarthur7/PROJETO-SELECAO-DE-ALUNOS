// index.js

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "sua_chave_secreta"; // Use uma chave mais segura no .env

const db = require("./db"); // Certifique-se que db.js está configurado corretamente
const loginRoutes = require("./routes/login");
const gestoresRoutes = require("./routes/gestores");
const cadastroAlunoRoutes = require("./routes/cadastroAluno");

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // frontend do Vite
  credentials: true
}));

app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/", loginRoutes);
app.use("/gestores", gestoresRoutes);
// Alteração: mudar "/cadastrar" para "/alunos"
app.use("/alunos", cadastroAlunoRoutes);

// Middleware para verificar o token nas rotas protegidas
const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ mensagem: "Token não fornecido." });

  const tokenSemPrefixo = token.split(" ")[1]; // Pegando o token sem o "Bearer"

  jwt.verify(tokenSemPrefixo, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: "Token inválido." });

    req.cpf = decoded.cpf;
    next();
  });
};

// Rota protegida que busca alunos com médias e status de aprovação
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

// Rota para cadastrar aluno com média final
app.post("/alunos", (req, res) => {
  const {
    cpf,
    nome,
    data_nascimento,
    comprovante_residencia,
    media_final
  } = req.body;

  console.log("Recebido do frontend:", req.body);

  if (
    !cpf || !nome || !data_nascimento || !comprovante_residencia ||
    media_final === undefined || isNaN(media_final)
  ) {
    return res.status(400).json({ mensagem: "Dados inválidos ou incompletos." });
  }

  const sql = `
    INSERT INTO alunos (cpf, nome, data_nascimento, comprovante_residencia, media_final)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [cpf, nome, data_nascimento, comprovante_residencia, media_final], (err, result) => {
    if (err) {
      console.error("Erro ao inserir aluno:", err);
      return res.status(500).json({ mensagem: "Erro ao cadastrar aluno." });
    }

    res.status(200).json({ mensagem: "Aluno cadastrado com sucesso." });
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
