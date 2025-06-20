import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const API_URL = import.meta.env.VITE_API_URL || "https://projeto-selecao-de-alunos.vercel.app";

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
  const [sidebarAberta, setSidebarAberta] = useState(true);
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

    const inicial = {};
    materias.forEach(materia => {
      inicial[materia] = { ano6: "", ano7: "", ano8: "", ano9: "" };
    });
    setNotas(inicial);
  }, []);

  const handleChange = (materia, ano, valor) => {
    const valorLimpo = valor.replace(",", ".");
    const novaNota = { ...notas[materia], [ano]: valorLimpo };
    const novasNotas = { ...notas, [materia]: novaNota };
    setNotas(novasNotas);

    const todasNotas = Object.values(novasNotas).flatMap(n => Object.values(n).map(Number));
    const somatorio = todasNotas.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);
    const totalNotas = todasNotas.filter(n => !isNaN(n)).length;

    setMediaFinal(totalNotas ? (somatorio / totalNotas).toFixed(3) : "0.000");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

const alunoCompleto = {
  ...aluno,
  media_final: parseFloat(mediaFinal.replace(",", "."))
};



    try {
      console.log("Enviando:", alunoCompleto);
      const response = await fetch(`${API_URL}/api/cadastroAluno`, {
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
    <Sidebar sidebarAberta={sidebarAberta} setSidebarAberta={setSidebarAberta} />

    <div className="main-content">
      <div className="cadastro-notas-container">
        <h1>Cadastro de Notas por Ano</h1>

        <form onSubmit={handleSubmit}>
          <table className="tabela-notas">
            <thead>
              <tr>
                <th>Matéria</th>
                <th>6º Ano</th>
                <th>7º Ano</th>
                <th>8º Ano</th>
                <th>9º Ano</th>
              </tr>
            </thead>
            <tbody>
              {materias.map(materia => (
                <tr key={materia}>
                  <td style={{ fontWeight: 'bold' }}>{materia}</td>
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
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <p className="media-final">Média Final: {mediaFinal}</p>
          <button className="botao-finalizar" type="submit">Finalizar Cadastro</button>
        </form>
      </div>
    </div>
  </div>
);

};

export default CadastrarNotas;
