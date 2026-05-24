import { useState, useEffect, useRef, useCallback } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

const MARCAS_CARRO = {"Chevrolet":["Onix","Prisma","Tracker","S10","Cruze","Spin","Montana"],"Fiat":["Argo","Mobi","Pulse","Strada","Toro","Uno","Cronos"],"Volkswagen":["Gol","Polo","T-Cross","Virtus","Saveiro","Nivus"],"Ford":["Ka","EcoSport","Ranger","Bronco","Maverick"],"Hyundai":["HB20","Creta","Tucson","HB20S"],"Toyota":["Corolla","Hilux","Yaris","SW4","Corolla Cross"],"Honda":["Civic","City","HR-V","CR-V","Fit","WR-V"],"Renault":["Kwid","Sandero","Duster","Logan","Captur"],"Jeep":["Renegade","Compass","Commander"],"Nissan":["Kicks","Versa","Frontier"],"Outro":[]}
const MARCAS_MOTO = {"Honda":["CG 160","Biz","Pop","XRE 300","CB 500","Bros"],"Yamaha":["Factor","Fazer","Crosser","Lander","MT-03"],"Suzuki":["GSX","V-Strom","Intruder"],"Outro":[]}
const ZONAS_MAPA = [{nome:"Centro",cor:"#dc2626",x:50,y:35,desc:"Praca Theodomiro e arredores"},{nome:"Comercial",cor:"#f59e0b",x:30,y:55,desc:"Area comercial da cidade"},{nome:"Residencial",cor:"#059669",x:72,y:40,desc:"Zona residencial"},{nome:"Sao Jose",cor:"#2563eb",x:62,y:70,desc:"Bairro Sao Jose"},{nome:"Medicina",cor:"#7c3aed",x:38,y:78,desc:"Proximo a faculdade"}]

function Ic({d,c="w-5 h-5"}){return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={d}/></svg>}

function Sidebar({page,setPage,perfil,usuario,onLogout,mob,setMob,onConfig}){
  const [nc,setNc]=useState(0)
  useEffect(()=>{if(perfil==="motorista"&&usuario?.id)api.get("/notificacoes/nao-lidas/"+usuario.id).then(r=>setNc(r.data.count||0)).catch(()=>{})},[page])
  const menus={
    motorista:[{id:"inicio",l:"Inicio",d:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1"},{id:"veiculos",l:"Veiculos",d:"M8 17h.01M12 17h.01M16 17h.01M3 9h18M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"},{id:"estacionar",l:"Estacionar",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"},{id:"carteira",l:"Carteira",d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"},{id:"historico",l:"Historico",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"perfil",l:"Meu Perfil",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"},{id:"notifs",l:"Notificacoes",d:"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",badge:nc}],
    fiscal:[{id:"consulta",l:"Consultar Placa",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"},{id:"pendentes",l:"Avisos Pendentes",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"},{id:"resumo",l:"Resumo do Dia",d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"}],
    admin:[{id:"movimentacao",l:"Movimentacao",d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"},{id:"ger-zonas",l:"Zonas e Precos",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"},{id:"fiscais",l:"Fiscais",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"}]
  }
  const menu=menus[perfil]||[]
  const ini=(usuario?.nome||"U").split(" ").map(n=>n[0]).join("").slice(0,2)
  return(
    <>
      {mob&&<div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={()=>setMob(false)}/>}
      <aside className={`fixed lg:static z-50 w-64 h-screen flex flex-col bg-[#0f172a] transition-transform lg:translate-x-0 ${mob?"translate-x-0":"-translate-x-full"}`}>
        <div className="h-16 flex items-center gap-3 px-5 border-b border-white/5">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center"><span className="text-white font-black text-sm">ZA</span></div>
          <div><p className="font-bold text-white text-sm">Zona Azul</p><p className="text-[10px] text-slate-500">Itajuba, MG</p></div>
        </div>
        <div className="px-4 pt-5 pb-2"><p className="text-[10px] text-slate-600 uppercase tracking-[0.15em] font-semibold">Menu</p></div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menu.map(i=>(
            <button key={i.id} onClick={()=>{setPage(i.id);setMob(false)}} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all ${page===i.id?"bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20":"text-slate-400 hover:text-white hover:bg-white/5"}`}>
              <Ic d={i.d} c="w-5 h-5 flex-shrink-0"/>
              <span className="flex-1 text-left">{i.l}</span>
              {i.badge>0&&<span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{i.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"><span className="text-white text-xs font-bold">{ini}</span></div>
            <div className="flex-1 min-w-0"><p className="text-white text-sm font-medium truncate">{usuario?.nome}</p><p className="text-slate-500 text-[11px] capitalize">{perfil}</p></div>
            <button onClick={onLogout} className="text-slate-600 hover:text-red-400 cursor-pointer transition"><Ic d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" c="w-4 h-4"/></button>
          </div>
        </div>
      </aside>
    </>
  )
}

function Timer({sessao,onRenovar}){
  const [tempo,setTempo]=useState(""),[pct,setPct]=useState(100)
  useEffect(()=>{const tk=()=>{const d=new Date(sessao.fim).getTime()-Date.now();if(d<=0){setTempo("EXPIRADO");setPct(0);return}const h=Math.floor(d/3600000),m=Math.floor((d%3600000)/60000),s=Math.floor((d%60000)/1000);setTempo(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`);setPct(Math.max(0,(d/(sessao.duracao_minutos*60000))*100))};tk();const id=setInterval(tk,1000);return()=>clearInterval(id)},[sessao.fim])
  const exp=tempo==="EXPIRADO",lo=pct<20&&!exp,md=pct<50&&!lo&&!exp
  return(
    <div className={"p-5 rounded-2xl border transition-all hover:shadow-md "+(exp?"border-slate-200 bg-gradient-to-r from-slate-50 to-white":lo?"border-red-200 bg-gradient-to-r from-red-50 to-white":md?"border-amber-200 bg-gradient-to-r from-amber-50 to-white":"border-emerald-200 bg-gradient-to-r from-emerald-50 to-white")}>
      <div className="flex justify-between items-center">
        <div><p className="font-mono font-extrabold text-lg text-slate-800 tracking-wider">{sessao.placa}</p><p className="text-sm text-slate-500 mt-0.5">{sessao.zona_nome} · R${sessao.valor_total}</p></div>
        <div className="text-right"><p className={"text-3xl font-mono font-extrabold tracking-tight "+(exp?"text-slate-300":lo?"text-red-600":md?"text-amber-500":"text-emerald-600")}>{tempo}</p>{lo&&!exp&&<p className="text-[10px] text-red-500 mt-0.5 flex items-center justify-end gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>Expirando</p>}</div>
      </div>
      <div className="mt-4 h-2.5 bg-slate-100 rounded-full overflow-hidden"><div className={"h-full rounded-full transition-all duration-1000 "+(exp?"bg-slate-200":lo?"bg-gradient-to-r from-red-400 to-red-600":md?"bg-gradient-to-r from-amber-300 to-amber-500":"bg-gradient-to-r from-emerald-400 to-emerald-600")} style={{width:`${pct}%`}}/></div>
      {!exp&&<button onClick={()=>onRenovar(sessao)} className="mt-3 text-sm text-blue-600 font-semibold cursor-pointer hover:text-blue-800 transition">Renovar credito</button>}
      {exp&&<p className="mt-3 text-sm text-slate-400">Expirado. Ative novamente na aba Estacionar.</p>}
    </div>
  )
}

function PgInicio({usuario, saldo}){
  const [sessoes,setSessoes]=useState([])
  const [notifs,setNotifs]=useState([])
  const [historico,setHistorico]=useState([])

  useEffect(()=>{
    api.get("/sessoes").then(r=>{
      const d=Array.isArray(r.data)?r.data:[]
      setSessoes(d.filter(s=>s.usuario_id===usuario.id&&s.status==="ativa"))
      const ultimos7=[]
      for(let i=6;i>=0;i--){const dt=new Date();dt.setDate(dt.getDate()-i);const ds=dt.toISOString().slice(0,10);const dia=d.filter(s=>s.usuario_id===usuario.id&&s.criado_em?.startsWith(ds));ultimos7.push({dia:ds.slice(8,10)+"/"+ds.slice(5,7),sessoes:dia.length,valor:dia.reduce((a,s)=>a+parseFloat(s.valor_total||0),0)})}
      setHistorico(ultimos7)
    }).catch(()=>{})
    api.get("/notificacoes/"+usuario.id).then(r=>setNotifs((r.data||[]).filter(n=>!n.lido).slice(0,3))).catch(()=>{})
  },[usuario])

  return(
    <div className="space-y-8">
      <div><h2 className="text-3xl font-extrabold text-slate-800">Ola, {usuario.nome?.split(" ")[0]}</h2><p className="text-slate-500 mt-1">Gerencie seus estacionamentos em Itajuba</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-7 rounded-2xl text-white shadow-xl shadow-blue-600/20 relative overflow-hidden"><div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"/><p className="text-blue-200 text-xs uppercase tracking-widest font-semibold relative z-10">Saldo disponivel</p><p className="text-4xl font-extrabold mt-3 relative z-10">R$ {parseFloat(saldo||0).toFixed(2)}</p></div>
        <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"><p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Creditos ativos</p><p className="text-4xl font-extrabold mt-3 text-slate-800">{sessoes.length}</p><p className="text-slate-400 text-sm mt-1">em uso agora</p></div>
        <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"><p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Alertas</p><p className="text-4xl font-extrabold mt-3 text-slate-800">{notifs.length}</p><p className="text-slate-400 text-sm mt-1">nao lidos</p></div>
      </div>
      {historico.length>0&&<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Seus gastos nos ultimos 7 dias</p><div style={{width:"100%",height:180}}><ResponsiveContainer><BarChart data={historico} margin={{top:5,right:5,bottom:5,left:5}}><XAxis dataKey="dia" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/><YAxis hide/><Tooltip formatter={(v)=>"R$ "+v.toFixed(2)} labelFormatter={(l)=>"Dia "+l} contentStyle={{borderRadius:8,border:"1px solid #e2e8f0",fontSize:12}}/><Bar dataKey="valor" fill="#3b82f6" radius={[6,6,0,0]} maxBarSize={32}/></BarChart></ResponsiveContainer></div></div>}
      {notifs.length>0&&<div className="space-y-3"><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Alertas recentes</p>{notifs.map(n=><div key={n.id} className={"p-4 rounded-xl border transition-all hover:shadow-md "+(n.tipo==="multa"?"border-red-200 bg-gradient-to-r from-red-50 to-white":"border-amber-200 bg-gradient-to-r from-amber-50 to-white")}><span className={"text-[10px] font-bold uppercase tracking-wider "+(n.tipo==="multa"?"text-red-400":"text-amber-400")}>{n.tipo}</span><p className="text-sm text-slate-700 mt-1">{n.mensagem}</p><p className="text-[11px] text-slate-400 mt-1">{new Date(n.criado_em).toLocaleString("pt-BR")}</p></div>)}</div>}
      {sessoes.length>0?<div><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Creditos ativos</p><div className="space-y-3">{sessoes.map(s=><Timer key={s.id} sessao={s} onRenovar={()=>alert("Use a aba Estacionar pra renovar")}/>)}</div></div>:<div className="bg-gradient-to-br from-slate-50 to-white p-12 rounded-2xl border border-slate-200 text-center"><Ic d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" c="w-16 h-16 text-slate-200 mx-auto"/><p className="text-slate-400 mt-4 text-lg">Nenhum credito ativo</p><p className="text-slate-400 text-sm mt-1">Va ate a aba Estacionar para ativar.</p></div>}
    </div>
  )
}

function PgVeiculos({usuario}){
  const [veiculos,setVeiculos]=useState([]),[tipo,setTipo]=useState("carro"),[marca,setMarca]=useState(""),[modelo,setModelo]=useState(""),[mc,setMc]=useState(""),[placa,setPlaca]=useState(""),[cor,setCor]=useState(""),[msg,setMsg]=useState("")
  const ms=tipo==="carro"?MARCAS_CARRO:MARCAS_MOTO,mds=marca&&marca!=="Outro"?ms[marca]||[]:[]
  const vp=p=>/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(p)
  const carregar=()=>{api.get("/veiculos").then(r=>setVeiculos((r.data||[]).filter(v=>v.usuario_id===usuario.id))).catch(()=>{})}
  useEffect(()=>{carregar()},[])
  const cadastrar=async(e)=>{e.preventDefault();setMsg("");const mod=marca==="Outro"?mc:modelo;if(!vp(placa)){setMsg("Placa invalida");return};try{await api.post("/veiculos",{usuario_id:usuario.id,placa,modelo:`${marca} ${mod}`,cor});setPlaca("");setMarca("");setModelo("");setMc("");setCor("");setMsg("Veiculo cadastrado");carregar()}catch(err){setMsg(err.response?.data?.erro||"Erro")}}
  return(
    <div className="space-y-6 h-full">
      <h2 className="text-2xl font-extrabold text-slate-800">Meus Veiculos</h2>
      {msg&&<p className={`text-sm p-3 rounded-lg ${msg.includes("Erro")||msg.includes("invalida")?"bg-red-50 text-red-600 border border-red-200":"bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>{msg}</p>}
      <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Novo veiculo</p>
        <div className="flex gap-3 mb-5">{["carro","moto"].map(t=><button key={t} onClick={()=>{setTipo(t);setMarca("");setModelo("")}} className={`px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all ${tipo===t?"bg-blue-600 text-white shadow-lg shadow-blue-600/20":"bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>{t==="carro"?"Carro":"Moto"}</button>)}</div>
        <form onSubmit={cadastrar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold text-slate-400 mb-1.5">Placa</label><input placeholder="ABC1D23 ou ABC1234" maxLength={7} className={`w-full border p-3 rounded-lg text-sm font-mono uppercase tracking-widest ${placa.length===7&&!vp(placa)?"border-red-300":"border-slate-200"} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`} value={placa} onChange={e=>setPlaca(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,7))}/>{placa.length===7&&!vp(placa)&&<p className="text-red-500 text-[11px] mt-1">Formato: ABC1D23 ou ABC1234</p>}</div>
          <div><label className="block text-xs font-semibold text-slate-400 mb-1.5">Marca</label><select className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={marca} onChange={e=>{setMarca(e.target.value);setModelo("")}}><option value="">Selecione a marca</option>{Object.keys(ms).map(m=><option key={m}>{m}</option>)}</select></div>
          <div><label className="block text-xs font-semibold text-slate-400 mb-1.5">Modelo</label>{marca==="Outro"?<input placeholder="Digite o modelo" className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" value={mc} onChange={e=>setMc(e.target.value)}/>:<select className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={modelo} onChange={e=>setModelo(e.target.value)} disabled={!marca}><option value="">{marca?"Selecione":"Marca primeiro"}</option>{mds.map(m=><option key={m}>{m}</option>)}</select>}</div>
          <div><label className="block text-xs font-semibold text-slate-400 mb-1.5">Cor</label><select className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={cor} onChange={e=>setCor(e.target.value)}><option value="">Selecione a cor</option>{["Branco","Prata","Preto","Cinza","Vermelho","Azul","Verde","Amarelo","Bege","Marrom"].map(c=><option key={c}>{c}</option>)}</select></div>
          <div className="md:col-span-2"><button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">Cadastrar Veiculo</button></div>
        </form>
      </div>
      {veiculos.length>0&&<div className="bg-white rounded-xl border border-slate-200 overflow-hidden"><div className="px-6 py-4 border-b border-slate-100"><p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Cadastrados ({veiculos.length})</p></div>{veiculos.map(v=><div key={v.id} className="flex items-center justify-between px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center"><span className="text-blue-600 font-black text-sm">P</span></div><div><p className="font-mono font-extrabold text-slate-800 tracking-wider text-lg">{v.placa}</p><p className="text-sm text-slate-400 mt-0.5">{v.modelo} · {v.cor}</p></div></div><button className="text-slate-300 hover:text-red-500 cursor-pointer text-sm transition">Remover</button></div>)}</div>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Polígonos reais das zonas de Zona Azul em Itajubá-MG
// Coordenadas no formato Leaflet [lat, lng] (GeoJSON usa [lng, lat] — já invertido)
// ---------------------------------------------------------------------------

// Comercial: retângulo simples
const _COMERCIAL_ANEL = [
  [-22.424198030624154, -45.460054705522055],
  [-22.426128428143585, -45.460054705522055],
  [-22.426128428143585, -45.453671842346495],
  [-22.424198030624154, -45.453671842346495],
  [-22.424198030624154, -45.460054705522055],
]

// Centro: dois polígonos distintos
const _CENTRO_ANEL_1 = [
  [-22.424198030624154, -45.460054705522055],
  [-22.426128428143585, -45.460054705522055],
  [-22.426128428143585, -45.453671842346495],
  [-22.424198030624154, -45.453671842346495],
  [-22.424198030624154, -45.460054705522055],
]
const _CENTRO_ANEL_2 = [
  [-22.42418232459613,  -45.46006216140711 ],
  [-22.42418232459613,  -45.453670664141754],
  [-22.4241643021886,   -45.45021079239726 ],
  [-22.42186301166271,  -45.45045349218151 ],
  [-22.42065723322544,  -45.460172599657994],
  [-22.42418232459613,  -45.46006216140711 ],
]

// Residencial: polígono externo grande com Centro e Comercial furados
const _RESIDENCIAL_EXTERNO = [
  [-22.41127289675218,  -45.46814557542862 ],
  [-22.43105980071286,  -45.47166755097146 ],
  [-22.435530319799113, -45.440319519899646],
  [-22.414870315641096, -45.43458169683376 ],
  [-22.41127289675218,  -45.46814557542862 ],
]

const ZONAS_POLIGONOS = {
  "Comercial": {
    aneis: [ _COMERCIAL_ANEL ],
    holes: [],
  },
  "Centro": {
    aneis: [ _CENTRO_ANEL_1, _CENTRO_ANEL_2 ],
    holes: [],
  },
  "Residencial": {
    aneis: [ _RESIDENCIAL_EXTERNO ],
    holes: [ _CENTRO_ANEL_1, _CENTRO_ANEL_2, _COMERCIAL_ANEL ],
  },
  "Sao Jose": {
    aneis: [[
      [-22.4305, -45.4480],
      [-22.4305, -45.4430],
      [-22.4345, -45.4430],
      [-22.4345, -45.4480],
      [-22.4305, -45.4480],
    ]],
    holes: [],
  },
  "Medicina": {
    aneis: [[
      [-22.4340, -45.4560],
      [-22.4340, -45.4510],
      [-22.4375, -45.4510],
      [-22.4375, -45.4560],
      [-22.4340, -45.4560],
    ]],
    holes: [],
  },
}
// Ray-casting para um único anel [lat,lng]
function _pontoNoAnel(lat, lng, anel) {
  let dentro = false
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    const [yi, xi] = anel[i], [yj, xj] = anel[j]
    if (((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi))
      dentro = !dentro
  }
  return dentro
}

// Retorna true se ponto está em algum anel externo E não está em nenhum buraco
function pontoNaZona(lat, lng, { aneis, holes }) {
  const noExterior = aneis.some(a => _pontoNoAnel(lat, lng, a))
  if (!noExterior) return false
  const noBuraco  = holes.some(h => _pontoNoAnel(lat, lng, h))
  return !noBuraco
}

// Dado lat/lng, retorna a chave da zona correspondente (ou null)
// Ordem importa: mais específicas primeiro (Comercial/Centro antes de Residencial)
function detectarZona(lat, lng) {
  const ORDEM = ["Comercial", "Centro", "Sao Jose", "Medicina", "Residencial"]
  for (const nome of ORDEM) {
    if (ZONAS_POLIGONOS[nome] && pontoNaZona(lat, lng, ZONAS_POLIGONOS[nome])) return nome
  }
  return null
}

// Centro geográfico do primeiro anel externo de cada zona
function centroidePoligono({ aneis }) {
  const poly = aneis[0]
  const lat = poly.reduce((s, p) => s + p[0], 0) / poly.length
  const lng = poly.reduce((s, p) => s + p[1], 0) / poly.length
  return { lat, lng }
}

function MapaZonas({ zonas, zSel, onSelect }) {
  const mapRef = useRef(null)
  const mapInstRef = useRef(null)
  const layersRef = useRef([])

  const CORES = ['#dc2626','#f59e0b','#059669','#2563eb','#7c3aed','#db2777','#ea580c','#0d9488']
  const COORDS_PADRAO = [
    [-22.4255,-45.4565],[-22.4251,-45.4530],[-22.4220,-45.4480],
    [-22.4320,-45.4455],[-22.4358,-45.4535],[-22.4280,-45.4600],
    [-22.4300,-45.4480],[-22.4240,-45.4550]
  ]

  useEffect(() => {
    if (!document.getElementById('leaflet-css-mz')) {
      const l = document.createElement('link')
      l.id = 'leaflet-css-mz'
      l.rel = 'stylesheet'
      l.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(l)
    }
    const load = () => {
      if (window.L) return initMap(window.L)
      const s = document.createElement('script')
      s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      s.onload = () => initMap(window.L)
      document.head.appendChild(s)
    }
    const initMap = (L) => {
      if (mapInstRef.current) { mapInstRef.current.remove(); mapInstRef.current = null }
      if (!mapRef.current) return
      const map = L.map(mapRef.current, { center: [-22.4270, -45.4530], zoom: 15 })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap', maxZoom: 19
      }).addTo(map)
      mapInstRef.current = map
    }
    load()
    return () => { if (mapInstRef.current) { mapInstRef.current.remove(); mapInstRef.current = null } }
  }, [])

  useEffect(() => {
    const L = window.L
    const map = mapInstRef.current
    if (!L || !map || zonas.length === 0) return

    layersRef.current.forEach(l => { try { l.remove() } catch(e) {} })
    layersRef.current = []

    zonas.forEach((z, idx) => {
      try {
        const cor = CORES[idx % CORES.length]
        const sel = zSel?.id === z.id
        let lat = z.lat ? parseFloat(z.lat) : null
        let lng = z.lng ? parseFloat(z.lng) : null

        if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
          const fallback = COORDS_PADRAO[idx % COORDS_PADRAO.length]
          lat = fallback[0]
          lng = fallback[1]
        }

        const raio = parseInt(z.raio) || 200

        const circle = L.circle([lat, lng], {
          radius: raio,
          color: cor,
          fillColor: cor,
          fillOpacity: sel ? 0.35 : 0.12,
          weight: sel ? 3 : 1.5,
        }).addTo(map)
        circle.on('click', () => onSelect(z))
        layersRef.current.push(circle)

        const icon = L.divIcon({
          className: '',
          html: '<div style="text-align:center;pointer-events:none;">' +
            '<div style="width:' + (sel ? '36px' : '26px') + ';height:' + (sel ? '36px' : '26px') +
            ';background:' + cor + ';border:2px solid white;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;' +
            'box-shadow:' + (sel ? '0 0 0 3px ' + cor + ',' : '') + '0 2px 6px rgba(0,0,0,0.25);transition:all 0.2s;">' +
            '<span style="color:white;font-size:' + (sel ? '11px' : '8px') + ';font-weight:900;">P</span></div>' +
            '<div style="margin-top:2px;background:' + (sel ? '#1e293b' : 'rgba(255,255,255,0.95)') +
            ';color:' + (sel ? 'white' : '#334155') + ';font-size:10px;font-weight:700;padding:1px 6px;border-radius:5px;' +
            'box-shadow:0 1px 3px rgba(0,0,0,0.15);white-space:nowrap;display:inline-block;">' + z.nome + '</div></div>',
          iconSize: [80, 46],
          iconAnchor: [40, 16],
        })
        const marker = L.marker([lat, lng], { icon: icon, interactive: true }).addTo(map).on('click', () => onSelect(z))
        layersRef.current.push(marker)
      } catch (e) {
        console.warn('Zona ignorada:', z.nome, e.message)
      }
    })
  }, [zonas, zSel])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}

function PgEstacionar({usuario,saldo,setSaldo}){
  const [zonas,setZonas]=useState([]),[veiculos,setVeiculos]=useState([]),[zSel,setZSel]=useState(null),[veic,setVeic]=useState(""),[dur,setDur]=useState(60),[msg,setMsg]=useState("")
  useEffect(()=>{api.get("/zonas").then(r=>setZonas(r.data||[])).catch(()=>{});api.get("/veiculos").then(r=>setVeiculos((r.data||[]).filter(v=>v.usuario_id===usuario.id))).catch(()=>{})},[])
  const ativar=async()=>{if(!zSel||!veic){setMsg("Selecione zona e veiculo");return};try{const{data}=await api.post("/sessoes",{veiculo_id:veic,zona_id:zSel.id,usuario_id:usuario.id,duracao_minutos:dur});setMsg("Credito ativado!");if(data.saldo!==undefined)setSaldo(data.saldo)}catch(err){setMsg(err.response?.data?.erro||"Erro")}}
  const matchZona=(nome)=>ZONAS_MAPA.find(z=>nome.toLowerCase().includes(z.nome.toLowerCase().split(" ")[0]))
  return(
    <div className="space-y-6 h-full">
      <div><h2 className="text-2xl font-extrabold text-slate-800">Estacionar</h2><p className="text-slate-500">Clique em qualquer ponto do mapa — a zona sera detectada automaticamente</p></div>
      {msg&&<p className={`text-sm p-3 rounded-lg ${msg.includes("Erro")||msg.includes("Saldo")||msg.includes("Selecione")?"bg-red-50 text-red-600 border border-red-200":"bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>{msg}</p>}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 h-full">
        <div className="xl:col-span-3 space-y-4">
          {/* Mapa Leaflet real */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{height:'clamp(280px, 45vh, 500px)'}}>
            <MapaZonas zonas={zonas} zSel={zSel} onSelect={setZSel}/>
          </div>
          {/* Lista de zonas clicáveis */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {zonas.map(z=>{const m=matchZona(z.nome);return(
              <button key={z.id} onClick={()=>setZSel(z)} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer text-left transition-all ${zSel?.id===z.id?"border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10":"border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"}`}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{background:m?.cor||"#94a3b8"}}/>
                <div className="flex-1 min-w-0"><p className="text-sm font-bold text-slate-700">{z.nome}</p><p className="text-[11px] text-slate-400 truncate">{z.descricao||m?.desc||""}</p></div>
                <span className="text-sm font-extrabold text-blue-600 whitespace-nowrap">R${parseFloat(z.preco_hora).toFixed(2)}</span>
              </button>
            )})}
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm xl:sticky xl:top-20 xl:col-span-2">
            {zSel?(<div className="space-y-4">
              <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full" style={{background:matchZona(zSel.nome)?.cor||"#94a3b8"}}/><div><p className="font-bold text-slate-800 text-lg">{zSel.nome}</p><p className="text-sm text-slate-400">{zSel.descricao||""}</p></div></div>
              <div className="text-center py-4 bg-blue-50 rounded-xl"><p className="text-3xl font-extrabold text-blue-600">R$ {parseFloat(zSel.preco_hora).toFixed(2)}<span className="text-sm font-normal text-blue-400">/hora</span></p></div>
              <div><label className="block text-xs font-semibold text-slate-400 mb-2">Veiculo</label><select className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={veic} onChange={e=>setVeic(e.target.value)}><option value="">Selecione seu veiculo</option>{veiculos.map(v=><option key={v.id} value={v.id}>{v.placa} - {v.modelo}</option>)}</select></div>
              <div><label className="block text-xs font-semibold text-slate-400 mb-2">Duracao</label><div className="grid grid-cols-3 gap-2">{[{v:30,l:"30 min"},{v:60,l:"1 hora"},{v:120,l:"2 horas"}].map(d=><button key={d.v} onClick={()=>setDur(d.v)} className={`py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all ${dur===d.v?"bg-blue-600 text-white shadow-lg shadow-blue-600/20":"bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>{d.l}</button>)}</div></div>
              <div className="flex justify-between items-center py-3 border-t border-slate-100"><span className="text-slate-400">Total</span><span className="text-2xl font-extrabold text-slate-800">R$ {(parseFloat(zSel.preco_hora)*dur/60).toFixed(2)}</span></div>
              <p className="text-xs text-slate-400 text-center">Saldo: R$ {parseFloat(saldo||0).toFixed(2)}</p>
              <div className="flex items-center gap-2 py-2"><input type="checkbox" id="autoRenew" className="w-4 h-4 accent-blue-600 cursor-pointer"/><label htmlFor="autoRenew" className="text-xs text-slate-500 cursor-pointer">Renovar automaticamente ao expirar</label></div>
              <button onClick={ativar} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/20 text-sm">Ativar Credito</button>
            </div>):(<div className="text-center py-16"><Ic d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" c="w-14 h-14 text-slate-200 mx-auto"/><p className="text-slate-400 mt-4 text-sm">Selecione uma zona no mapa</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function PgCarteira({usuario,saldo,setSaldo}){
  const [metodo,setMetodo]=useState("pix"),[valor,setValor]=useState(""),[extrato,setExtrato]=useState([]),[msg,setMsg]=useState(""),[cn,setCn]=useState(""),[cNome,setCNome]=useState(""),[cVal,setCVal]=useState(""),[cCvv,setCCvv]=useState("")
  const pix="00020126580014br.gov.bcb.pix0136zona-azul-itajuba5204000053039865802BR5925ZONA AZUL DIGITAL6009ITAJUBA6304"
  useEffect(()=>{api.get("/carteira/extrato/"+usuario.id).then(r=>setExtrato(r.data||[])).catch(()=>{})},[saldo])
  const depositar=async()=>{if(!valor||parseFloat(valor)<=0){setMsg("Informe um valor");return};try{const{data}=await api.post("/carteira/depositar",{usuario_id:usuario.id,valor:parseFloat(valor)});setSaldo(data.saldo);setMsg("Deposito de R$"+valor+" realizado");setValor("")}catch(err){setMsg(err.response?.data?.erro||"Erro")}}
  return(
    <div className="space-y-6 h-full">
      <h2 className="text-2xl font-extrabold text-slate-800">Carteira</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <div className="space-y-5 h-full">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-7 rounded-2xl text-white shadow-xl shadow-blue-600/20 relative overflow-hidden"><p className="text-blue-200 text-xs uppercase tracking-wider font-medium">Saldo disponivel</p><p className="text-4xl font-extrabold mt-2">R$ {parseFloat(saldo||0).toFixed(2)}</p></div>
          {msg&&<p className={`text-sm p-3 rounded-lg ${msg.includes("Erro")||msg.includes("Informe")?"bg-red-50 text-red-600 border border-red-200":"bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>{msg}</p>}
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Adicionar creditos</p>
            <div className="relative mb-3"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">R$</span><input type="number" placeholder="0,00" min="1" className="w-full border border-slate-200 p-3 pl-12 rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={valor} onChange={e=>setValor(e.target.value)}/></div>
            <div className="flex gap-2 mb-5">{["5","10","20","50"].map(v=><button key={v} onClick={()=>setValor(v)} className={`flex-1 py-2 rounded-lg text-sm font-semibold cursor-pointer transition ${valor===v?"bg-blue-600 text-white":"bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>R${v}</button>)}</div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg mb-5">{["pix","cartao"].map(m=><button key={m} onClick={()=>setMetodo(m)} className={`flex-1 py-2 rounded-md text-sm font-semibold cursor-pointer transition ${metodo===m?"bg-white shadow-sm text-blue-600":"text-slate-400"}`}>{m==="pix"?"PIX":"Cartao"}</button>)}</div>
            {metodo==="pix"?(<div className="space-y-4 text-center"><div className="mx-auto w-44 h-44 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200"><div className="grid grid-cols-7 gap-px w-28 h-28">{Array.from({length:49}).map((_,i)=><div key={i} className={`rounded-sm ${[0,1,2,4,5,6,7,13,14,20,28,34,35,41,42,43,44,46,47,48].includes(i)?"bg-slate-800":[8,9,10,16,24,32,38,39,40].includes(i)?"bg-slate-600":"bg-white"}`}/>)}</div></div><div className="bg-slate-50 rounded-lg p-3 flex items-center gap-2"><input readOnly value={pix} className="flex-1 bg-transparent text-[9px] text-slate-400 font-mono truncate outline-none"/><button onClick={()=>{navigator.clipboard?.writeText(pix);setMsg("Codigo copiado")}} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer hover:bg-blue-700 flex-shrink-0">Copiar</button></div><button onClick={depositar} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition">{valor?`Confirmar R$ ${valor},00`:"Informe o valor acima"}</button></div>):(<div className="space-y-3"><div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 text-white"><p className="text-[9px] text-slate-400 uppercase tracking-widest">Credito</p><p className="font-mono text-xl tracking-[0.12em] mt-3">{cn||"•••• •••• •••• ••••"}</p><div className="flex justify-between mt-4 text-sm text-slate-300"><span>{cNome||"TITULAR"}</span><span>{cVal||"MM/AA"}</span></div></div><input placeholder="Numero do cartao" maxLength={19} className="w-full border border-slate-200 p-3 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20" value={cn} onChange={e=>setCn(e.target.value)}/><input placeholder="Nome do titular" className="w-full border border-slate-200 p-3 rounded-lg text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500/20" value={cNome} onChange={e=>setCNome(e.target.value)}/><div className="grid grid-cols-2 gap-3"><input placeholder="MM/AA" maxLength={5} className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" value={cVal} onChange={e=>setCVal(e.target.value)}/><input placeholder="CVV" maxLength={4} type="password" className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" value={cCvv} onChange={e=>setCCvv(e.target.value)}/></div><button onClick={depositar} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition">{valor?`Pagar R$ ${valor},00`:"Informe o valor"}</button></div>)}
          </div>
        </div>
        <div className="h-full"><div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-full"><div className="px-6 py-4 border-b border-slate-100"><p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Extrato</p></div>{extrato.length===0?<p className="p-6 text-slate-400 text-sm text-center">Nenhuma transacao</p>:<div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">{extrato.map(t=><div key={t.id} className="flex items-center justify-between px-6 py-4"><div><p className="text-sm text-slate-700">{t.descricao}</p><p className="text-[11px] text-slate-400 mt-0.5">{new Date(t.criado_em).toLocaleString("pt-BR")}</p></div><span className={`text-sm font-bold ${t.tipo==="deposito"?"text-emerald-600":"text-red-500"}`}>{t.tipo==="deposito"?"+":"-"}R${parseFloat(t.valor).toFixed(2)}</span></div>)}</div>}</div></div>
      </div>
    </div>
  )
}

function PgHistorico({usuario}){
  const [sessoes,setSessoes]=useState([]),[filtro,setFiltro]=useState("")
  useEffect(()=>{api.get("/sessoes").then(r=>{const d=Array.isArray(r.data)?r.data:[];setSessoes(d.filter(s=>s.usuario_id===usuario.id))}).catch(()=>{})},[])
  const filtered=filtro?sessoes.filter(s=>s.criado_em?.startsWith(filtro)):sessoes
  return(
    <div className="space-y-full h-full">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-extrabold text-slate-800">Historico</h2><div className="flex items-center gap-3"><input type="date" className="border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" value={filtro} onChange={e=>setFiltro(e.target.value)}/>{filtro&&<button onClick={()=>setFiltro("")} className="text-sm text-blue-600 cursor-pointer font-semibold">Limpar</button>}</div></div>
      {filtered.length===0?<div className="bg-white p-10 rounded-xl border border-slate-200 text-center"><p className="text-slate-400">Nenhuma sessao encontrada</p></div>:<div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-50">{filtered.map(s=><div key={s.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><span className="text-blue-600 font-mono font-bold text-xs">P</span></div><div><p className="font-mono font-bold text-slate-800">{s.placa}</p><p className="text-sm text-slate-400">{s.zona_nome} · {s.duracao_minutos}min · {new Date(s.inicio).toLocaleString("pt-BR")}</p></div></div><div className="text-right"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status==="ativa"?"bg-emerald-100 text-emerald-700":"bg-slate-100 text-slate-500"}`}>{s.status}</span><p className="text-sm font-bold text-slate-700 mt-1">R${parseFloat(s.valor_total).toFixed(2)}</p></div></div>)}</div>}
    </div>
  )
}

function PgNotifs({usuario,onIrEstacionar}){
  const [notifs,setNotifs]=useState([])
  const carregar=()=>{api.get("/notificacoes/"+usuario.id).then(r=>setNotifs(r.data||[])).catch(()=>{})}
  useEffect(()=>{carregar()},[])
  const marcarLido=async(id)=>{await api.put("/notificacoes/lido/"+id);carregar()}
  return(
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800">Notificacoes</h2>
      {notifs.length===0?<div className="bg-white p-10 rounded-xl border border-slate-200 text-center"><p className="text-slate-400">Nenhuma notificacao</p></div>:<div className="space-y-3">{notifs.map(n=><div key={n.id} className={`p-5 rounded-xl border bg-white transition ${n.lido?"opacity-50 border-slate-100":n.tipo==="multa"?"border-red-200":"border-amber-200"}`}><div className="flex justify-between items-start"><div className="flex-1"><span className={`text-[10px] font-bold uppercase tracking-wider ${n.tipo==="multa"?"text-red-500":"text-amber-500"}`}>{n.tipo}</span><p className="text-sm text-slate-700 mt-1">{n.mensagem}</p>{n.tipo==="fiscal"&&!n.lido&&<button onClick={()=>onIrEstacionar()} className="mt-2 bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg cursor-pointer hover:bg-blue-700 font-semibold">Estacionar agora</button>}<p className="text-[11px] text-slate-400 mt-2">{new Date(n.criado_em).toLocaleString("pt-BR")}</p></div>{!n.lido&&<button onClick={()=>marcarLido(n.id)} className="text-xs text-blue-600 cursor-pointer font-semibold whitespace-nowrap ml-4 hover:text-blue-800">Marcar lido</button>}</div></div>)}</div>}
    </div>
  )
}

function PgConsulta({usuario}){
  const [placa,setPlaca]=useState(""),[res,setRes]=useState(null),[msg,setMsg]=useState(""),[zonas,setZonas]=useState([]),[zonaSel,setZonaSel]=useState("")
  useEffect(()=>{api.get("/zonas").then(r=>setZonas(r.data||[])).catch(()=>{})},[])
  const consultar=async()=>{setMsg("");try{const{data}=await api.get("/sessoes/verificar/"+placa.toUpperCase().trim());setRes(data)}catch(err){setMsg("Erro na consulta")}}
  const notificar=async()=>{try{const{data}=await api.post("/sessoes/notificar",{placa:res?.placa||placa,fiscal_id:usuario.id,zona_id:zonaSel||zonas[0]?.id});setMsg(data.mensagem||"Motorista notificado");consultar()}catch(err){setMsg(err.response?.data?.erro||"Erro ao notificar")}}
  return(
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800">Consultar Veiculo</h2>
      <div className="bg-white p-6 rounded-xl border border-slate-200"><div className="flex gap-3"><input placeholder="Digite a placa do veiculo" maxLength={7} className="flex-1 border border-slate-200 p-4 rounded-xl text-2xl font-mono uppercase tracking-[0.2em] text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={placa} onChange={e=>setPlaca(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,7))}/><button onClick={consultar} className="bg-blue-600 text-white px-10 rounded-xl font-semibold cursor-pointer hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">Consultar</button></div></div>
      {msg&&<p className={`text-sm p-3 rounded-lg ${msg.includes("Erro")?"bg-red-50 text-red-600 border border-red-200":"bg-blue-50 text-blue-600 border border-blue-200"}`}>{msg}</p>}
      {res&&(<div className={`p-8 rounded-xl text-center border-2 ${res.status==="regular"?"border-emerald-200 bg-emerald-50/50":"border-red-200 bg-red-50/50"}`}>
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${res.status==="regular"?"bg-emerald-100":"bg-red-100"}`}><svg className={`w-10 h-10 ${res.status==="regular"?"text-emerald-600":"text-red-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>{res.status==="regular"?<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>:<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>}</svg></div>
        <p className={`text-4xl font-black tracking-wider ${res.status==="regular"?"text-emerald-700":"text-red-700"}`}>{res.status==="regular"?"REGULAR":"IRREGULAR"}</p>
        <p className="text-slate-600 font-mono text-2xl mt-2 tracking-wider">{res.placa||placa}</p>
        {res.sessao&&<div className="mt-3 text-sm text-slate-500 space-y-0.5"><p>{res.sessao.modelo} · {res.sessao.cor}</p><p>Zona: {res.sessao.zona_nome}</p><p>Expira: {new Date(res.sessao.fim).toLocaleString("pt-BR")}</p></div>}
        {res.mensagem&&res.status==="irregular"&&<p className="mt-2 text-sm text-slate-500">{res.mensagem}</p>}
        {res.status==="irregular"&&(<div className="mt-6">{res.notificacao_pendente?<div className="inline-block bg-amber-50 border border-amber-200 rounded-xl p-4"><p className="text-amber-700 font-semibold">Notificacao ja enviada</p><p className="text-amber-600 text-sm mt-1">Aguardando prazo de 10 minutos. Multa sera aplicada automaticamente se nao regularizar.</p></div>:res.veiculo?<div className="space-y-3"><select className="w-full border border-slate-200 p-3 rounded-xl text-sm" value={zonaSel} onChange={e=>setZonaSel(e.target.value)}><option value="">Selecione a zona da irregularidade</option>{zonas.map(z=><option key={z.id} value={z.id}>{z.nome} - R${parseFloat(z.preco_hora).toFixed(2)}/h</option>)}</select><button onClick={notificar} disabled={!zonaSel} className={`w-full px-8 py-3 rounded-xl font-semibold cursor-pointer transition shadow-lg ${zonaSel?"bg-red-600 text-white hover:bg-red-700 shadow-red-600/20":"bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`}>Notificar motorista (10 min para renovar)</button></div>:<p className="text-slate-400 text-sm">Veiculo nao cadastrado no sistema</p>}</div>)}
      </div>)}
    </div>
  )
}

function PgPendentes(){
  const [fisc,setFisc]=useState([]),[filtro,setFiltro]=useState("")
  useEffect(()=>{api.get("/fiscalizacoes").then(r=>setFisc(r.data||[])).catch(()=>{})},[])
  const filtered=filtro?fisc.filter(f=>f.criado_em?.startsWith(filtro)):fisc
  const cores={regularizado:"bg-emerald-50/80 text-emerald-700 border-emerald-200/60",aguardando:"bg-amber-50/80 text-amber-700 border-amber-200/60",multado:"bg-purple-50 text-purple-600 border-purple-200",irregular:"bg-red-50/80 text-red-700 border-red-200/60"}
  return(
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3"><h2 className="text-2xl font-extrabold text-slate-800">Avisos Pendentes</h2><div className="flex items-center gap-2"><input type="date" className="border border-slate-200 p-2 rounded-lg text-sm" value={filtro} onChange={e=>setFiltro(e.target.value)}/>{filtro&&<button onClick={()=>setFiltro("")} className="text-sm text-blue-600 cursor-pointer font-semibold">Limpar</button>}</div></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center"><p className="text-[10px] text-slate-400 uppercase tracking-wider">Total</p><p className="text-2xl font-extrabold text-slate-800 mt-1">{filtered.length}</p></div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center"><p className="text-[10px] text-slate-400 uppercase tracking-wider">Irregulares</p><p className="text-2xl font-extrabold text-slate-800 mt-1">{filtered.filter(f=>f.status_atual==="irregular").length}</p></div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center"><p className="text-[10px] text-slate-400 uppercase tracking-wider">Aguardando</p><p className="text-2xl font-extrabold text-slate-800 mt-1">{filtered.filter(f=>f.status_atual==="aguardando").length}</p></div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center"><p className="text-[10px] text-slate-400 uppercase tracking-wider">Regularizados</p><p className="text-2xl font-extrabold text-slate-800 mt-1">{filtered.filter(f=>f.status_atual==="regularizado"||f.status_atual==="multado").length}</p></div>
      </div>
      {filtered.length===0?<div className="bg-white p-10 rounded-2xl border border-slate-200 text-center"><p className="text-slate-400">Nenhum aviso no periodo</p></div>:<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-50">{filtered.map(f=><div key={f.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition"><div className="flex items-center gap-4"><div><p className="font-mono font-bold text-slate-800">{f.placa}</p><p className="text-sm text-slate-400">{f.zona_nome} · {f.fiscal_nome}</p></div></div><div className="text-right"><span className={"text-[11px] font-semibold px-3 py-1 rounded-full border "+(cores[f.status_atual]||cores.irregular)}>{f.status_atual==="regularizado"?"Regularizado":f.status_atual==="aguardando"?"Aguardando":f.status_atual==="multado"?"Multado":"Irregular"}</span><p className="text-[11px] text-slate-400 mt-1">{new Date(f.criado_em).toLocaleString("pt-BR")}</p></div></div>)}</div>}
    </div>
  )
}

function PgResumo(){
  const [sessoes,setSessoes]=useState([]),[fisc,setFisc]=useState([]),[contagem,setContagem]=useState({total:0,irregulares:0,regularizados:0})
  const [periodo,setPeriodo]=useState("hoje"),[dataInicio,setDataInicio]=useState(""),[dataFim,setDataFim]=useState("")
  useEffect(()=>{
    api.get("/sessoes").then(r=>setSessoes(r.data||[])).catch(()=>{})
    api.get("/fiscalizacoes").then(r=>setFisc(r.data||[])).catch(()=>{})
    api.get("/fiscalizacoes/contagem").then(r=>setContagem(r.data)).catch(()=>{})
  },[])
  const hoje=new Date().toISOString().slice(0,10)
  const filtrar=(lista)=>{
    if(periodo==="hoje")return lista.filter(s=>s.criado_em?.startsWith(hoje))
    if(periodo==="semana"){const d=new Date();d.setDate(d.getDate()-7);return lista.filter(s=>new Date(s.criado_em)>=d)}
    if(periodo==="mes"){const d=new Date();d.setMonth(d.getMonth()-1);return lista.filter(s=>new Date(s.criado_em)>=d)}
    if(periodo==="custom"&&dataInicio)return lista.filter(s=>{const d=s.criado_em?.slice(0,10);return d>=dataInicio&&(!dataFim||d<=dataFim)})
    return lista
  }
  const sF=filtrar(sessoes),fF=filtrar(fisc),rec=sF.reduce((a,s)=>a+parseFloat(s.valor_total||0),0)
  return(
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3"><h2 className="text-2xl font-extrabold text-slate-800">Resumo</h2>
        <div className="flex items-center gap-2">
          {["hoje","semana","mes","custom"].map(p=><button key={p} onClick={()=>setPeriodo(p)} className={"px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition "+(periodo===p?"bg-blue-600 text-white":"bg-slate-100 text-slate-400 hover:bg-slate-200")}>{p==="hoje"?"Hoje":p==="semana"?"7 dias":p==="mes"?"30 dias":"Periodo"}</button>)}
        </div>
      </div>
      {periodo==="custom"&&<div className="flex items-center gap-3"><input type="date" className="border border-slate-200 p-2 rounded-lg text-sm" value={dataInicio} onChange={e=>setDataInicio(e.target.value)}/><span className="text-slate-400">ate</span><input type="date" className="border border-slate-200 p-2 rounded-lg text-sm" value={dataFim} onChange={e=>setDataFim(e.target.value)}/></div>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Sessoes</p><p className="text-4xl font-extrabold text-slate-800 mt-3">{sF.length}</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Receita</p><p className="text-4xl font-extrabold text-slate-800 mt-3">R$ {rec.toFixed(2)}</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Fiscalizacoes</p><p className="text-4xl font-extrabold text-slate-800 mt-3">{fF.length}</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Irregulares</p><p className="text-4xl font-extrabold text-slate-800 mt-3">{fF.filter(f=>f.status_atual==="irregular").length}</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"><div className="px-6 py-4 border-b border-slate-100"><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Sessoes</p></div>{sF.length===0?<p className="p-6 text-slate-400 text-sm text-center">Nenhuma sessao</p>:<div className="divide-y divide-slate-50">{sF.slice(0,10).map(s=><div key={s.id} className="flex items-center justify-between px-6 py-3.5"><div><p className="font-mono font-bold text-sm text-slate-800">{s.placa}</p><p className="text-[11px] text-slate-400">{s.zona_nome}</p></div><span className="text-sm font-extrabold text-slate-700">R${parseFloat(s.valor_total).toFixed(2)}</span></div>)}</div>}</div>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"><div className="px-6 py-4 border-b border-slate-100"><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Fiscalizacoes</p></div>{fF.length===0?<p className="p-6 text-slate-400 text-sm text-center">Nenhuma fiscalizacao</p>:<div className="divide-y divide-slate-50">{fF.slice(0,10).map(f=><div key={f.id} className="flex items-center justify-between px-6 py-3.5"><div><p className="font-mono font-bold text-sm text-slate-800">{f.placa}</p><p className="text-[11px] text-slate-400">{f.fiscal_nome}</p></div><span className={"text-[11px] font-semibold px-3 py-1 rounded-full border "+(f.status_atual==="regularizado"?"bg-emerald-50/80 text-emerald-700 border-emerald-200/60":f.status_atual==="aguardando"?"bg-amber-50/80 text-amber-700 border-amber-200/60":"bg-red-50/80 text-red-700 border-red-200/60")}>{f.status_atual==="regularizado"?"Regularizado":f.status_atual==="aguardando"?"Aguardando":"Irregular"}</span></div>)}</div>}</div>
      </div>
    </div>
  )
}

function PgMovimentacao(){
  const [sessoes,setSessoes]=useState([]),[fisc,setFisc]=useState([]),[uCount,setUCount]=useState(0)
  const [periodo,setPeriodo]=useState("hoje"),[dataInicio,setDataInicio]=useState(""),[dataFim,setDataFim]=useState("")
  useEffect(()=>{
    api.get("/sessoes").then(r=>setSessoes(r.data||[])).catch(()=>{})
    api.get("/fiscalizacoes").then(r=>setFisc(r.data||[])).catch(()=>{})
    api.get("/usuarios/contagem").then(r=>setUCount(r.data.total||0)).catch(()=>{})
  },[])
  const hoje=new Date().toISOString().slice(0,10)
  const filtrar=(lista)=>{
    if(periodo==="hoje")return lista.filter(s=>s.criado_em?.startsWith(hoje))
    if(periodo==="semana"){const d=new Date();d.setDate(d.getDate()-7);return lista.filter(s=>new Date(s.criado_em)>=d)}
    if(periodo==="mes"){const d=new Date();d.setMonth(d.getMonth()-1);return lista.filter(s=>new Date(s.criado_em)>=d)}
    if(periodo==="total")return lista
    if(periodo==="custom"&&dataInicio)return lista.filter(s=>{const d=s.criado_em?.slice(0,10);return d>=dataInicio&&(!dataFim||d<=dataFim)})
    return lista
  }
  const sF=filtrar(sessoes),fF=filtrar(fisc),rec=sF.reduce((a,s)=>a+parseFloat(s.valor_total||0),0),recT=sessoes.reduce((a,s)=>a+parseFloat(s.valor_total||0),0)
  const chartData=[]
  for(let i=6;i>=0;i--){const dt=new Date();dt.setDate(dt.getDate()-i);const ds=dt.toISOString().slice(0,10);const dia=sF.filter(s=>s.criado_em?.startsWith(ds));chartData.push({dia:ds.slice(8,10)+"/"+ds.slice(5,7),receita:dia.reduce((a,s)=>a+parseFloat(s.valor_total||0),0),sessoes:dia.length})}
  const pieData=[{name:"Irregulares",value:fF.filter(f=>f.status_atual==="irregular"||f.status_atual==="aguardando").length,cor:"#ef4444"},{name:"Regularizados",value:fF.filter(f=>f.status_atual==="regularizado"||f.status_atual==="multado").length,cor:"#10b981"}].filter(d=>d.value>0)
  return(
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3"><h2 className="text-2xl font-extrabold text-slate-800">Movimentacao</h2><button onClick={()=>{const w=window.open("","","width=800,height=600");w.document.write("<html><head><title>Relatorio Zona Azul</title><style>body{font-family:sans-serif;padding:30px}table{width:100%;border-collapse:collapse;margin:15px 0}th,td{border:1px solid #ddd;padding:8px;text-align:left;font-size:12px}th{background:#f1f5f9}.h{color:#1e40af;margin-bottom:5px}.sub{color:#64748b;font-size:13px;margin-bottom:20px}</style></head><body><h1 class=h>Relatorio Zona Azul Digital</h1><p class=sub>Periodo: "+(periodo==="hoje"?"Hoje":periodo==="semana"?"Ultimos 7 dias":periodo==="mes"?"Ultimos 30 dias":periodo==="total"?"Total":"Customizado")+" | Gerado em: "+new Date().toLocaleString("pt-BR")+"</p><h3>Resumo</h3><table><tr><th>Sessoes</th><th>Receita</th><th>Fiscalizacoes</th><th>Usuarios</th></tr><tr><td>"+sF.length+"</td><td>R$ "+rec.toFixed(2)+"</td><td>"+fF.length+"</td><td>"+uCount+"</td></tr></table><h3>Sessoes</h3><table><tr><th>Placa</th><th>Zona</th><th>Valor</th><th>Status</th><th>Data</th></tr>"+sF.slice(0,50).map(s=>"<tr><td>"+s.placa+"</td><td>"+s.zona_nome+"</td><td>R$"+parseFloat(s.valor_total).toFixed(2)+"</td><td>"+s.status+"</td><td>"+new Date(s.criado_em).toLocaleString("pt-BR")+"</td></tr>").join("")+"</table><h3>Fiscalizacoes</h3><table><tr><th>Placa</th><th>Fiscal</th><th>Status</th><th>Data</th></tr>"+fF.slice(0,50).map(f=>"<tr><td>"+f.placa+"</td><td>"+f.fiscal_nome+"</td><td>"+(f.status_atual||f.resultado)+"</td><td>"+new Date(f.criado_em).toLocaleString("pt-BR")+"</td></tr>").join("")+"</table></body></html>");w.document.close();w.print()}} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer hover:bg-slate-200 transition ml-2">Exportar PDF</button>
        <div className="flex items-center gap-2 flex-wrap">
          {["hoje","semana","mes","total","custom"].map(p=><button key={p} onClick={()=>setPeriodo(p)} className={"px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition "+(periodo===p?"bg-blue-600 text-white":"bg-slate-100 text-slate-400 hover:bg-slate-200")}>{p==="hoje"?"Hoje":p==="semana"?"7 dias":p==="mes"?"30 dias":p==="total"?"Total":"Periodo"}</button>)}
        </div>
      </div>
      {periodo==="custom"&&<div className="flex items-center gap-3"><input type="date" className="border border-slate-200 p-2 rounded-lg text-sm" value={dataInicio} onChange={e=>setDataInicio(e.target.value)}/><span className="text-slate-400">ate</span><input type="date" className="border border-slate-200 p-2 rounded-lg text-sm" value={dataFim} onChange={e=>setDataFim(e.target.value)}/></div>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Usuarios</p><p className="text-4xl font-extrabold text-slate-800 mt-3">{uCount}</p><p className="text-xs text-slate-400 mt-1">cadastrados</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Sessoes</p><p className="text-4xl font-extrabold text-slate-800 mt-3">{sF.length}</p><p className="text-xs text-slate-400 mt-1">no periodo</p></div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg"><p className="text-blue-200 text-[11px] uppercase tracking-widest font-semibold">Receita periodo</p><p className="text-4xl font-extrabold mt-3">R$ {rec.toFixed(2)}</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Receita total</p><p className="text-4xl font-extrabold text-slate-800 mt-3">R$ {recT.toFixed(2)}</p></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Fiscalizacoes</p><p className="text-3xl font-extrabold text-slate-800 mt-2">{fF.length}</p></div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Irregulares</p><p className="text-3xl font-extrabold text-slate-800 mt-2">{fF.filter(f=>f.status_atual==="irregular"||f.status_atual==="aguardando").length}</p></div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center"><p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Regularizados</p><p className="text-3xl font-extrabold text-slate-800 mt-2">{fF.filter(f=>f.status_atual==="regularizado"||f.status_atual==="multado").length}</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Receita por dia</p><div style={{width:"100%",height:200}}><ResponsiveContainer><BarChart data={chartData}><XAxis dataKey="dia" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/><YAxis hide/><Tooltip formatter={(v)=>"R$ "+v.toFixed(2)} contentStyle={{borderRadius:8,border:"1px solid #e2e8f0",fontSize:12}}/><Bar dataKey="receita" fill="#3b82f6" radius={[6,6,0,0]} maxBarSize={36}/></BarChart></ResponsiveContainer></div></div>
        {pieData.length>0&&<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Fiscalizacoes</p><div style={{width:"100%",height:200}}><ResponsiveContainer><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({name,value})=>name+" ("+value+")"}>{pieData.map((d,i)=><Cell key={i} fill={d.cor}/>)}</Pie><Tooltip contentStyle={{borderRadius:8,border:"1px solid #e2e8f0",fontSize:12}}/></PieChart></ResponsiveContainer></div></div>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"><div className="px-6 py-4 border-b border-slate-100"><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Sessoes recentes</p></div><div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">{sF.slice(0,12).map(s=><div key={s.id} className="flex items-center justify-between px-6 py-3.5"><div><p className="font-mono font-bold text-sm text-slate-800">{s.placa}</p><p className="text-[11px] text-slate-400">{s.zona_nome} · {new Date(s.criado_em).toLocaleString("pt-BR")}</p></div><div className="text-right"><span className={"text-[11px] font-semibold px-3 py-1 rounded-full border "+(s.status==="ativa"?"bg-emerald-50/80 text-emerald-700 border-emerald-200/60":"bg-slate-100 text-slate-500 border-slate-200")}>{s.status}</span><p className="text-sm font-extrabold text-slate-700 mt-1">R${parseFloat(s.valor_total).toFixed(2)}</p></div></div>)}</div></div>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"><div className="px-6 py-4 border-b border-slate-100"><p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Fiscalizacoes</p></div><div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">{fF.slice(0,12).map(f=><div key={f.id} className="flex items-center justify-between px-6 py-3.5"><div><p className="font-mono font-bold text-sm text-slate-800">{f.placa}</p><p className="text-[11px] text-slate-400">{f.fiscal_nome} · {new Date(f.criado_em).toLocaleString("pt-BR")}</p></div><span className={"text-[11px] font-semibold px-3 py-1 rounded-full border "+(f.status_atual==="regularizado"?"bg-emerald-50/80 text-emerald-700 border-emerald-200/60":f.status_atual==="aguardando"?"bg-amber-50/80 text-amber-700 border-amber-200/60":f.status_atual==="multado"?"bg-purple-50 text-purple-600 border-purple-200":"bg-red-50/80 text-red-700 border-red-200/60")}>{f.status_atual==="regularizado"?"Regularizado":f.status_atual==="aguardando"?"Aguardando":f.status_atual==="multado"?"Multado":"Irregular"}</span></div>)}</div></div>
      </div>
    </div>
  )
}

function PgGerZonas(){
  const [zonas,setZonas]=useState([]),[edit,setEdit]=useState(null),[nome,setNome]=useState(""),[desc,setDesc]=useState(""),[preco,setPreco]=useState(""),[msg,setMsg]=useState("")
  const [desenhando,setDesenhando]=useState(false),[centro,setCentro]=useState(null),[raio,setRaio]=useState(200)
  const mapRef2=useRef(null),mapInst2=useRef(null),circleRef2=useRef(null),markerRef2=useRef(null)
  const carregar=()=>{api.get("/zonas").then(r=>setZonas(r.data||[])).catch(()=>{})}
  useEffect(()=>{carregar()},[])

  useEffect(()=>{
    if(!desenhando){if(mapInst2.current){mapInst2.current.remove();mapInst2.current=null};return}
    const doInit=()=>{
      if(mapInst2.current){mapInst2.current.remove();mapInst2.current=null}
      if(!mapRef2.current)return
      const L=window.L
      const map=L.map(mapRef2.current,{center:[-22.4270,-45.4530],zoom:15})
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"OpenStreetMap",maxZoom:19}).addTo(map)
      mapInst2.current=map
      zonas.forEach(z=>{if(z.lat&&z.lng){L.circle([z.lat,z.lng],{radius:z.raio||200,color:"#94a3b8",fillColor:"#94a3b8",fillOpacity:0.08,weight:1,dashArray:"4 3"}).addTo(map);L.marker([z.lat,z.lng],{icon:L.divIcon({className:"",html:"<span style=\"background:#64748b;color:white;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;white-space:nowrap;\">"+z.nome+"</span>",iconSize:[60,18],iconAnchor:[30,9]})}).addTo(map)}})
      map.on("click",(e)=>{
        const{lat,lng}=e.latlng
        setCentro({lat,lng})
        if(markerRef2.current)markerRef2.current.remove()
        if(circleRef2.current)circleRef2.current.remove()
        markerRef2.current=L.circleMarker([lat,lng],{radius:7,color:"#2563eb",fillColor:"#2563eb",fillOpacity:1}).addTo(map)
        circleRef2.current=L.circle([lat,lng],{radius:raio,color:"#2563eb",fillColor:"#2563eb",fillOpacity:0.15,weight:2}).addTo(map)
      })
    }
    if(!window.L){const s=document.createElement("script");s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";s.onload=()=>doInit();document.head.appendChild(s);if(!document.getElementById("leaflet-css-admin")){const l=document.createElement("link");l.id="leaflet-css-admin";l.rel="stylesheet";l.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(l)}}else{setTimeout(doInit,100)}
    return()=>{if(mapInst2.current){mapInst2.current.remove();mapInst2.current=null}}
  },[desenhando])

  useEffect(()=>{
    if(!centro||!mapInst2.current||!window.L)return
    if(circleRef2.current)circleRef2.current.remove()
    circleRef2.current=window.L.circle([centro.lat,centro.lng],{radius:raio,color:"#2563eb",fillColor:"#2563eb",fillOpacity:0.15,weight:2}).addTo(mapInst2.current)
  },[raio])

  const criar=async()=>{if(!nome||!preco){setMsg("Preencha nome e preco");return};try{await api.post("/zonas",{nome,descricao:desc,preco_hora:parseFloat(preco),lat:centro?.lat||null,lng:centro?.lng||null,raio});setNome("");setDesc("");setPreco("");setCentro(null);setRaio(200);setDesenhando(false);setMsg("Zona criada");carregar()}catch(err){setMsg("Erro")}}
  const salvar=async(z)=>{try{await api.put("/zonas/"+z.id,{nome:z.nome,descricao:z.descricao,preco_hora:z.preco_hora,ativo:z.ativo,lat:z.lat,lng:z.lng,raio:z.raio});setEdit(null);setMsg("Salvo");carregar()}catch(err){setMsg("Erro")}}
  const excluir=async(z)=>{if(!confirm("Excluir a zona "+z.nome+"?"))return;try{await api.delete("/zonas/"+z.id);setMsg("Zona excluida");carregar()}catch(err){setMsg(err.response?.data?.erro||"Erro ao excluir")}}

  return(
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-extrabold text-slate-800">Zonas e Precos</h2><button onClick={()=>{setDesenhando(!desenhando);setCentro(null)}} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition ${desenhando?"bg-red-100 text-red-600 hover:bg-red-200":"bg-blue-600 text-white hover:bg-blue-700"}`}>{desenhando?"Fechar mapa":"+ Nova zona no mapa"}</button></div>
      {msg&&<p className="text-sm p-3 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">{msg}</p>}
      {desenhando&&(<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <p className="text-sm text-slate-500">Clique no mapa para definir o centro da zona. Ajuste o raio com o controle abaixo.</p>
        <div className="rounded-xl overflow-hidden border border-slate-200" style={{height:"350px"}}><div ref={mapRef2} style={{width:"100%",height:"100%"}}/></div>
        {centro&&<div className="space-y-3">
          <div className="flex items-center gap-4"><label className="text-sm font-semibold text-slate-600 whitespace-nowrap">Raio: {raio}m</label><input type="range" min="50" max="800" step="25" value={raio} onChange={e=>setRaio(parseInt(e.target.value))} className="flex-1 accent-blue-600"/></div>
          <p className="text-xs text-slate-400">Centro: {centro.lat.toFixed(6)}, {centro.lng.toFixed(6)}</p>
        </div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3"><input placeholder="Nome da zona" className="border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-400" value={nome} onChange={e=>setNome(e.target.value)}/><input placeholder="Descricao" className="border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-400" value={desc} onChange={e=>setDesc(e.target.value)}/><div className="flex gap-2"><input placeholder="R$/hora" type="number" step="0.5" className="flex-1 border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-400" value={preco} onChange={e=>setPreco(e.target.value)}/><button onClick={criar} disabled={!centro||!nome||!preco} className={`px-6 rounded-lg text-sm font-semibold cursor-pointer whitespace-nowrap ${centro&&nome&&preco?"bg-blue-600 text-white hover:bg-blue-700":"bg-slate-200 text-slate-400 cursor-not-allowed"}`}>Criar</button></div></div>
      </div>)}
      {!desenhando&&(<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Adicionar rapido (sem mapa)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><input placeholder="Nome da zona" className="border border-slate-200 p-3 rounded-lg text-sm" value={nome} onChange={e=>setNome(e.target.value)}/><input placeholder="Descricao" className="border border-slate-200 p-3 rounded-lg text-sm" value={desc} onChange={e=>setDesc(e.target.value)}/><div className="flex gap-2"><input placeholder="R$/hora" type="number" step="0.5" className="flex-1 border border-slate-200 p-3 rounded-lg text-sm" value={preco} onChange={e=>setPreco(e.target.value)}/><button onClick={criar} className="bg-blue-600 text-white px-6 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-700 whitespace-nowrap">Criar</button></div></div>
      </div>)}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-50">{zonas.map(z=><div key={z.id} className="px-6 py-4">{edit===z.id?(<div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center"><input defaultValue={z.nome} className="border border-slate-200 p-2.5 rounded-lg text-sm" onChange={e=>{z.nome=e.target.value}}/><input defaultValue={z.descricao} className="border border-slate-200 p-2.5 rounded-lg text-sm" onChange={e=>{z.descricao=e.target.value}}/><input defaultValue={z.preco_hora} type="number" step="0.5" className="border border-slate-200 p-2.5 rounded-lg text-sm" onChange={e=>{z.preco_hora=e.target.value}}/><div className="flex gap-2"><button onClick={()=>salvar(z)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer font-semibold">Salvar</button><button onClick={()=>setEdit(null)} className="text-slate-400 cursor-pointer text-sm">Cancelar</button></div></div>):(<div className="flex items-center justify-between"><div className="flex items-center gap-3">{z.lat&&<div className="w-2 h-2 rounded-full bg-blue-500"/>}<div><p className="font-semibold text-slate-800 text-lg">{z.nome}</p><p className="text-sm text-slate-400">{z.descricao}{z.raio?" · Raio: "+z.raio+"m":""}</p></div></div><div className="flex items-center gap-3"><span className="text-lg font-extrabold text-blue-600">R$ {parseFloat(z.preco_hora).toFixed(2)}<span className="text-sm font-normal text-slate-400">/h</span></span><button onClick={()=>setEdit(z.id)} className="text-blue-600 cursor-pointer text-sm font-semibold hover:text-blue-800">Editar</button><button onClick={()=>excluir(z)} className="text-red-400 cursor-pointer text-sm font-semibold hover:text-red-600">Excluir</button></div></div>)}</div>)}</div>
    </div>
  )
}

function PgFiscais(){
  const [fiscais,setFiscais]=useState([])
  const [nome,setNome]=useState("")
  const [email,setEmail]=useState("")
  const [cpf,setCpf]=useState("")
  const [msg,setMsg]=useState("")
  const [excluindo,setExcluindo]=useState(null)
  const [confirmTxt,setConfirmTxt]=useState("")

  const formatCpf=(v)=>{const n=v.replace(/[^0-9]/g,"").slice(0,11);if(n.length<=3)return n;if(n.length<=6)return n.slice(0,3)+"."+n.slice(3);if(n.length<=9)return n.slice(0,3)+"."+n.slice(3,6)+"."+n.slice(6);return n.slice(0,3)+"."+n.slice(3,6)+"."+n.slice(6,9)+"-"+n.slice(9)}

  const carregar=()=>{api.get("/usuarios").then(r=>setFiscais((r.data||[]).filter(u=>u.perfil==="fiscal"))).catch(()=>{})}
  useEffect(()=>{carregar()},[])

  const criar=async()=>{
    if(!nome||!email||!cpf){setMsg("Preencha todos os campos");return}
    try{await api.post("/usuarios",{nome,email,telefone:"",perfil:"fiscal",cognito_id:null,cpf});setMsg("Fiscal cadastrado");setNome("");setEmail("");setCpf("");carregar()}catch(err){setMsg(err.response?.data?.erro||"Erro")}
  }

  const excluir=async(f)=>{
    if(confirmTxt!=="Excluir"){setMsg("Digite Excluir para confirmar");return}
    try{await api.delete("/usuarios/"+f.id);setMsg("Fiscal excluido");setExcluindo(null);setConfirmTxt("");carregar()}catch(err){setMsg(err.response?.data?.erro||"Erro ao excluir")}
  }

  return(
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800">Fiscais</h2>
      {msg&&<p className="text-sm p-3 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">{msg}</p>}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Novo fiscal</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input placeholder="Nome completo" className="border border-slate-200 p-3 rounded-lg text-sm" value={nome} onChange={e=>setNome(e.target.value)}/>
          <input placeholder="Email" className="border border-slate-200 p-3 rounded-lg text-sm" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input placeholder="CPF" className="border border-slate-200 p-3 rounded-lg text-sm" value={cpf} onChange={e=>setCpf(formatCpf(e.target.value))}/>
          <button onClick={criar} className="bg-blue-600 text-white px-6 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-700">Cadastrar</button>
        </div>
      </div>
      {fiscais.length>0&&<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-50">
        {fiscais.map(f=><div key={f.id} className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><span className="text-blue-600 text-sm font-bold">{(f.nome||"F").split(" ").map(n=>n[0]).join("").slice(0,2)}</span></div>
              <div><p className="font-semibold text-slate-800">{f.nome}</p><p className="text-sm text-slate-400">{f.email}{f.cpf?" - "+f.cpf:""}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">Ativo</span>
              <button onClick={()=>{setExcluindo(excluindo===f.id?null:f.id);setConfirmTxt("")}} className="text-red-400 cursor-pointer text-sm font-semibold hover:text-red-600">Excluir</button>
            </div>
          </div>
          {excluindo===f.id&&<div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-500 mb-2">Digite "Excluir" para confirmar</p>
            <div className="flex gap-2">
              <input placeholder="Excluir" className="flex-1 border border-red-200 p-2 rounded text-sm" value={confirmTxt} onChange={e=>setConfirmTxt(e.target.value)}/>
              <button onClick={()=>excluir(f)} className="bg-red-600 text-white px-4 rounded text-sm font-semibold cursor-pointer hover:bg-red-700">Confirmar</button>
              <button onClick={()=>setExcluindo(null)} className="text-slate-400 cursor-pointer text-sm">Cancelar</button>
            </div>
          </div>}
        </div>)}
      </div>}
    </div>
  )
}


function PgPerfil({usuario,onLogout}){
  const navigate=useNavigate()
  const [nome,setNome]=useState(usuario?.nome||"")
  const [telefone,setTelefone]=useState(usuario?.telefone||"")
  const [msg,setMsg]=useState("")
  const [excluirAberto,setExcluirAberto]=useState(false)
  const [senhaExcluir,setSenhaExcluir]=useState("")
  const [excluirErro,setExcluirErro]=useState("")

  const salvarPerfil=async()=>{
    try{
      await api.put("/usuarios/"+usuario.id,{nome,telefone})
      const u={...usuario,nome,telefone}
      localStorage.setItem("usuario",JSON.stringify(u))
      setMsg("Perfil atualizado")
    }catch(err){setMsg("Erro ao salvar")}
  }

  const excluirConta=async()=>{
    setExcluirErro("")
    if(!senhaExcluir){setExcluirErro("Digite sua senha");return}
    try{
      await api.post("/auth/verificar-senha",{email:usuario.email,senha:senhaExcluir})
      if(!confirm("Tem certeza? Todos os seus dados serao apagados permanentemente."))return
      await api.delete("/usuarios/"+usuario.id)
      localStorage.clear()
      navigate("/")
    }catch(err){setExcluirErro("Senha incorreta")}
  }

  return(
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800">Meu Perfil</h2>
      {msg&&<p className="text-sm p-3 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">{msg}</p>}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"><span className="text-white text-xl font-bold">{(usuario?.nome||"U").split(" ").map(n=>n[0]).join("").slice(0,2)}</span></div>
          <div><p className="text-lg font-bold text-slate-800">{usuario?.nome}</p><p className="text-sm text-slate-400">{usuario?.email}</p><p className="text-xs text-slate-400 capitalize">{usuario?.perfil}</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold text-slate-400 mb-1.5">Nome</label><input className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-400" value={nome} onChange={e=>setNome(e.target.value)}/></div>
          <div><label className="block text-xs font-semibold text-slate-400 mb-1.5">Telefone</label><input className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-400" value={telefone} onChange={e=>setTelefone(e.target.value)}/></div>
          <div><label className="block text-xs font-semibold text-slate-400 mb-1.5">Email</label><input className="w-full border border-slate-200 p-3 rounded-lg text-sm bg-slate-50 text-slate-400" value={usuario?.email||""} disabled/></div>
          <div><label className="block text-xs font-semibold text-slate-400 mb-1.5">Saldo</label><input className="w-full border border-slate-200 p-3 rounded-lg text-sm bg-slate-50 text-slate-400" value={"R$ "+(parseFloat(usuario?.saldo||0).toFixed(2))} disabled/></div>
        </div>
        <button onClick={salvarPerfil} className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-700">Salvar alteracoes</button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div><p className="text-lg font-bold text-red-600">Excluir conta</p><p className="text-sm text-slate-400">Esta acao e irreversivel. Todos os seus dados serao apagados.</p></div>
          <button onClick={()=>setExcluirAberto(!excluirAberto)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-100 border border-red-200">{excluirAberto?"Cancelar":"Excluir conta"}</button>
        </div>
        {excluirAberto&&<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl space-y-3">
          <p className="text-sm text-red-500">Digite sua senha para confirmar a exclusao</p>
          <input type="password" placeholder="Sua senha de login" className="w-full border border-red-200 p-3 rounded-lg text-sm" value={senhaExcluir} onChange={e=>setSenhaExcluir(e.target.value)}/>
          {excluirErro&&<p className="text-red-500 text-xs">{excluirErro}</p>}
          <button onClick={excluirConta} className="w-full bg-red-600 text-white py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-700">Confirmar exclusao permanente</button>
        </div>}
      </div>
    </div>
  )
}

export default function Dashboard(){
  const navigate=useNavigate()
  const [usuario,setUsuario]=useState(null),[saldo,setSaldo]=useState("0.00"),[page,setPage]=useState(""),[mob,setMob]=useState(false)
  const [configOpen,setConfigOpen]=useState(false),[senhaExcluir,setSenhaExcluir]=useState(""),[excluirErro,setExcluirErro]=useState("")

  const excluirConta=async()=>{
    setExcluirErro("")
    if(!senhaExcluir){setExcluirErro("Digite sua senha");return}
    try{
      await api.post("/auth/verificar-senha",{email:usuario.email,senha:senhaExcluir})
      if(!confirm("Tem certeza que deseja excluir sua conta? Esta acao e irreversivel."))return
      await api.delete("/usuarios/"+usuario.id)
      localStorage.clear()
      navigate("/")
    }catch(err){setExcluirErro(err.response?.data?.erro||"Senha incorreta")}
  }
  useEffect(()=>{try{const u=localStorage.getItem("usuario");if(!u)return navigate("/login");const p=JSON.parse(u);setUsuario(p);setSaldo(p.saldo||"0.00");setPage(p.perfil==="admin"?"movimentacao":p.perfil==="fiscal"?"consulta":"inicio")}catch(err){localStorage.clear();navigate("/login")}},[])
  useEffect(()=>{if(usuario?.id)api.get("/carteira/saldo/"+usuario.id).then(r=>setSaldo(r.data.saldo)).catch(()=>{})},[usuario,page])
  const logout=()=>{localStorage.clear();navigate("/")}
  if(!usuario||!page)return null
  const perfil=usuario.perfil
  const render=()=>{switch(page){case "inicio":return <PgInicio usuario={usuario} saldo={saldo}/>;case "veiculos":return <PgVeiculos usuario={usuario}/>;case "estacionar":return <PgEstacionar usuario={usuario} saldo={saldo} setSaldo={setSaldo}/>;case "carteira":return <PgCarteira usuario={usuario} saldo={saldo} setSaldo={setSaldo}/>;case "historico":return <PgHistorico usuario={usuario}/>;case "perfil":return <PgPerfil usuario={usuario} onLogout={logout}/>;case "notifs":return <PgNotifs usuario={usuario} onIrEstacionar={()=>setPage("estacionar")}/>;case "consulta":return <PgConsulta usuario={usuario}/>;case "pendentes":return <PgPendentes/>;case "resumo":return <PgResumo/>;case "movimentacao":return <PgMovimentacao/>;case "ger-zonas":return <PgGerZonas/>;case "fiscais":return <PgFiscais/>;default:return null}}

      return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f1f5f9]">
      <Sidebar 
        page={page} 
        setPage={setPage} 
        perfil={perfil} 
        usuario={usuario} 
        onLogout={logout} 
        mob={mob} 
        setMob={setMob}
        onConfig={()=>setConfigOpen(true)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0">
          <button onClick={()=>setMob(true)} className="lg:hidden text-slate-400 cursor-pointer">
            <Ic d="M4 6h16M4 12h16M4 18h16" c="w-6 h-6"/>
          </button>
          <div className="flex-1"/>
          {perfil==="motorista" && (
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Ic d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" c="w-4 h-4 text-blue-600"/>
              <span className="text-sm font-bold text-blue-600">R$ {parseFloat(saldo||0).toFixed(2)}</span>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6 xl:p-8 bg-[#f1f5f9]">
          <div className="h-full max-w-screen-2xl mx-auto">
            {render()}
          </div>
        </main>
      </div>
    </div>
  
  )
}
