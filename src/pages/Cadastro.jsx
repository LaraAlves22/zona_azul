import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [senha, setSenha] = useState('')
    const [senha2, setSenha2] = useState('')
    const [perfil, setPerfil] = useState('')

    const handleCadastro = (e) => {
        e.preventDefault()
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Criar conta</h2>
                <p className="text-sm text-slate-500 mt-1">Preencha os dados para continuar</p>
            </div>
            <form onSubmit={handleCadastro} className="flex flex-col gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Nome Completo</label>
                    <input
                        type="text"
                        placeholder="João Silva"
                        className="w-full border p-2 rounded"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

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
                    <label className="block text-xs font-medium text-slate-500 mb-1">Telefone</label>
                    <input
                        type="tel"
                        placeholder="(12) 99999-9999"
                        className="w-full border p-2 rounded"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
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
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Confirme sua Senha</label>
                    <input
                        type="password"
                        placeholder="Repita a senha"
                        className="w-full border p-2 rounded"
                        value={senha2}
                        onChange={(e) => setSenha2(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Perfil</label>
                    <select
                        className="w-full border p-2 rounded text-slate-700"
                        value={perfil}
                        onChange={(e) => setPerfil(e.target.value)}
                        required
                    >
                        <option value="">Selecione um perfil</option>
                        <option value="motorista">Motorista</option>
                        <option value="fiscal">Fiscal</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                
                <button
                    type='submit'
                    className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2">
                    Criar conta
                </button>

            </form>


            <div className="flex justify-center items-center gap-1 mt-4">
                <span className="text-sm text-slate-500">Já tem conta?</span>
                <button onClick={() => navigate('/login')} className="text-sm text-blue-600">
                    Entrar
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