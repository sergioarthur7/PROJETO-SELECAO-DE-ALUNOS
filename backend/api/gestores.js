// backend/api/gestores.js
const db = require('../db');
const verificarToken = require('./middleware/verificarToken');

module.exports = (req, res) => {
  if (req.method === 'GET') {
    verificarToken(req, res, () => {
      const query = 'SELECT nome, cpf FROM gestores';

      db.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao buscar gestores:', err);
          return res.status(500).json({ mensagem: 'Erro interno no servidor' });
        }

        res.json({ gestores: results });
      });
    });
  } else if (req.method === 'POST') {
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
  }
};
