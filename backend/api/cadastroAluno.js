// backend/routes/cadastroAluno.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { nome, cpf, data_nascimento, comprovante_residencia, media_final, cota, curso } = req.body;

  if (!nome || !cpf || !data_nascimento || !comprovante_residencia || !curso) {
    return res.status(400).json({ mensagem: 'Dados incompletos.' });
  }

  const query = `
    INSERT INTO alunos
    (nome, cpf, data_nascimento, comprovante_residencia, media_final, Cota, Curso)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      nome,
      cpf,
      data_nascimento,
      comprovante_residencia,
      media_final || null,
      cota || null,
      curso,
    ],
    (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar aluno:', err);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar aluno.' });
      }

      res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!', alunoId: result.insertId });
    }
  );
});

export default router;
