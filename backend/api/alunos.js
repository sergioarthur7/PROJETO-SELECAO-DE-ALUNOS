// backend/api/alunos.js
const db = require('../db');

module.exports = (req, res) => {
  if (req.method === 'GET') {
    const query = `
      SELECT a.nome, a.cpf, 
             ROUND(AVG(n.nota), 2) AS media,
             CASE WHEN AVG(n.nota) >= 8 THEN 'Aprovado' ELSE 'Reprovado' END AS status
      FROM alunos a
      JOIN notas n ON a.id = n.aluno_id
      GROUP BY a.id
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao buscar alunos:", err);
        return res.status(500).json({ mensagem: "Erro ao buscar alunos." });
      }

      res.json(results);
    });
  }
};
