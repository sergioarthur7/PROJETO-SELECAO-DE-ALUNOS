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

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/", loginRoutes);
app.use("/gestores", gestoresRoutes);

// Middleware para verificar o token nas rotas protegidas
const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ mensagem: "Token não fornecido." });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
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

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
