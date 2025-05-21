import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/VerAlunos.css'; // Cria esse CSS depois

const VerAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [sidebarAberta, setSidebarAberta] = useState(false);

  useEffect(() => {
    fetch('https://projeto-selecao-de-alunos.vercel.app/api/alunos') // Altere para sua rota real
      .then(res => res.json())
      .then(data => setAlunos(data))
      .catch(error => console.error('Erro ao buscar alunos:', error));
  }, []);

  return (
    <div className="dashboard-body">
      <Sidebar
        sidebarAberta={sidebarAberta}
        setSidebarAberta={setSidebarAberta}
      />

      <div className="main-content">
        <h1>Lista de Alunos</h1>
        <table className="tabela-alunos">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Mérito Final</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={index}>
                <td>{aluno.nome}</td>
                <td>{aluno.cpf}</td>
                <td>{aluno.data_nascimento}</td>
                <td>{aluno.merito_final}</td>
                <td style={{ color: aluno.merito_final >= 8 ? 'green' : 'red' }}>
                  {aluno.merito_final >= 8 ? 'Aprovado' : 'Reprovado'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerAlunos;
