import React, { useState } from 'react';
import "../styles/Login.css"; // Você pode criar este CSS separado ou usar styled-components

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, senha }),
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
        </div>

        <br />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
