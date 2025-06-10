// src/pages/CadastrarAluno.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const CadastrarAluno = () => {
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [comprovante, setComprovante] = useState('');
  const [cota, setCota] = useState('');
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [cursos, setCursos] = useState([]);

  // Buscar cursos do banco de dados
  useEffect(() => {
    const buscarCursos = async () => {
      try {
        const resposta = await fetch('https://projeto-selecao-de-alunos.vercel.app/api/cursos');
        const dados = await resposta.json();
        setCursos(dados);
      } catch (erro) {
        console.error('Erro ao buscar cursos:', erro);
      }
    };

    buscarCursos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dadosAluno = {
      nome,
      cpf,
      data_nascimento: dataNascimento,
      comprovante_residencia: comprovante,
      cota,
      curso: cursoSelecionado,
    };

    localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));
    navigate('/cadastrar-notas');
  };

  const fazerLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-body">
      <Sidebar sidebarAberta={sidebarAberta} setSidebarAberta={setSidebarAberta} />

      <div className="main-content">
        <br />
        <h1>Cadastro de Aluno</h1>
        <br />
        {mensagem && <p>{mensagem}</p>}

        <form onSubmit={handleSubmit} className="formulario-aluno">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input 
              type="text"
              maxLength="11"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              required
              pattern="\d{11}"
              title="Digite um CPF válido (somente números)"
            />
          </div>

          <div className="form-group">
            <label>Data de Nascimento</label>
            <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Comprovante de Residência</label>
            <select value={comprovante} onChange={e => setComprovante(e.target.value)} required>
              <option value="">Selecione</option>
              <option value="Água">Água</option>
              <option value="Energia">Energia</option>
              <option value="Telefone">Telefone</option>
              <option value="Correspondência bancária">Correspondência bancária</option>
            </select>
          </div>

          <div className="form-group">
            <label>Cota</label>
            <select value={cota} onChange={e => setCota(e.target.value)} required>
              <option value="">Selecione</option>
              <option value="RPAC">REDE PÚBLICA – AMPLA CONCORRÊNCIA</option>
              <option value="RDTE">REDE PÚBLICA – COTA TERRITÓRIO DA ESCOLA</option>
              <option value="RPRAC">REDE PRIVADA – AMPLA CONCORRÊNCIA</option>
              <option value="RPRTE">REDE PRIVADA – COTA TERRITÓRIO DA ESCOLA</option>
              <option value="ECD">ESTUDANTES COM DEFICIÊNCIA</option>
            </select>
          </div>

          <div className="form-group">
            <label>Curso</label>
            <select value={cursoSelecionado} onChange={e => setCursoSelecionado(e.target.value)} required>
              <option value="">Selecione</option>
              <option value="ADM">Administração</option>
              <option value="AGR">Agropecuária</option>
              <option value="INF">Informática</option>
              <option value="SER">Sistema de Energias Renováveis</option>
              <option value="FIN">Finanças</option>
            </select>
          </div>


          <button type="submit" className="btn-submit">Próximo</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarAluno;
