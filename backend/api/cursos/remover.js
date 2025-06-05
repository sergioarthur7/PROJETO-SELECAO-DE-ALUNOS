// 📁 backend/api/cursos/remover.js
import { db } from '../bd';

const COLUNA_CURSO = 'Curso';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { sigla } = req.query;

  if (!sigla || typeof sigla !== 'string' || !sigla.trim()) {
    return res.status(400).json({ erro: 'Sigla não informada ou inválida' });
  }

  const cursoRemover = sigla.trim();

  try {
    const [rows] = await db.query(`SHOW COLUMNS FROM alunos LIKE ?`, [COLUNA_CURSO]);
    if (!rows.length) {
      return res.status(404).json({ erro: `Coluna ${COLUNA_CURSO} não encontrada` });
    }

    const atualEnum = rows[0].Type;
    let valores = atualEnum
      .replace(/^enum\(|\)$/g, '')
      .split(',')
      .map(v => v.replace(/'/g, ''));

    if (!valores.includes(cursoRemover)) {
      return res.status(404).json({ erro: 'Curso não encontrado no ENUM' });
    }

    // Evitar remover o último curso (ENUM não pode ficar vazio)
    if (valores.length === 1) {
      return res.status(400).json({ erro: 'Não é permitido remover o último curso do ENUM' });
    }

    valores = valores.filter(v => v !== cursoRemover);
    const enumStr = valores.map(v => `'${v}'`).join(',');

    await db.query(`ALTER TABLE alunos MODIFY COLUMN ${COLUNA_CURSO} ENUM(${enumStr}) NOT NULL`);

    res.status(200).json({ mensagem: 'Curso removido com sucesso' });
  } catch (err) {
    console.error('Erro ao remover curso:', err);
    res.status(500).json({ erro: 'Erro ao remover curso' });
  }
}
