import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import api from "../services/api"
export default function Confirmar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(location.state?.email || '')
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const handleConfirmar = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/confirmar', { email, codigo })
      alert('Conta confirmada! Faca login.')
      navigate('/login')
    } catch (err) { setErro(err.response?.data?.erro || 'Codigo invalido') }
  }
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Confirmar conta</h2>
      <p className="text-sm text-slate-500 mb-6">Digite o codigo enviado para seu email</p>
      {erro && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{erro}</p>}
      <form onSubmit={handleConfirmar} className="flex flex-col gap-4">
        <div><label className="block text-xs font-medium text-slate-500 mb-1">E-mail</label><input type="email" className="w-full border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Codigo de verificacao</label><input type="text" placeholder="123456" className="w-full border p-2 rounded" value={codigo} onChange={(e) => setCodigo(e.target.value)} required /></div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700">Confirmar</button>
      </form>
      <div className="flex justify-center mt-4"><button onClick={() => navigate('/login')} className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer">Voltar ao login</button></div>
    </div>
  )
}
