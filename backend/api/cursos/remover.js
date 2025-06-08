// 📁 backend/api/cursos/remover.js
import { db } from '../../db';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'DELETE') {
    const { sigla } = req.query;

    if (!sigla) return res.status(400).json({ erro: 'Sigla não informada' });

    try {
      const [rows] = await db.query("SHOW COLUMNS FROM alunos LIKE 'Curso'");
      const atualEnum = rows[0].Type;
      let valores = atualEnum
        .replace(/^enum\(|\)$/g, '')
        .split(',')
        .map((v) => v.replace(/'/g, ''));

      if (!valores.includes(sigla)) {
        return res.status(404).json({ erro: 'Curso não encontrado no ENUM' });
      }

      valores = valores.filter((v) => v !== sigla);
      const enumStr = valores.map((v) => `'${v}'`).join(',');

      await db.query(`ALTER TABLE alunos MODIFY COLUMN Curso ENUM(${enumStr})`);
      res.status(200).json({ mensagem: 'Curso removido com sucesso' });
    } catch (err) {
      console.error('Erro ao remover curso:', err);
      res.status(500).json({ erro: 'Erro ao remover curso' });
    }
  } else {
    res.status(405).json({ erro: 'Método não permitido' });
  }
}
