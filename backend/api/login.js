import getConnection from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // 🔧 Cabeçalhos de CORS
  const allowedOrigins = [
    'https://projeto-selecao-de-alunos.vercel.app',
    'https://projeto-selecao-de-alunos-3rsc.vercel.app',
    'http://localhost:5173',
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // resposta para preflight
  }

  try {
    // 👇 ...sua lógica normal do login aqui
  } catch (err) {
    console.error('Erro interno:', err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}
