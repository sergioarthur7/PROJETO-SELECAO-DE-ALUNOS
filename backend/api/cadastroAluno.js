import db from '../db'; // seu pool mysql2

export default async function handler(req, res) {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://projeto-selecao-de-alunos.vercel.app'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
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

      res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!', alunoId: result.insertId });

    } catch (err) {
      console.error('Erro interno:', err);
      res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  } else {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
