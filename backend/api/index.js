import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || "sua_chave_secreta";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import getConnection from "../db.js";  // chamei de getConnection para ficar claro
import loginRoutes from "../routes/login.js";
import gestoresRoutes from "../routes/gestores.js";
import cadastroAlunoRoutes from "../routes/cadastroAluno.js";

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://projeto-selecao-de-alunos.vercel.app"], 
  credentials: true,
}));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", loginRoutes);
app.use("/gestores", gestoresRoutes);
app.use("/alunos", cadastroAlunoRoutes);

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ mensagem: "Token não fornecido." });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: "Token inválido." });
    req.cpf = decoded.cpf;
    next();
  });
};

// Rotas que usam o banco direto, por exemplo:
app.get("/alunos-media", verificarToken, async (req, res) => {
  const query = `
    SELECT a.nome, a.cpf, 
           ROUND(AVG(n.nota), 2) AS media,
           CASE WHEN AVG(n.nota) >= 8 THEN 'Aprovado' ELSE 'Reprovado' END AS status
    FROM alunos a
    JOIN notas n ON a.id = n.aluno_id
    GROUP BY a.id
  `;

  let connection;
  try {
    connection = await getConnection();
    const [results] = await connection.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao buscar alunos:", err);
    res.status(500).json({ mensagem: "Erro ao buscar alunos." });
  } finally {
    if (connection) await connection.end();
  }
});

// mesma coisa para o POST /alunos se necessário...

export default serverless(app);
