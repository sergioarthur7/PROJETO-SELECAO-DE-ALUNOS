import db from '../db.js'; // ou ajuste o caminho se estiver fora da pasta api

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight OK
  }

  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ mensagem: 'Método não permitido.' });
  }
}
