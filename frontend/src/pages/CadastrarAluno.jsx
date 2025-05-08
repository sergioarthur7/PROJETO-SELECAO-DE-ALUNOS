import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const CadastrarAluno = () => {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [comprovante, setComprovante] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const dadosParciais = {
      nome,
      cpf,
      data_nascimento: dataNascimento,
      comprovante_residencia: comprovante
    };

    // Salva temporariamente no localStorage
    localStorage.setItem("dadosAluno", JSON.stringify(dadosParciais));

    // Redireciona para formulário de notas
    navigate("/cadastrar-notas");
  };

  const fazerLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-body">
      <button className="menu-btn" onClick={() => setSidebarAberta(!sidebarAberta)}>☰</button>

      <div className={`sidebar ${sidebarAberta ? 'open' : ''}`}>
        <h2>Menu</h2>
        <a href="/dashboard">Dashboard</a>
        <a href="/cadastrar-aluno">Cadastrar Aluno</a>
        <button className="logout-link" onClick={fazerLogout}>Sair</button>
      </div>

      <div className="main-content">
        <h1>Cadastro - Dados Pessoais</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '6px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label>Nome</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>CPF</label>
            <input type="text" maxLength="11" value={cpf} onChange={e => setCpf(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Data de Nascimento</label>
            <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Comprovante de Residência</label>
            <select value={comprovante} onChange={e => setComprovante(e.target.value)} required>
              <option value="">Selecione</option>
              <option value="Água">Água</option>
              <option value="Energia">Energia</option>
              <option value="Telefone">Telefone</option>
              <option value="Correspondência bancária">Correspondência bancária</option>
            </select>
          </div>
          <button type="submit">Próximo</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarAluno;
