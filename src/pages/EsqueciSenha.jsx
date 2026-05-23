import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
export default function EsqueciSenha() {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState(1)
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [novaSenha2, setNovaSenha2] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [erro, setErro] = useState('')
  const [msg, setMsg] = useState('')

  const enviarCodigo = async (e) => {
    e.preventDefault(); setErro('')
    try {
      await api.post('/auth/esqueci-senha', { email })
      setMsg('Codigo enviado para ' + email)
      setEtapa(2)
    } catch (err) { setErro(err.response?.data?.erro || 'Erro ao enviar codigo') }
  }

  const redefinir = async (e) => {
    e.preventDefault(); setErro('')
    if (novaSenha !== novaSenha2) { setErro('As senhas nao coincidem'); return }
    if (novaSenha.length < 8) { setErro('Minimo 8 caracteres'); return }
    try {
      await api.post('/auth/redefinir-senha', { email, codigo, novaSenha })
      alert('Senha redefinida com sucesso!')
      navigate('/login')
    } catch (err) { setErro(err.response?.data?.erro || 'Erro ao redefinir') }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
      <h2 className="text-2xl font-bold text-slate-800">{etapa === 1 ? 'Recuperar Senha' : 'Nova Senha'}</h2>
      <p className="text-sm text-slate-500 mt-1 mb-6">{etapa === 1 ? 'Informe seu email para receber o codigo' : 'Digite o codigo e a nova senha'}</p>
      {erro && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{erro}</p>}
      {msg && <p className="text-emerald-600 text-sm mb-4 bg-emerald-50 p-2 rounded">{msg}</p>}
      {etapa === 1 ? (
        <form onSubmit={enviarCodigo} className="flex flex-col gap-4">
          <div><label className="block text-xs font-medium text-slate-500 mb-1">E-mail</label><input type="email" placeholder="seu@email.com" className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700">Enviar codigo</button>
        </form>
      ) : (
        <form onSubmit={redefinir} className="flex flex-col gap-4">
          <div><label className="block text-xs font-medium text-slate-500 mb-1">Codigo recebido</label><input type="text" placeholder="123456" className="w-full border p-2 rounded" value={codigo} onChange={e => setCodigo(e.target.value)} required /></div>
          <div><label className="block text-xs font-medium text-slate-500 mb-1">Nova senha</label>
            <div className="relative"><input type={mostrar ? "text" : "password"} placeholder="Minimo 8 caracteres" className="w-full border p-2 rounded pr-10" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required />
              <button type="button" onClick={() => setMostrar(!mostrar)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg></button>
            </div>
          </div>
          <div><label className="block text-xs font-medium text-slate-500 mb-1">Confirme a nova senha</label><input type="password" placeholder="Repita a senha" className="w-full border p-2 rounded" value={novaSenha2} onChange={e => setNovaSenha2(e.target.value)} required /></div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700">Redefinir senha</button>
        </form>
      )}
      <div className="flex justify-center mt-4"><button onClick={() => navigate('/login')} className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer">Voltar ao login</button></div>
    </div>
  )
}
