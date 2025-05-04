import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Notwithstanding = () => {
  const [gestores, setGestores] = useState([]);
  const [formGestor, setFormGestor] = useState({ nome: '', cpf: '', senha: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [gestorSelecionado, setGestorSelecionado] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = modoEdicao
      ? `http://localhost:3000/alterar-gestor/${gestorSelecionado}`
      : 'http://localhost:3000/cadastrar-gestor';

    const method = modoEdicao ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formGestor),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.mensagem);
        resetarFormulario();
      })
      .catch(err => console.error(err));
  };

  const resetarFormulario = () => {
    setFormGestor({ nome: '', cpf: '', senha: '' });
    setModoEdicao(false);
    setGestorSelecionado('');
  };

  const handleSelecionarGestor = (cpf) => {
    const gestor = gestores.find(g => g.cpf === cpf);
    if (gestor) {
      setFormGestor({ nome: gestor.nome, cpf: gestor.cpf, senha: gestor.senha });
      setGestorSelecionado(gestor.cpf);
      setModoEdicao(true);
    } else {
      resetarFormulario();
    }
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

        <div className="form-container" style={formContainerStyle}>
          <h3>{modoEdicao ? "Editar Gestor" : "Cadastrar Novo Gestor"}</h3>

          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="gestor" style={labelStyle}>Selecionar Gestor</label>
            <select
              id="gestor"
              value={gestorSelecionado}
              onChange={(e) => handleSelecionarGestor(e.target.value)}
              style={inputStyle}
            >
              <option value="">Novo Gestor</option>
              {gestores.map((g, i) => (
                <option key={i} value={g.cpf}>{g.nome}</option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSubmit}>
            <InputGroup label="Nome" value={formGestor.nome} onChange={(e) => setFormGestor({ ...formGestor, nome: e.target.value })} />
            <InputGroup label="CPF" maxLength="11" value={formGestor.cpf} onChange={(e) => setFormGestor({ ...formGestor, cpf: e.target.value })} />
            <InputGroup label="Senha" type="password" value={formGestor.senha} onChange={(e) => setFormGestor({ ...formGestor, senha: e.target.value })} />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={buttonStyle}>
                {modoEdicao ? "Alterar" : "Cadastrar"}
              </button>
              {modoEdicao && (
                <button type="button" onClick={resetarFormulario} style={{ ...buttonStyle, backgroundColor: '#7f8c8d' }}>
                  Cancelar
                </button>
              )}
            </div>
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

// Estilos
const formContainerStyle = {
  maxWidth: '500px',
  backgroundColor: '#f4f4f4',
  padding: '20px',
  borderRadius: '6px',
  marginBottom: '20px',
  fontWeight: 'bold',
  color: 'black'
  
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
