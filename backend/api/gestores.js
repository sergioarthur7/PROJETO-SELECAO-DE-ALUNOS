const db = require('../db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const query = 'SELECT nome, cpf FROM gestores';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar gestores:', err);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
      }

      res.json({ gestores: results });
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

  } else if (req.method === 'PUT') {
    const { cpfOriginal, nome, cpf, senha } = req.body;

    const query = 'UPDATE gestores SET nome = ?, cpf = ?, senha = ? WHERE cpf = ?';

    db.query(query, [nome, cpf, senha, cpfOriginal], (err) => {
      if (err) {
        console.error('Erro ao alterar gestor:', err);
        return res.status(500).json({ mensagem: 'Erro ao alterar gestor' });
      }

      res.json({ mensagem: 'Gestor alterado com sucesso!' });
    });

  } else {
    res.status(405).json({ mensagem: 'Método não permitido' });
  }
}
