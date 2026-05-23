import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    try {
      const { data } = await api.post('/auth/login', { email, senha })
      if (!data.usuario || !data.usuario.id) { setErro('Erro ao carregar dados. Cadastre-se novamente.'); return }
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
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Senha</label>
          <div className="relative">
            <input type={mostrarSenha ? "text" : "password"} placeholder="Minimo 8 caracteres" className="w-full border p-2 rounded pr-10" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
              {mostrarSenha ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 cursor-pointer hover:bg-blue-700">Entrar</button>
      </form>
      <div className="flex justify-center mt-3"><button onClick={() => navigate('/esqueci-senha')} className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">Esqueci minha senha</button></div>
      <div className="flex justify-center items-center gap-1 mt-3"><span className="text-sm text-slate-500">Nao tem conta?</span><button onClick={() => navigate('/cadastro')} className="text-sm text-blue-600 cursor-pointer">Cadastrar</button></div>
      <div className="flex justify-center mt-2"><button onClick={() => navigate('/')} className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer">Voltar</button></div>
    </div>
  )
}
