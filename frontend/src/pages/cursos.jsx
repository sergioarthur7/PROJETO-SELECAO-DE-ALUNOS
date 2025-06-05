import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { PlusCircle, XCircle } from 'lucide-react';

const Cursos = () => {
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    buscarCursos();
  }, []);

  const buscarCursos = async () => {
    try {
      const res = await axios.get('https://projeto-selecao-de-alunos.vercel.app/api/cursos/obter');
      setCursos(res.data); // Espera um array tipo [{ nome, sigla }, ...]
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
    }
  };

  const adicionarCurso = async () => {
    if (!nome.trim() || !sigla.trim()) {
      return alert('Preencha nome e sigla.');
    }

    try {
      const res = await axios.post('https://projeto-selecao-de-alunos.vercel.app/api/cursos/adicionar', {
        nome,
        sigla
      });

      // Backend deve retornar o curso adicionado { nome, sigla }
      setCursos([...cursos, res.data]);
      setNome('');
      setSigla('');
    } catch (error) {
      console.error('Erro ao adicionar curso:', error);
      alert('Erro ao adicionar curso.');
    }
  };

  const removerCurso = async (siglaCurso) => {
    if (!window.confirm('Tem certeza que deseja remover este curso?')) return;

    try {
      await axios.delete(`https://projeto-selecao-de-alunos.vercel.app/api/cursos/remover?sigla=${encodeURIComponent(siglaCurso)}`);
      setCursos(cursos.filter(curso => curso.sigla !== siglaCurso));
    } catch (error) {
      console.error('Erro ao remover curso:', error);
      alert('Erro ao remover curso.');
    }
  };

  return (
    <div className="dashboard-body">
      <Sidebar sidebarAberta={sidebarAberta} setSidebarAberta={setSidebarAberta} />
      
      <div className="main-content">
        <h1 className="dashboard-title">Gerenciar Cursos</h1>

        <div className="form-container">
          <div className="inline-form">
            <input
              type="text"
              placeholder="Nome do curso"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sigla"
              name="sigla"
              value={sigla}
              onChange={(e) => setSigla(e.target.value)}
            />
            <button type="button" className="btn-add" onClick={adicionarCurso}>
              <PlusCircle size={20} /> ADD CURSO
            </button>
          </div>

          <div className="lista-cursos" style={{ marginTop: '2rem' }}>
            <h3>Cursos adicionados:</h3>
            <ul>
              {cursos.map((curso) => (
                <li key={curso.sigla}>
                  <strong>{curso.nome}</strong> ({curso.sigla})
                  <button
                    onClick={() => removerCurso(curso.sigla)}
                    style={{ color: 'red', marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                    title="Remover"
                  >
                    <XCircle size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;
