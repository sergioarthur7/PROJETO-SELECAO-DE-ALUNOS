import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const VerAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [sidebarAberta, setSidebarAberta] = useState(true);

  useEffect(() => {
    fetch('https://projeto-selecao-de-alunos.vercel.app/api/alunos')
      .then(res => res.json())
      .then(data => setAlunos(data))
      .catch(error => console.error('Erro ao buscar alunos:', error));
  }, []);

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    aluno.cpf.includes(filtro)
  );

  const exportarCSV = () => {
    const csv = [
      ['Nome', 'CPF', 'Data de Nascimento', 'Mérito Final'],
      ...alunosFiltrados.map((a) => [a.nome, a.cpf, a.data_nascimento, a.merito_final])
    ]
      .map((linha) => linha.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'lista_alunos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-body">
      <Sidebar
        sidebarAberta={sidebarAberta}
        setSidebarAberta={setSidebarAberta}
      />

      <div className="main-content">
        <div className="ver-alunos-container">
          <h1 className="titulo-alunos">Lista de Alunos</h1>

          <div className="acoes-container">
            <input
              type="text"
              placeholder="Buscar por nome ou CPF..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-busca"
            />
            <button onClick={exportarCSV} className="botao-exportar">
              Exportar CSV
            </button>
          </div>

          <div className="tabela-container">
            <table className="tabela-alunos">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Data de Nascimento</th>
                  <th>Mérito Final</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map((aluno, index) => (
                  <tr key={index}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.cpf}</td>
                    <td>{aluno.data_nascimento}</td>
                    <td>{aluno.merito_final}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerAlunos;
