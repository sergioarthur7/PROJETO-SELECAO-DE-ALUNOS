import React, { useState } from 'react';
import "../styles/Login.css";

// ✅ Usa variável de ambiente para a URL da API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();

    // 🔧 Limpa o CPF (remove pontos, traços, letras, espaços etc.)
    const cpfLimpo = cpf.replace(/\D/g, '');

    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf: cpfLimpo, senha }),
    })
      .then((res) => res.json())
      .then((dados) => {
        if (dados.token) {
          localStorage.setItem('token', dados.token);
          alert('Login bem-sucedido!');
          window.location.href = '/dashboard';
        } else {
          alert(dados.mensagem);
        }
      })
      .catch((erro) => {
        console.error('Erro na requisição:', erro);
        alert('Erro de conexão com o servidor.');
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="logo">
          <img src="/img/images.png" alt="Logotipo" />
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
