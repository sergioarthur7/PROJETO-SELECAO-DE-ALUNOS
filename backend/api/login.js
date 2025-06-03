import getConnection from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const allowedOrigins = [
  'http://localhost:5173',
  'https://projeto-selecao-de-alunos.vercel.app'
];

const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin);
}

res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

if (req.method === 'OPTIONS') {
  return res.status(200).end();
}


  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido.' });
  }

  const SECRET_KEY = process.env.SECRET_KEY || 'sua_chave_secreta';
  const { cpf, senha } = req.body;

  try {
    const connection = await getConnection();
    const [results] = await connection.execute("SELECT * FROM gestores WHERE cpf = ?", [cpf]);

    if (!results.length) {
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
    console.error("Erro no login:", erro);
    return res.status(500).json({ mensagem: "Erro no servidor.", erro: erro.message });
  }
}
