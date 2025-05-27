// backend/api/cursos.js
import db from '../bd.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [cursos] = await db.query('SELECT id, nome, sigla FROM curso');
      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      res.status(500).json({ erro: 'Erro ao buscar cursos' });
    }
  } else {
    res.status(405).json({ erro: 'Método não permitido' });
  }
}
