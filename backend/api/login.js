import getConnection from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'sua_chave_secreta';

export default async function handler(req, res) {
  // 🔒 CORS Headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 🔁 Se for uma requisição OPTIONS (pré-vôo), encerra aqui
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' });
  }

  const { cpf, senha } = req.body;

  let connection;

  try {
    connection = await getConnection();

    const [results] = await connection.execute(
      'SELECT * FROM gestores WHERE cpf = ?',
      [cpf]
    );

    const usuario = results[0];

    if (!usuario) {
      return res.status(401).json({ mensagem: 'CPF ou senha incorretos (usuário não encontrado).' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'CPF ou senha incorretos (senha inválida).' });
    }

    const token = jwt.sign({ cpf: usuario.cpf }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ mensagem: 'Login bem-sucedido!', token });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ mensagem: 'Erro interno no servidor', erro: err.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
