// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importação das páginas
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CadastrarAluno from './pages/CadastrarAluno'
import Conta from './pages/Conta'
import Notwithstanding from './pages/Notwithstanding'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/notwithstanding" element={<Notwithstanding />} />
      </Routes>
    </Router>
  )
}

export default App
