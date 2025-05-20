// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';

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
  <div className="botao-icone" onClick={() => console.log("Cadastrar Aluno")}>
    <div className="circulo">
      <span className="sinal-mais">+</span>
    </div>
    <p>CADASTRAR ALUNO</p>
  </div>

  <div className="botao-icone" onClick={() => console.log("Outro Botão")}>
    <div className="circulo">
      <span className="sinal-mais">+</span>
    </div>
    <p>VER ALUNOS</p>
  </div>

  
  </div>
    </div>
      </div>


    
  );
};

export default Dashboard;
