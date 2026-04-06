import { useState } from "react";

export default function Cadastro({ onNavigate }) {
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