// 📁 backend/api/cursos/obter.js
import { db } from '../bd';

const COLUNA_CURSO = 'Curso';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const [rows] = await db.query(`SHOW COLUMNS FROM alunos LIKE ?`, [COLUNA_CURSO]);
    if (!rows.length) {
      return res.status(404).json({ erro: `Coluna ${COLUNA_CURSO} não encontrada` });
    }

    const enumDef = rows[0].Type; // ex: enum('ENG','MAT','BIO')
    const cursos = enumDef
      .replace(/^enum\(|\)$/g, '')
      .split(',')
      .map(c => c.replace(/'/g, ''));

    res.status(200).json(cursos);
  } catch (err) {
    console.error('Erro ao obter cursos:', err);
    res.status(500).json({ erro: 'Erro ao obter cursos' });
  }
}
