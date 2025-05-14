const db = require('../db');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, cpf, data_nascimento, comprovante_residencia, media_final } = req.body;

    const query = `
      INSERT INTO alunos (nome, cpf, data_nascimento, comprovante_residencia, media_final)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [nome, cpf, data_nascimento, comprovante_residencia, media_final], (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar aluno:", err);
        return res.status(500).json({ mensagem: "Erro ao cadastrar aluno." });
      }

      res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!", alunoId: result.insertId });
    });
  } else {
    res.status(405).json({ mensagem: 'Método não permitido' });
  }
}
