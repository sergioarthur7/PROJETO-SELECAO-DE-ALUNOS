// backend/api/cursos.js
import express from 'express';
import getConnection from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const [rows] = await connection.query("SHOW COLUMNS FROM alunos LIKE 'Curso'");

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Coluna Curso não encontrada.' });
    }

    const enumDef = rows[0].Type; // ex: enum('Curso1','Curso2','Curso3')

    const cursos = enumDef
      .replace(/^enum\(/, '')
      .replace(/\)$/, '')
      .split(',')
      .map((c) => c.replace(/'/g, ''));

    const cursosFormatados = cursos.map((curso) => ({
      id: curso,
      nome: curso,
    }));

    res.status(200).json(cursosFormatados);

  } catch (err) {
    console.error('Erro ao obter cursos:', err);
    res.status(500).json({ erro: 'Erro ao obter cursos' });

  } finally {
    if (connection) await connection.end();
  }
});

export default router;
