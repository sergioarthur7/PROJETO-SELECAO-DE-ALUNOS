import getConnection from '../db.js'; // Caminho relativo correto
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // CORS
  const allowedOrigins = [
    'https://projeto-selecao-de-alunos.vercel.app',
    'https://projeto-selecao-de-alunos-3rsc.vercel.app',
    'http://localhost:5173',
  ];

  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' });
  }

  try {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
      return res.status(400).json({ mensagem: 'CPF e senha são obrigatórios.' });
    }

    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM gestores WHERE cpf = ?', [cpf]);

    if (rows.length === 0) {
      return res.status(401).json({ mensagem: 'Gestor não encontrado.' });
    }

    const gestor = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, gestor.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: gestor.id, cpf: gestor.cpf }, process.env.JWT_SECRET || 'segredo', {
      expiresIn: '2h',
    });

    res.status(200).json({ token, nome: gestor.nome });
  } catch (err) {
    console.error('Erro no login.js:', err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}
