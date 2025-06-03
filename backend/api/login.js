import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido.' });
  }

  const { cpf, senha } = req.body;
  const SECRET_KEY = process.env.SECRET_KEY || 'sua_chave_secreta';

  try {
    const [results] = await db.query("SELECT * FROM gestores WHERE cpf = ?", [cpf]);

    if (results.length === 0) {
      return res.status(401).json({ mensagem: "CPF ou senha incorretos." });
    }

    const usuario = results[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "CPF ou senha incorretos." });
    }

    const token = jwt.sign({ cpf }, SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ mensagem: "Login bem-sucedido!", token });

  } catch (erro) {
    console.error("Erro ao processar login:", erro);
    return res.status(500).json({ mensagem: "Erro interno no servidor.", erro: erro.message });
  }
}
