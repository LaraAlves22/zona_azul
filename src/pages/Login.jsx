import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/dashboard');
        console.log("Tentando logar com:", email, senha)
        alert(`Dados obtidos com sucesso! Email: ${email}`)
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Acessar Conta</h2>
                <p className="text-sm text-slate-500 mt-1">Preencha os dados para continuar</p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">E-mail</label>
                    <input
                        type="email"
                        placeholder="joaosilva@gmail.com"
                        className="w-full border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Senha</label>
                    <input
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        className="w-full border p-2 rounded"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required />
                </div>
                <button
                    type='submit'
                    className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2">
                    Entrar
                </button>
            </form>
            <div className="flex justify-center items-center gap-1 mt-4">
                <span className="text-sm text-slate-500">Não tem conta?</span>
                <button onClick={() => navigate('/cadastro')} className="text-sm text-blue-600">
                    Cadastrar
                </button>
            </div>

            <div className="flex justify-center mt-2">
                <button onClick={() => navigate('/')} className="text-sm text-slate-400 hover:text-slate-600">
                    Voltar para o início
                </button>
            </div>
        </div>

    )
}