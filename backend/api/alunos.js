// backend/api/alunos.js
let db;

try {
  db = (await import('../db.js')).default;
} catch (err) {
  console.error('Erro ao importar o db.js:', err);
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

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!db) {
    return res.status(500).json({ mensagem: 'Erro na conexão com o banco de dados.' });
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
      return res.status(200).json(results);
    } catch (err) {
      console.error('Erro ao buscar alunos:', err.message);
      return res.status(500).json({ mensagem: 'Erro ao buscar alunos.', erro: err.message });
    }
  }

  return res.status(405).json({ mensagem: `Método ${req.method} não permitido.` });
}
