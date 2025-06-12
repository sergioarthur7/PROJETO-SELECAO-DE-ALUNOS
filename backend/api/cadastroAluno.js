import db from '../db';

const allowedOrigins = [
  'http://localhost:5173',
  'https://projeto-selecao-de-alunos.vercel.app'
];

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Opcional, remova se quiser mais segurança
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ mensagem: `Método ${req.method} não permitido` });
  }

  const {
    nome,
    cpf,
    data_nascimento,
    comprovante_residencia,
    media_final,
    cota,
    curso
  } = req.body;

  if (!nome || !cpf || !data_nascimento || !comprovante_residencia || !curso) {
    return res.status(400).json({ mensagem: 'Dados incompletos.' });
  }

  try {
    const query = `
      INSERT INTO alunos
      (nome, cpf, data_nascimento, comprovante_residencia, media_final, Cota, Curso)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      nome,
      cpf,
      data_nascimento,
      comprovante_residencia,
      media_final || null,
      cota || null,
      curso,
    ]);

    return res.status(201).json({
      mensagem: 'Aluno cadastrado com sucesso!',
      alunoId: result.insertId
    });
  } catch (err) {
    console.error('Erro ao cadastrar aluno:', err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.', erro: err.message });
  }
}
