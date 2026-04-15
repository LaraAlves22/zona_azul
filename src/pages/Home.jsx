import { useNavigate } from "react-router-dom";
console.log("A Home carregou!");
export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">P</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Zona Azul Digital</h1>
            <p className="text-slate-500 mt-2">Escolha uma opção para continuar:</p>

            <div className="mt-6 space-y-3">
                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer">
                    Login
                </button>
                <button
                    onClick={() => navigate('/cadastro')}
                    className="w-full border-2 border-slate-200 text-slate-600 font-semibold py-3 rounded-lg hover:bg-slate-50 transition cursor-pointer">
                    Cadastrar-se
                </button>
            </div>
        </div>
    )
}