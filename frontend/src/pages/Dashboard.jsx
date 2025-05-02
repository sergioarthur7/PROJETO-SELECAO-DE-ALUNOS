import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Dashboard.css"; // Arquivo CSS externo se quiser separar os estilos

const Dashboard = () => {
  const navigate = useNavigate();

  const fazerLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-body">
      {/* Barra lateral */}
      <div className="sidebar">
        <h2>Gestor</h2>
        <a href="/dashboard">Dashboard</a>
        <a href="/cadastrar-aluno">Cadastrar Aluno</a>
      </div>

      {/* Conteúdo principal */}
      <div className="main-content">
        <div className="header">
          <h1>Dashboard</h1>
          <button className="logout-btn" onClick={fazerLogout}>Sair</button>
        </div>
        <p>Bem-vindo ao painel do gestor!</p>

        {/* Espaço para futuras tabelas ou dados dos alunos */}
      </div>
    </div>
  );
};

export default Dashboard;
