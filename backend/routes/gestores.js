
const express = require('express');
const router = express.Router();
const db = require('../db'); // conexão com MySQL

// Rota para listar todos os gestores
router.get('/gestores', (req, res) => {
  const query = 'SELECT nome, cpf FROM gestores';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar gestores:', err);
      return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }

    res.json({ gestores: results });
  });
});

// Rota para cadastrar novo gestor
router.post('/cadastrar-gestor', (req, res) => {
  const { nome, cpf, senha } = req.body;

  if (!nome || !cpf || !senha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' });
  }

  const query = 'INSERT INTO gestores (nome, cpf, senha) VALUES (?, ?, ?)';

  db.query(query, [nome, cpf, senha], (err) => {
    if (err) {
      console.error('Erro ao cadastrar gestor:', err);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar gestor' });
    }

    res.json({ mensagem: 'Gestor cadastrado com sucesso!' });
  });
});

// Rota para editar um gestor existente
router.put('/alterar-gestor/:cpf', (req, res) => {
  const cpfOriginal = req.params.cpf;
  const { nome, cpf, senha } = req.body;

  const query = 'UPDATE gestores SET nome = ?, cpf = ?, senha = ? WHERE cpf = ?';

  db.query(query, [nome, cpf, senha, cpfOriginal], (err) => {
    if (err) {
      console.error('Erro ao alterar gestor:', err);
      return res.status(500).json({ mensagem: 'Erro ao alterar gestor' });
    }

    res.json({ mensagem: 'Gestor alterado com sucesso!' });
  });
});

module.exports = router;
