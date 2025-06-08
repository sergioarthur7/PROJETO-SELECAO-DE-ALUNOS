// 📁 backend/api/cursos/adicionar.js
import { db } from '../bd';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { nome, sigla } = req.body;
    const novoCurso = sigla.trim();

    if (!novoCurso) return res.status(400).json({ erro: 'Sigla é obrigatória' });

    try {
      const [rows] = await db.query("SHOW COLUMNS FROM alunos LIKE 'Curso'");
      const atualEnum = rows[0].Type;
      let valores = atualEnum
        .replace(/^enum\(|\)$/g, '')
        .split(',')
        .map((v) => v.replace(/'/g, ''));

      if (valores.includes(novoCurso)) {
        return res.status(400).json({ erro: 'Curso já existe' });
      }

      valores.push(novoCurso);
      const enumStr = valores.map((v) => `'${v}'`).join(',');

      await db.query(`ALTER TABLE alunos MODIFY COLUMN Curso ENUM(${enumStr})`);
      res.status(201).json({ nome, sigla });
    } catch (err) {
      console.error('Erro ao adicionar curso:', err);
      res.status(500).json({ erro: 'Erro ao adicionar curso' });
    }
  } else {
    res.status(405).json({ erro: 'Método não permitido' });
  }
}
