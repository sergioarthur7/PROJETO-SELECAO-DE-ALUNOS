// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css'; // crie este CSS se quiser separar

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
        <a href="/dashboard">Dashboard</a>
        <a href="/cadastrar-aluno">Cadastrar Aluno</a>
        <button className="logout-link" onClick={fazerLogout}>
          Sair
        </button>
      </div>
    </>
  );
};

export default Sidebar;
