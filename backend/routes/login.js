const db = require('../db'); // conexão com MySQL
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'sua_chave_secreta';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' });
  }

  const { cpf, senha } = req.body;

  db.query("SELECT * FROM gestores WHERE cpf = ?", [cpf], async (err, results) => {
    if (err) {
      console.error("Erro no SELECT da tabela 'gestores':", err);
      return res.status(500).json({ mensagem: "Erro no servidor ao buscar gestor.", erro: err.message });
    }

    const usuario = results[0];

    if (!usuario) {
      return res.status(401).json({ mensagem: "CPF ou senha incorretos (usuário não encontrado)." });
    }

    try {
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "CPF ou senha incorretos (senha inválida)." });
      }

      const token = jwt.sign({ cpf }, SECRET_KEY, { expiresIn: "1h" });
      return res.json({ mensagem: "Login bem-sucedido!", token });

    } catch (erroComparacao) {
      console.error("Erro ao comparar a senha:", erroComparacao);
      return res.status(500).json({ mensagem: "Erro interno ao verificar senha.", erro: erroComparacao.message });
    }
  });
};
