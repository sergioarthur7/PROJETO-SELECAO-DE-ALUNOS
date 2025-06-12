// backend/api/login.js

let db;
try {
  db = (await import('./db')).default;
} catch (err) {
  console.error('Erro ao importar o banco de dados:', err);
}

const allowedOrigins = [
  'http://localhost:5173',
  'https://projeto-selecao-de-alunos.vercel.app'
];

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ mensagem: `Método ${req.method} não permitido` });
  }

  if (!db) {
    return res.status(500).json({ mensagem: 'Falha ao conectar ao banco de dados.' });
  }

  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ mensagem: 'CPF e senha são obrigatórios.' });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM gestores WHERE cpf = ? AND senha = ?', [cpf, senha]);

    if (rows.length === 0) {
      return res.status(401).json({ mensagem: 'CPF ou senha inválidos.' });
    }

    return res.status(200).json({ mensagem: 'Login bem-sucedido.', gestor: rows[0] });
  } catch (err) {
    console.error('Erro ao realizar login:', err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.', erro: err.message });
  }
}
