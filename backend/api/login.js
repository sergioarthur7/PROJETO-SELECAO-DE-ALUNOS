// backend/api/login.js
import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Adiciona headers de CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ou use 'http://localhost:5173' para restringir
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Trata requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido.' });
  }

  const SECRET_KEY = process.env.SECRET_KEY || 'sua_chave_secreta';
  const { cpf, senha } = req.body;

  db.query("SELECT * FROM gestores WHERE cpf = ?", [cpf], async (err, results) => {
    if (err) {
      console.error("Erro no SELECT da tabela 'gestores':", err);
      return res.status(500).json({ mensagem: "Erro no servidor ao buscar gestor.", erro: err.message });
    }

    const usuario = results[0];

    if (!usuario) {
      return res.status(401).json({ mensagem: "CPF ou senha incorretos." });
    }

    try {
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "CPF ou senha incorretos." });
      }

      const token = jwt.sign({ cpf }, SECRET_KEY, { expiresIn: "1h" });
      return res.status(200).json({ mensagem: "Login bem-sucedido!", token });

    } catch (erroComparacao) {
      console.error("Erro ao comparar a senha:", erroComparacao);
      return res.status(500).json({ mensagem: "Erro interno ao verificar senha.", erro: erroComparacao.message });
    }
  });
}
