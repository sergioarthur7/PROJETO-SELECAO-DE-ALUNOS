import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notwithstanding = () => {
  const [gestores, setGestores] = useState([]);
  const [novoGestor, setNovoGestor] = useState({ nome: '', cpf: '', senha: '' });
  const [gestorSelecionado, setGestorSelecionado] = useState('');
  const [gestorEditado, setGestorEditado] = useState({ nome: '', cpf: '', senha: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/gestores', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => response.json())
      .then(data => setGestores(data.gestores))
      .catch(err => console.error(err));
  }, []);

  const handleCadastro = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/cadastrar-gestor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(novoGestor),
    })
      .then(res => res.json())
      .then(data => alert(data.mensagem))
      .catch(err => console.error(err));
  };

  const handleAlteracao = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/alterar-gestor/${gestorSelecionado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(gestorEditado),
    })
      .then(res => res.json())
      .then(data => alert(data.mensagem))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div className="sidebar" style={{ width: '220px', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '30px' }}>Gestor</h2>
        <a href="/dashboard" className="nav-link">Dashboard</a>
        <a href="/cadastrar-aluno" className="nav-link">Cadastrar Aluno</a>
        <a href="/notwithstanding" className="nav-link">Notwithstanding</a>
      </div>

      <div className="main-content" style={{ flex: 1, padding: '30px' }}>
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1>Notwithstanding - Gestão de Gestores</h1>
        </div>

        {/* Cadastrar Novo Gestor */}
        <div className="form-container" style={formContainerStyle}>
          <h3>Cadastrar Novo Gestor</h3>
          <form onSubmit={handleCadastro}>
            <InputGroup label="Nome" value={novoGestor.nome} onChange={(e) => setNovoGestor({ ...novoGestor, nome: e.target.value })} />
            <InputGroup label="CPF" maxLength="11" value={novoGestor.cpf} onChange={(e) => setNovoGestor({ ...novoGestor, cpf: e.target.value })} />
            <InputGroup label="Senha" type="password" value={novoGestor.senha} onChange={(e) => setNovoGestor({ ...novoGestor, senha: e.target.value })} />
            <button type="submit" style={buttonStyle}>Cadastrar</button>
          </form>
        </div>

        {/* Alterar Gestor Existente */}
        <div className="form-container" style={formContainerStyle}>
          <h3>Alterar Gestor Existente</h3>
          <form onSubmit={handleAlteracao}>
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="gestor" style={labelStyle}>Selecione o Gestor</label>
              <select
                id="gestor"
                value={gestorSelecionado}
                onChange={(e) => setGestorSelecionado(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">Selecione</option>
                {gestores.map((g, i) => (
                  <option key={i} value={g.cpf}>{g.nome}</option>
                ))}
              </select>
            </div>
            <InputGroup label="Nome" value={gestorEditado.nome} onChange={(e) => setGestorEditado({ ...gestorEditado, nome: e.target.value })} />
            <InputGroup label="CPF" maxLength="11" value={gestorEditado.cpf} onChange={(e) => setGestorEditado({ ...gestorEditado, cpf: e.target.value })} />
            <InputGroup label="Senha" type="password" value={gestorEditado.senha} onChange={(e) => setGestorEditado({ ...gestorEditado, senha: e.target.value })} />
            <button type="submit" style={buttonStyle}>Alterar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, type = "text", value, onChange, maxLength }) => (
  <div className="form-group" style={formGroupStyle}>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      required
      style={inputStyle}
    />
  </div>
);

// Estilos inline (você pode mover isso para um arquivo CSS)
const formContainerStyle = {
  maxWidth: '500px',
  backgroundColor: '#f4f4f4',
  padding: '20px',
  borderRadius: '6px',
  marginBottom: '20px'
};

const formGroupStyle = {
  marginBottom: '15px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#2980b9',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Notwithstanding;
