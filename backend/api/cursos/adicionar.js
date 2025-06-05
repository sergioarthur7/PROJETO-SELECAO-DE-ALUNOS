// 📁 backend/api/cursos/adicionar.js
import { db } from '../bd';

const COLUNA_CURSO = 'Curso';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { sigla } = req.body;

  if (!sigla || typeof sigla !== 'string' || !sigla.trim()) {
    return res.status(400).json({ erro: 'Sigla é obrigatória e deve ser string não vazia' });
  }

  const novoCurso = sigla.trim();

  try {
    const [rows] = await db.query(`SHOW COLUMNS FROM alunos LIKE ?`, [COLUNA_CURSO]);
    if (!rows.length) {
      return res.status(404).json({ erro: `Coluna ${COLUNA_CURSO} não encontrada` });
    }

    const atualEnum = rows[0].Type;
    const valores = atualEnum
      .replace(/^enum\(|\)$/g, '')
      .split(',')
      .map(v => v.replace(/'/g, ''));

    if (valores.includes(novoCurso)) {
      return res.status(400).json({ erro: 'Curso já existe' });
    }

    valores.push(novoCurso);
    const enumStr = valores.map(v => `'${v}'`).join(',');

    await db.query(`ALTER TABLE alunos MODIFY COLUMN ${COLUNA_CURSO} ENUM(${enumStr}) NOT NULL`);

    res.status(201).json({ sigla: novoCurso });
  } catch (err) {
    console.error('Erro ao adicionar curso:', err);
    res.status(500).json({ erro: 'Erro ao adicionar curso' });
  }
}
