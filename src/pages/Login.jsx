import { useState } from "react";

export default function Login({ onNavigate }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        onNavigate('dashboard');
        console.log("Tentando logar com:", email, senha)
        alert(`Dados obtidos com sucesso! Email: ${email}`)
    }

    return (
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
                    required />
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