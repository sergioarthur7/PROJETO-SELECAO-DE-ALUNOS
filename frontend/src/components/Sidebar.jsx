import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, UserPlus, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Detecta mudança de tamanho da janela
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // Abre em desktop, fecha em mobile
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fazerLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {isMobile && (
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
      )}

      <div className={`sidebar ${isMobile && !sidebarOpen ? 'recolhida' : 'open'}`}>
        <div>
          <div className="sidebar-logo">Painel</div>

          <nav className="sidebar-menu">
            <NavLink to="/dashboard" className="sidebar-item">
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink to="/ver-alunos" className="sidebar-item">
              <GraduationCap size={20} />
              Ver Alunos
            </NavLink>

            <NavLink to="/cadastrar-aluno" className="sidebar-item">
              <UserPlus size={20} />
              Cadastrar Aluno
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="logout-link" onClick={fazerLogout}>
            <LogOut size={18} style={{ marginRight: '8px' }} />
            Sair
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
