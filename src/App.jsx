import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'

function App() {
  const [pagina, setPagina] = useState('home')

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {pagina === 'home' && <Home onNavigate={setPagina} />}
      {pagina === 'login' && <Login onNavigate={setPagina} />}
      {pagina === 'cadastro' && <Cadastro onNavigate={setPagina} />}
      {pagina === 'dashboard' && <Dashboard onNavigate={setPagina} />}
    </div>
  )
}

export default App