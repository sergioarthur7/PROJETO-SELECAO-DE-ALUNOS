const express = require('express');
const router = express.Router();
const db = require('../db');  // Conexão com o banco de dados

router.post("/", (req, res) => {
  console.log("Recebido no cadastro:", req.body); // Verifique aqui o valor de media_final

  const { nome, cpf, data_nascimento, comprovante_residencia, media_final } = req.body;

  // Garantir que a média final seja um número
 
 

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
});


module.exports = router;
