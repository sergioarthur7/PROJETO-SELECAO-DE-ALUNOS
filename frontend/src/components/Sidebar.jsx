// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarAberta, setSidebarAberta }) => {
  const navigate = useNavigate();

  const fazerLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button
        className="menu-btn"
        onClick={() => setSidebarAberta(!sidebarAberta)}
      >
        ☰
      </button>

      <div className={`sidebar ${sidebarAberta ? 'open' : ''}`}>
        <h2><br />Menu</h2>
        <nav className="sidebar-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/ver-alunos">Ver Alunos</a>
          <a href="/cadastrar-aluno">Cadastrar Aluno</a>
          <button className="logout-link" onClick={fazerLogout}>
            Sair
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
