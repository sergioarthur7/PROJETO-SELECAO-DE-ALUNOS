// backend/api/cadastroAluno.js
const db = require('../db');

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { cpf, nome, data_nascimento, comprovante_residencia, media_final } = req.body;

    if (!cpf || !nome || !data_nascimento || !comprovante_residencia || media_final === undefined || isNaN(media_final)) {
      return res.status(400).json({ mensagem: "Dados inválidos ou incompletos." });
    }

    const sql = `
      INSERT INTO alunos (cpf, nome, data_nascimento, comprovante_residencia, media_final)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [cpf, nome, data_nascimento, comprovante_residencia, media_final], (err, result) => {
      if (err) {
        console.error("Erro ao inserir aluno:", err);
        return res.status(500).json({ mensagem: "Erro ao cadastrar aluno." });
      }

      res.status(200).json({ mensagem: "Aluno cadastrado com sucesso." });
    });
  }
};
