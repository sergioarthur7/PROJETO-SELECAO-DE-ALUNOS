import React, { useState } from 'react';

const CadastrarAluno = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const aluno = { nome, cpf, dataNascimento };

    console.log("Aluno cadastrado:", aluno);
    alert("Aluno cadastrado com sucesso!");

    // Reseta o formulário após cadastro
    setNome('');
    setCpf('');
    setDataNascimento('');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redireciona para a página inicial
  };

  return (
    <div className="main-content" style={{ display: 'flex', fontFamily: 'Arial, sans-serif', height: '100vh' }}>
      {/* Barra lateral */}
      <div className="sidebar" style={{ width: '220px', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2>Gestor</h2>
        <a href="/dashboard" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '15px', fontSize: '16px', padding: '8px', borderRadius: '4px' }}>Dashboard</a>
        <a href="/cadastrar-aluno" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '15px', fontSize: '16px', padding: '8px', borderRadius: '4px' }}>Cadastrar Aluno</a>
      </div>

      {/* Conteúdo principal */}
      <div className="main-content" style={{ flexGrow: '1', padding: '30px' }}>
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Cadastrar Aluno</h1>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Sair</button>
        </div>

        {/* Formulário para cadastrar aluno */}
        <div className="form-container" style={{ maxWidth: '500px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '6px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="nome" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Nome do Aluno</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="cpf" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                maxLength="11"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="data_nascimento" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Data de Nascimento</label>
              <input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <button
              type="submit"
              style={{ padding: '10px 20px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastrarAluno;
