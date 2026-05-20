import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
export default function Cadastro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome:'', email:'', telefone:'', senha:'', senha2:'', perfil:'' })
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    if (form.senha !== form.senha2) return setErro('As senhas nao coincidem')
    if (form.senha.length < 8) return setErro('A senha precisa ter no minimo 8 caracteres')
    if (!form.perfil) return setErro('Selecione um perfil')
    try {
      await api.post('/auth/registrar', { nome: form.nome, email: form.email, telefone: form.telefone, senha: form.senha, perfil: form.perfil })
      setSucesso(true)
    } catch (err) { setErro(err.response?.data?.erro || 'Erro ao cadastrar') }
  }
  if (sucesso) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Verifique seu email</h2>
        <p className="text-slate-500 mb-4">Enviamos um codigo de confirmacao para {form.email}</p>
        <button onClick={() => navigate('/confirmar', { state: { email: form.email } })} className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer">Inserir codigo</button>
      </div>
    )
  }
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
      <h2 className="text-2xl font-bold text-slate-800">Criar conta</h2>
      <p className="text-sm text-slate-500 mt-1 mb-6">Preencha os dados para continuar</p>
      {erro && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{erro}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Nome Completo</label><input type="text" name="nome" placeholder="Joao Silva" className="w-full border p-2 rounded" value={form.nome} onChange={handleChange} required /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">E-mail</label><input type="email" name="email" placeholder="joao@gmail.com" className="w-full border p-2 rounded" value={form.email} onChange={handleChange} required /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Telefone</label><input type="tel" name="telefone" placeholder="+5535999999999" className="w-full border p-2 rounded" value={form.telefone} onChange={handleChange} required /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Senha</label><input type="password" name="senha" placeholder="Minimo 8 caracteres" className="w-full border p-2 rounded" value={form.senha} onChange={handleChange} required /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Confirme sua Senha</label><input type="password" name="senha2" placeholder="Repita a senha" className="w-full border p-2 rounded" value={form.senha2} onChange={handleChange} required /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Perfil</label><select name="perfil" className="w-full border p-2 rounded text-slate-700" value={form.perfil} onChange={handleChange} required><option value="">Selecione um perfil</option><option value="motorista">Motorista</option><option value="fiscal">Fiscal</option></select></div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700">Criar conta</button>
      </form>
      <div className="flex justify-center items-center gap-1 mt-4"><span className="text-sm text-slate-500">Ja tem conta?</span><button onClick={() => navigate('/login')} className="text-sm text-blue-600 cursor-pointer">Entrar</button></div>
      <div className="flex justify-center mt-2"><button onClick={() => navigate('/')} className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer">Voltar</button></div>
    </div>
  )
}


