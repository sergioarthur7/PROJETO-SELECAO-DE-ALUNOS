import db from '../db.js'; // Ajuste conforme a localização real do seu db.js

export default async function handler(req, res) {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://projeto-selecao-de-alunos.vercel.app'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const query = `
      SELECT 
        a.nome, 
        a.cpf, 
        a.data_nascimento,
        ROUND(AVG(n.nota), 2) AS merito_final,
        CASE 
          WHEN AVG(n.nota) >= 8 THEN 'Aprovado' 
          ELSE 'Reprovado' 
        END AS status
      FROM alunos a
      JOIN notas n ON a.id = n.aluno_id
      GROUP BY a.id
    `;

    try {
      const [results] = await db.promise().query(query);
      res.status(200).json(results);
    } catch (err) {
      console.error('Erro ao buscar alunos:', err);
      res.status(500).json({ mensagem: 'Erro ao buscar alunos.' });
    }
  } else {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(405).json({ mensagem: 'Método não permitido.' });
  }
}
