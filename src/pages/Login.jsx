import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    try {
      const { data } = await api.post('/auth/login', { email, senha })
      if (!data.usuario || !data.usuario.id) {
        setErro('Erro ao carregar dados do usuario. Cadastre-se novamente.')
        return
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      navigate('/dashboard')
    } catch (err) { setErro(err.response?.data?.erro || 'Email ou senha incorretos') }
  }
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
      <h2 className="text-2xl font-bold text-slate-800">Acessar Conta</h2>
      <p className="text-sm text-slate-500 mt-1 mb-6">Preencha os dados para continuar</p>
      {erro && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{erro}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div><label className="block text-xs font-medium text-slate-500 mb-1">E-mail</label><input type="email" placeholder="joao@gmail.com" className="w-full border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Senha</label><input type="password" placeholder="Minimo 8 caracteres" className="w-full border p-2 rounded" value={senha} onChange={(e) => setSenha(e.target.value)} required /></div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 cursor-pointer hover:bg-blue-700">Entrar</button>
      </form>
      <div className="flex justify-center items-center gap-1 mt-4"><span className="text-sm text-slate-500">Nao tem conta?</span><button onClick={() => navigate('/cadastro')} className="text-sm text-blue-600 cursor-pointer">Cadastrar</button></div>
      <div className="flex justify-center mt-2"><button onClick={() => navigate('/')} className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer">Voltar</button></div>
    </div>
  )
}

