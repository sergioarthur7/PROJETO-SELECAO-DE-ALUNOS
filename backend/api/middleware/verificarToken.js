// backend/api/middleware/verificarToken.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'sua_chave_secreta';

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ mensagem: 'Token não fornecido.' });
  }

  const tokenSemPrefixo = token.split(' ')[1]; // Remove "Bearer " do token

  jwt.verify(tokenSemPrefixo, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }

    // O payload do token é decodificado e passado para as rotas
    req.cpf = decoded.cpf;  // Aqui, armazenamos o CPF do usuário, mas pode ser qualquer dado do token
    next(); // Passa a requisição para o próximo middleware ou rota
  });
};
