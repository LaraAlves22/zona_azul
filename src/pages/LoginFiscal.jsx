import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
export default function LoginFiscal() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [erro, setErro] = useState('')

  const formatCpf = (v) => {
    const nums = v.replace(/\D/g, '').slice(0, 11)
    if (nums.length <= 3) return nums
    if (nums.length <= 6) return nums.replace(/(\d{3})(\d+)/, '$1.$2')
    if (nums.length <= 9) return nums.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3')
    return nums.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    const cpfLimpo = cpf.replace(/\D/g, '')
    if (cpfLimpo.length !== 11) { setErro('CPF deve ter 11 digitos'); return }
    try {
      const { data } = await api.post('/auth/login-fiscal', { email, cpf: cpfLimpo })
      if (!data.usuario || !data.usuario.id) { setErro('Credenciais invalidas'); return }
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      navigate('/dashboard')
    } catch (err) { setErro(err.response?.data?.erro || 'Email ou CPF incorretos') }
  }
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
      <h2 className="text-2xl font-bold text-slate-800">Acesso Fiscal / Admin</h2>
      <p className="text-sm text-slate-500 mt-1 mb-6">Login com email e CPF</p>
      {erro && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{erro}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div><label className="block text-xs font-medium text-slate-500 mb-1">E-mail</label><input type="email" placeholder="fiscal@zonazul.com" className="w-full border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">CPF</label><input type="text" placeholder="000.000.000-00" className="w-full border p-2 rounded" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} required /></div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 cursor-pointer hover:bg-blue-700">Entrar</button>
      </form>
      <div className="flex justify-center mt-4"><button onClick={() => navigate('/')} className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer">Voltar</button></div>
    </div>
  )
}
