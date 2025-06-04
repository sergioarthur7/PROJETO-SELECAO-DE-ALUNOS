const db = require('../db'); // conexão pool
const bcrypt = require('bcryptjs'); // usar bcryptjs!
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'sua_chave_secreta';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' });
  }

  const { cpf, senha } = req.body;

  try {
    db.query("SELECT * FROM gestores WHERE cpf = ?", [cpf], async (err, results) => {
      if (err) {
        console.error("Erro no SELECT da tabela 'gestores':", err);
        return res.status(500).json({ mensagem: "Erro no servidor ao buscar gestor." });
      }

      const usuario = results[0];

      if (!usuario) {
        return res.status(401).json({ mensagem: "CPF ou senha incorretos (usuário não encontrado)." });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "CPF ou senha incorretos (senha inválida)." });
      }

      const token = jwt.sign({ cpf }, SECRET_KEY, { expiresIn: "1h" });

      return res.status(200).json({ mensagem: "Login bem-sucedido!", token });
    });
  } catch (erro) {
    console.error("Erro geral no login:", erro);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};
