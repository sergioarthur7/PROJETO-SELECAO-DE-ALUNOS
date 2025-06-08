// 📁 backend/api/cursos/obter.js
import { db } from '../bd';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const [rows] = await db.query("SHOW COLUMNS FROM alunos LIKE 'Curso'");
      const enumDef = rows[0].Type;
      const cursos = enumDef
        .replace(/^enum\(|\)$/g, '')
        .split(',')
        .map((c) => c.replace(/'/g, ''));

      res.status(200).json(cursos);
    } catch (err) {
      console.error('Erro ao obter cursos:', err);
      res.status(500).json({ erro: 'Erro ao obter cursos' });
    }
  } else {
    res.status(405).json({ erro: 'Método não permitido' });
  }
}
