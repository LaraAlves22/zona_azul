import { useState } from 'react'

const Home = ({ onNavigate }) => (
  <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
    <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-white text-2xl font-bold">P</span>
    </div>
    <h1 className="text-2xl font-bold text-slate-800">Zona Azul Digital</h1>
    <p className="text-slate-500 mt-2">Escolha uma opção para continuar:</p>
    
    <div className="mt-6 space-y-3">
      <button 
        onClick={() => onNavigate('login')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer">
        Login
      </button>
      <button 
        onClick={() => onNavigate('cadastro')}
        className="w-full border-2 border-slate-200 text-slate-600 font-semibold py-3 rounded-lg hover:bg-slate-50 transition cursor-pointer">
        Cadastrar-se
      </button>
    </div>
  </div>
)

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    console.log("Tentando logar com:", email, senha)
    alert(`Dados obtidos com sucesso! Email: ${email}`)
  }

  return(
  <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">Acessar Conta</h2>
    <form onSubmit={handleLogin}>
    <input 
      type="email" 
      placeholder="E-mail" 
      className="w-full border p-2 rounded mb-3"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required 
    />
    <input 
      type="password" 
      placeholder="Senha" 
      className="w-full border p-2 rounded mb-4" 
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      required/>
    <button 
      type='submit'
      className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2">
      Entrar
    </button>
    </form>
    <button onClick={() => onNavigate('home')} className="text-blue-600 text-sm">
      ← Voltar
    </button>
  </div>
  
  )
}

const Cadastro = ({ onNavigate }) => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')

  const handleCadastro = (e) => {
    e.preventDefault()
  }

  return (
  <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">Criar Cadastro</h2>
    <form onSubmit={handleCadastro}>
    <input 
      type="text" 
      placeholder="Nome Completo" 
      className="w-full border p-2 rounded mb-3" 
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      required 
      />
    <input 
      type="email" 
      placeholder="E-mail" 
      className="w-full border p-2 rounded mb-3" 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required 
    />
    <input 
      type="password" 
      placeholder="Senha" 
      className="w-full border p-2 rounded mb-3" 
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      required 
    />
    <input 
      type="password" 
      placeholder="Confirme Sua Senha" 
      className="w-full border p-2 rounded mb-3" 
      value={senha2}
      onChange={(e) => setSenha2(e.target.value)}
      required 
    />
    <button 
      type='submit'
      className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2">
        Finalizar Cadastro
    </button>
    </form>
    <button onClick={() => onNavigate('home')} className="text-blue-600 text-sm">
      ← Voltar
    </button>
  </div>
)
}

function App() {
  const [pagina, setPagina] = useState('home')

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {pagina === 'home' && <Home onNavigate={setPagina} />}
      {pagina === 'login' && <Login onNavigate={setPagina} />}
      {pagina === 'cadastro' && <Cadastro onNavigate={setPagina} />}
    </div>
  )
}

export default App