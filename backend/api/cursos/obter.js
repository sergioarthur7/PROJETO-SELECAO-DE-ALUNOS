import { getDb } from '../../db';

export default async function handler(req, res) {
  // Configura CORS para permitir requisição do frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const db = await getDb();

    const [rows] = await db.query("SHOW COLUMNS FROM alunos LIKE 'Curso'");
    if (!rows.length) {
      return res.status(404).json({ erro: 'Coluna Curso não encontrada' });
    }

    const enumDef = rows[0].Type;
    if (!enumDef.startsWith('enum(')) {
      return res.status(400).json({ erro: 'Coluna Curso não é do tipo enum' });
    }

    // Remove enum(...) e divide os valores
    const cursos = enumDef
      .slice(5, -1) // tira "enum(" no começo e ")" no fim
      .split(',')
      .map(c => c.trim().replace(/^'(.*)'$/, '$1'));

    return res.status(200).json(cursos);

  } catch (err) {
    console.error('Erro ao obter cursos:', err);
    return res.status(500).json({ erro: 'Erro ao obter cursos' });
  }
}
