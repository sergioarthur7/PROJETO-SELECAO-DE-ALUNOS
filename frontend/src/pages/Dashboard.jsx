// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div className="dashboard-body">
      <Sidebar
        sidebarAberta={sidebarAberta}
        setSidebarAberta={setSidebarAberta}
      />

      <div className="main-content">
        <h1 className="dashboard-title">Painel do Gestor</h1>

        <div className="centralizado">
          <Link to="/cadastrar-aluno" className="dashboard-card">
            <div className="dashboard-icon">📋</div>
            <p>Cadastrar Aluno</p>
          </Link>

          <Link to="/ver-alunos" className="dashboard-card">
            <div className="dashboard-icon">👨‍🎓</div>
            <p>Ver Alunos</p>
          </Link>

          <Link to="/ver-alunos" className="dashboard-card">
            <div className="dashboard-icon">X</div>
            <p>XXXXX</p>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
