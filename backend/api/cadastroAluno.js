import db from '../db';
import cors from '../lib/cors-middleware';

export default async function handler(req, res) {
  await cors(req, res); // middleware CORS funcionando na Vercel

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // pré-flight ok
  }

  if (req.method === 'POST') {
    try {
      const {
        nome,
        cpf,
        data_nascimento,
        comprovante_residencia,
        media_final,
        cota,
        curso
      } = req.body;

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
    } catch (err) {
      console.error('Erro interno:', err);
      res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  } else {
    res.status(405).json({ mensagem: 'Método não permitido.' });
  }
}
