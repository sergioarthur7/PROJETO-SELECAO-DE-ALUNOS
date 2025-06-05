import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Importação das páginas
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CadastrarAluno from './pages/CadastrarAluno'
import Conta from './pages/Conta'
import Notwithstanding from './pages/Notwithstanding'
import CadastrarNotas from './pages/CadastrarNotas' 
import VerAlunos from './pages/VerAlunos'
import Cursos from './pages/Cursos'  // <--- faltava importar

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
        <Route path="/cadastrar-notas" element={<CadastrarNotas />} /> 
        <Route path="/conta" element={<Conta />} />
        <Route path="/notwithstanding" element={<Notwithstanding />} />
        <Route path="/ver-alunos" element={<VerAlunos />} />
        <Route path="/cursos" element={<Cursos />} />
      </Routes>
    </Router>
  )
}

export default App;
