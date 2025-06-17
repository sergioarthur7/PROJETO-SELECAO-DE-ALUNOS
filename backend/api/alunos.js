import db from '../db.js';

export default async function handler(req, res) {
  // ✅ Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // ou 'http://localhost:5173'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Requisição de verificação do navegador (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const [results] = await db.query(`
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
      `);

      return res.status(200).json(results);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      return res.status(500).json({ mensagem: "Erro ao buscar alunos." });
    }
  } else {
    res.status(405).json({ mensagem: "Método não permitido." });
  }
}
