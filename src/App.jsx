import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App