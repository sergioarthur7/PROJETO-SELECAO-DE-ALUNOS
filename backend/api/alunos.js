const db = require('./db');

module.exports = async (req, res) => {
  // Habilitar CORS
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

  // Pré-você tratar requisições OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Rota principal (GET)
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

    db.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao buscar alunos:", err);
        return res.status(500).json({ mensagem: "Erro ao buscar alunos." });
      }

      res.status(200).json(results);
    });
  } else {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(405).json({ mensagem: "Método não permitido." });
  }
};
