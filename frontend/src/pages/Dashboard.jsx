// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { UserPlus, GraduationCap, Users, FileText } from 'lucide-react';

const Dashboard = () => {
  const [sidebarAberta, setSidebarAberta] = useState(true);

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
            <div className="dashboard-icon">
              <UserPlus size={64} />
            </div>
            <p>Cadastrar Aluno</p>
          </Link>

          <Link to="/ver-alunos" className="dashboard-card">
            <div className="dashboard-icon">
              <Users size={64} />
            </div>
            <p>Ver Alunos</p>
          </Link>

          <Link to="/voltar" className="dashboard-card">
            <div className="dashboard-icon">
              <GraduationCap size={64} />
            </div>
            <p>Cursos</p>
          </Link>

          <Link to="/relatorio" className="dashboard-card">
            <div className="dashboard-icon">
              <FileText size={64} />
            </div>
            <p>Relatórios</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
