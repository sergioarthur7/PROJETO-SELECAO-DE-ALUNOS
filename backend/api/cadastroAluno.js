const db = require('../db');

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const {
      cpf, nome, data_nascimento, comprovante_residencia, media_final
    } = req.body;

    if (!cpf || !nome || !data_nascimento || !comprovante_residencia || isNaN(media_final)) {
      return res.status(400).json({ mensagem: "Dados inválidos ou incompletos." });
    }

    const insertAluno = `
      INSERT INTO alunos (cpf, nome, data_nascimento, comprovante_residencia, media_final)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertAluno, [cpf, nome, data_nascimento, comprovante_residencia, media_final], (err, result) => {
      if (err) {
        console.error("Erro ao inserir aluno:", err);
        return res.status(500).json({ mensagem: "Erro ao cadastrar aluno." });
      }

      return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso." });
    });
  } else {
    return res.status(405).json({ mensagem: "Método não suportado." });
  }
};
