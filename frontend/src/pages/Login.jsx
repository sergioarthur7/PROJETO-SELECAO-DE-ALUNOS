import React, { useState } from 'react';

// ✅ Usa URL pública da Vercel por padrão
const API_URL = import.meta.env.VITE_API_URL || "https://projeto-selecao-de-alunos.vercel.app";

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const cpfLimpo = cpf.replace(/\D/g, '');

fetch(`${API_URL}/api/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ cpf: cpfLimpo, senha }),
})
  .then(async (res) => {
    const data = await res.json();
    console.log("Resposta da API:", data);
    if (!res.ok) {
      throw new Error(data.mensagem || "Erro desconhecido");
    }
    localStorage.setItem('token', data.token);
    alert('Login bem-sucedido!');
    window.location.href = '/dashboard';
  })
  .catch((erro) => {
    console.error('Erro na requisição:', erro);
    alert('Erro de conexão ou autenticação.');
  });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="logo">
          <img src="/img/images.png" alt="Logotipo" /> {/* Corrigido o caminho */}
        </div>

        <div className="input-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <p style={{ marginTop: '10px', fontSize: '14px' }}>
            <a href="#" style={{ color: '#2980b9' }}>Esqueceu sua senha?</a>
          </p>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
