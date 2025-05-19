import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const fazerLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-body">
      {/* botão de menu sempre no topo-esquerdo */}
      <button
        className="menu-btn"
        onClick={() => setSidebarAberta(!sidebarAberta)}
      >
        ☰
      </button>

      {/* sidebar que desliza da esquerda */}
      <div className={`sidebar ${sidebarAberta ? 'open' : ''}`}>

        <h2>Menu</h2>
        <a href="/dashboard">Dashboard</a>
        <a href="/cadastrar-aluno">Cadastrar Aluno</a>
        <button className="logout-link" onClick={fazerLogout}>
          Sair
        </button>
      </div>

      {/* conteúdo principal */}
      <div className="main-content">
        <h1>Página Inicial</h1>
        <p>Bem‑vindo ao painel do gestor!</p>
      </div>
    </div>
  );
};

export default Dashboard;
