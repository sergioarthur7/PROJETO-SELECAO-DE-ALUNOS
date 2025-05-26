// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'




const Dashboard = () => {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div className="dashboard-body">
      <Sidebar
        sidebarAberta={sidebarAberta}
        setSidebarAberta={setSidebarAberta}
      />

      <div className="main-content">
        <h1>Dashboard</h1>

        <div className="centralizado">
          {/* Botão: Cadastrar Aluno */}
          <Link to="/cadastrar-aluno" className="botao-icone">
            <div className="circulo">
              <span className="sinal-mais">+</span>
            </div>
            <p>CADASTRAR ALUNO</p>
          </Link>

          {/* Botão: Ver Alunos */}
          <Link to="/ver-alunos" className="botao-icone">
            <div className="circulo">
              <span className="sinal-mais">+</span>
            </div>
            <p>VER ALUNOS</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
