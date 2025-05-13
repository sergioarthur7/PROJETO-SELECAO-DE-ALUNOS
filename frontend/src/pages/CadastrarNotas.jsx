import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CadastrarNotas.css'; // Certifique-se de que a folha de estilo existe e está correta

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const materias = [
  "Língua Portuguesa",
  "Matemática",
  "Ciências",
  "História",
  "Geografia",
  "Educação Física",
  "Artes",
  "Inglês"
];

const CadastrarNotas = () => {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [notas, setNotas] = useState({});
  const [mediaFinal, setMediaFinal] = useState(0);
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    const dadosAluno = JSON.parse(localStorage.getItem("dadosAluno"));
    if (!dadosAluno) {
      alert("Dados do aluno não encontrados. Redirecionando...");
      return navigate("/cadastrar-aluno");
    }
    setAluno(dadosAluno);

    // Inicializa matriz de notas
    const inicial = {};
    materias.forEach(materia => {
      inicial[materia] = { ano6: "", ano7: "", ano8: "", ano9: "" };
    });
    setNotas(inicial);
  }, []);

  const handleChange = (materia, ano, valor) => {
    const valorLimpo = valor.replace(",", "."); // Substitui vírgula por ponto
    const novaNota = { ...notas[materia], [ano]: valorLimpo };
    setNotas({ ...notas, [materia]: novaNota });

    // Recalcular média
    const todasNotas = Object.values({ ...notas, [materia]: novaNota }).flatMap(n => Object.values(n).map(Number));
    const somatorio = todasNotas.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);
    const totalNotas = todasNotas.filter(n => !isNaN(n)).length;

    // Atualizando a média final
    setMediaFinal(totalNotas ? (somatorio / totalNotas).toFixed(3) : "0.000");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Garantindo que a média final esteja atualizada antes de enviar os dados
    const alunoCompleto = {
      ...aluno,
      notas,
      media_final: parseFloat(mediaFinal.replace(",", ".")) // Certificando-se que a média está em formato numérico
    };

    try {
      console.log("Enviando:", alunoCompleto);
      const response = await fetch(`${API_URL}/alunos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(alunoCompleto)
      });

      if (response.ok) {
        alert("Aluno cadastrado com sucesso!");
        localStorage.removeItem("dadosAluno");
        navigate("/dashboard");
      } else {
        throw new Error("Erro ao cadastrar aluno.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar os dados.");
    }
  };

  const fazerLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-body">
      <button className="menu-btn" onClick={() => setSidebarAberta(!sidebarAberta)}>☰</button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarAberta ? 'open' : ''}`}>
        <h2>Menu</h2>
        <a href="/dashboard">Dashboard</a>
        <a href="/cadastrar-aluno">Cadastrar Aluno</a>
        <a href="/cadastrar-notas">Cadastrar Notas</a>
        <button className="logout-link" onClick={fazerLogout}>Sair</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1>Cadastro - Notas por Ano</h1>
        <form onSubmit={handleSubmit} style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', background: '#ddd' }}>Matéria</th>
                <th>6º Ano</th>
                <th>7º Ano</th>
                <th>8º Ano</th>
                <th>9º Ano</th>
              </tr>
            </thead>
            <tbody>
              {materias.map(materia => (
                <tr key={materia}>
                  <td style={{ padding: '6px', fontWeight: 'bold' }}>{materia}</td>
                  {["ano6", "ano7", "ano8", "ano9"].map(ano => (
                    <td key={ano}>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        required
                        value={notas[materia]?.[ano] || ""}
                        onChange={(e) => handleChange(materia, ano, e.target.value)}
                        style={{ width: '60px', padding: '4px' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <p><strong>Média Final:</strong> {mediaFinal}</p>
          <button type="submit">Finalizar Cadastro</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarNotas;
