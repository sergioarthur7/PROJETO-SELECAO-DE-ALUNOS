// backend/api/alunos.js
import db from '../db.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // ou seu domínio
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Resposta ao preflight
  }

  if (req.method === 'GET') {
    try {
      const [results] = await db.query(`
        SELECT 
          a.nome, 
          a.cpf, 
          a.data_nascimento,
          ROUND(AVG(n.nota), 2) AS merito_final
        FROM alunos a
        JOIN notas n ON a.id = n.aluno_id
        GROUP BY a.id
      `);

      return res.status(200).json(results);
    } catch (err) {
      console.error('Erro no banco de dados:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  } else {
    return res.status(405).json({ erro: 'Método não permitido.' });
  }
}
