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
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dadosAluno = {
      nome,
      cpf,
      data_nascimento: dataNascimento,
      comprovante_residencia: comprovante // Corrigido o nome da variável para corresponder ao backend
    };

    console.log('Enviando dados do aluno:', dadosAluno);  // Log para verificar os dados

    // Armazenar os dados do aluno em localStorage para a próxima página
    localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));

    // Redireciona para a próxima página (Cadastro de Notas)
    navigate('/cadastrar-notas');
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
        <h1>Cadastro de Aluno</h1>
        {mensagem && <p>{mensagem}</p>}
        <form onSubmit={handleSubmit} className="formulario-aluno">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>CPF</label>
            <input type="text" maxLength="11" value={cpf} onChange={e => setCpf(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Data de Nascimento</label>
            <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Comprovante de Residência</label>
            <select value={comprovante} onChange={e => setComprovante(e.target.value)} required>
              <option value="">Selecione</option>
              <option value="Água">Água</option>
              <option value="Energia">Energia</option>
              <option value="Telefone">Telefone</option>
              <option value="Correspondência bancária">Correspondência bancária</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">Próximo</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarAluno;
