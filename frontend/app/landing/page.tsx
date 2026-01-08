"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Eye,
  Globe2,
  ShieldCheck,
  Target,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-50 selection:bg-cyan-500/30">
      {/* --- BACKGROUND AURORA --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -inset-[50%] opacity-30 blur-[100px] animate-aurora"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15), transparent 50%),
              radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.15), transparent 50%),
              radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.15), transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.15), transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.15), transparent 50%)
            `,
            backgroundSize: "200% 200%"
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light" />
      </div>

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B0E14]/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
               <Image 
                 src="/logo.png" 
                 alt="Horizon 360 Logo" 
                 fill
                 sizes="40px"
                 priority
                 className="object-contain"
               />
            </div>
            <span className="text-sm font-bold tracking-widest text-slate-100 uppercase">
              Horizon<span className="text-cyan-400">360°</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-slate-400 uppercase">
            <Link href="#features" className="hover:text-cyan-400 transition-colors">Funcionalidades</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Planos</Link>
            <Link href="#about" className="hover:text-cyan-400 transition-colors">Sobre</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/login"
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/dashboard"
              className="group relative overflow-hidden rounded-full bg-cyan-500/10 px-5 py-2 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
              <span className="relative z-20 text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                Começar Agora
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20">
        
        {/* --- HERO SECTION --- */}
        <section className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-8 animate-float" style={{ animationDuration: '8s' }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Sistema Operacional v2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[0.9]">
              Inteligência <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                360 Graus.
              </span>
            </h1>
            
            <p className="max-w-lg text-lg text-slate-400 leading-relaxed">
              O cockpit definitivo para empresas do futuro. Unificamos Recursos Humanos (RH), Finanças e Estratégia numa única interface holográfica impulsionada por Inteligência Artificial.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/dashboard"
                className="group relative flex items-center gap-3 rounded-xl bg-white text-black px-6 py-3.5 font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Inicar Demonstração
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                <Bot className="h-4 w-4 text-purple-400" />
                Falar com Horizon 360°
              </button>
            </div>
          </div>

          <div className="relative perspective-1000 group">
             {/* 3D Card Effect Container */}
             <div className="relative h-[400px] w-full transition-transform duration-700 ease-out transform group-hover:rotate-x-6 group-hover:rotate-y-[-6deg]">
                
                {/* Main Dashboard Card */}
                <div className="absolute inset-x-4 inset-y-0 rounded-2xl border border-white/10 bg-[#0B0E14]/60 backdrop-blur-xl shadow-2xl p-6 flex flex-col gap-6">
                   {/* Top Bar */}
                   <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                      </div>
                      <div className="h-2 w-20 rounded-full bg-white/10" />
                   </div>

                   {/* Content Mockup */}
                   <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-4">
                         <div className="h-32 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-4">
                            <div className="h-4 w-1/3 rounded bg-cyan-500/20 mb-2" />
                            <div className="h-8 w-1/2 rounded bg-cyan-500/40" />
                         </div>
                         <div className="h-24 rounded-xl bg-white/5 border border-white/5" />
                      </div>
                      <div className="space-y-4">
                         <div className="h-full rounded-xl bg-white/5 border border-white/5" />
                      </div>
                   </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-4 top-12 rounded-xl bg-[#1A1F2E]/90 border border-white/10 p-4 shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '1s' }}>
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                         <Zap className="h-4 w-4" />
                      </div>
                      <div>
                         <div className="text-xs text-slate-400">Eficiência</div>
                         <div className="text-sm font-bold text-white">+24.5%</div>
                      </div>
                   </div>
                </div>

                <div className="absolute -left-6 bottom-20 rounded-xl bg-[#1A1F2E]/90 border border-white/10 p-4 shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '2.5s' }}>
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                         <Bot className="h-4 w-4" />
                      </div>
                      <div>
                         <div className="text-xs text-slate-400">AI Insight</div>
                         <div className="text-sm font-bold text-white">Risco Detectado</div>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="mx-auto max-w-7xl px-6 mb-32">
          
          <div className="grid md:grid-cols-2 gap-8">
             
             {/* Mission & Vision Container */}
             <div className="rounded-3xl border border-white/10 bg-white/5 p-8 relative overflow-hidden group hover:bg-white/10 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 space-y-8">
                   {/* Mission */}
                   <div>
                      <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs mb-3">
                        <Target className="h-4 w-4" /> Missão
                      </div>
                      <p className="text-xl text-white font-medium leading-relaxed">
                        Capacitar líderes visionários, transformando dados fragmentados em inteligência estratégica.
                      </p>
                   </div>

                   {/* Vision */}
                   <div>
                       <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-widest text-xs mb-3">
                        <Eye className="h-4 w-4" /> Nossa Visão
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed text-justify">
                        O Horizon 360° propõe uma arquitectura unificada, na qual todos os dados organizacionais <span className="text-purple-400">financeiros e humanos</span> são centralizados e analisados de forma conjunta, eliminando silos de informação.
                      </p>
                   </div>
                </div>
             </div>

             {/* Differentiator & Why Us Container */}
             <div className="rounded-3xl border border-white/10 bg-white/5 p-8 relative overflow-hidden group hover:bg-white/10 transition-colors">
                 <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="relative z-10 space-y-8">
                    {/* Differentiator */}
                    <div>
                      <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs mb-3">
                        <Zap className="h-4 w-4" /> Diferencial
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed text-justify">
                        A principal distinção reside na abordagem integrada. Enquanto a maioria trata finanças e RH como módulos independentes, nós correlacionamos diretamente o investimento em capital humano com os resultados financeiros.
                      </p>
                    </div>

                    {/* Why Us */}
                    <div>
                       <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-widest text-xs mb-3">
                        <Check className="h-4 w-4" /> Por Que Horizon 360°?
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed text-justify">
                        Esta integração permite uma visão holística, potenciando análises consistentes, previsões mais precisas e um apoio estratégico à decisão que enxerga a organização como um todo orgânico.
                      </p>
                    </div>
                 </div>
             </div>

          </div>
        </section>


        {/* --- GRID FEATURE SECTION --- */}
        <section id="features" className="mx-auto max-w-7xl px-6 mb-32">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">O Futuro da Gestão</h2>
            <p className="text-slate-400">Abandonamos as planilhas e dashboards estáticos. Bem-vindo à era da gestão preditiva.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Bento Card 1 - Large */}
            <div className="md:col-span-2 rounded-3xl border border-white/5 bg-white/5 p-8 relative overflow-hidden group hover:bg-white/10 transition-colors">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <h3 className="text-2xl font-semibold mb-2 relative z-10">AI Cortex</h3>
               <p className="text-slate-400 max-w-md relative z-10">Nossa inteligência artificial monitora 24/7 os sinais vitais da sua empresa, sugerindo correções de rota antes que os problemas aconteçam.</p>
               
               <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-tl-[100px] border-t border-l border-white/5" />
               <Bot className="absolute bottom-8 right-8 h-24 w-24 text-cyan-500/20" />
            </div>

            {/* Bento Card 2 */}
            <div className="rounded-3xl border border-white/5 bg-white/5 p-8 relative overflow-hidden group hover:bg-white/10 transition-colors">
               <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                 <Globe2 className="h-5 w-5" />
               </div>
               <h3 className="text-xl font-semibold mb-2">Global & Local</h3>
               <p className="text-sm text-slate-400">Multi-moeda, multi-fuso e compliant com legislações locais automaticamente.</p>
            </div>

            {/* Bento Card 3 */}
            <div className="rounded-3xl border border-white/5 bg-white/5 p-8 relative overflow-hidden group hover:bg-white/10 transition-colors">
               <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
                 <BarChart3 className="h-5 w-5" />
               </div>
               <h3 className="text-xl font-semibold mb-2">Real-time Cashflow</h3>
               <p className="text-sm text-slate-400">Previsão de caixa com precisão milimétrica baseada em comportamento histórico.</p>
            </div>

            {/* Bento Card 4 - Large */}
            <div className="md:col-span-2 rounded-3xl border border-white/5 bg-white/5 p-8 relative overflow-hidden group hover:bg-white/10 transition-colors flex flex-col justify-center">
               <div className="flex items-center gap-12">
                   <div className="space-y-4 flex-1">
                      <h3 className="text-2xl font-semibold">Segurança Militar</h3>
                      <p className="text-slate-400">Criptografia ponta-a-ponta, logs imutáveis e controle de acesso granular.</p>
                      <div className="flex gap-4 pt-2">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">SOC2 Type II</div>
                         <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">GDPR Ready</div>
                      </div>
                   </div>
                   <div className="hidden md:block h-32 w-32 relative">
                      <ShieldCheck className="h-full w-full text-slate-700/50" />
                   </div>
               </div>
            </div>
          </div>
        </section>


        {/* --- PRICING --- */}
        <section id="pricing" className="mx-auto max-w-7xl px-6 mb-20">
           <div className="text-center mb-16">
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Acesso</span>
              <h2 className="text-3xl font-bold mt-2">Escolha seu Nível</h2>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {/* Plan 1 */}
              <div className="rounded-2xl border border-white/10 bg-[#0F1219] p-1 shadow-2xl hover:border-white/20 transition-all">
                <div className="h-full rounded-xl bg-[#0B0E14] p-8 flex flex-col">
                  <div className="mb-4 text-slate-400 font-medium tracking-wide text-sm">STARTER</div>
                  <div className="mb-6">
                     <span className="text-4xl font-bold text-white">R$ 990</span>
                     <span className="text-slate-500">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Até 150 colaboradores', 'Dashboards básicos', '1 Conector Financeiro'].map(i => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                        <Check className="h-4 w-4 text-cyan-500" /> {i}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-semibold text-sm">Começar Agora</button>
                </div>
              </div>

              {/* Plan 2 - Featured */}
              <div className="relative rounded-2xl border border-cyan-500/50 bg-gradient-to-b from-cyan-500/20 to-transparent p-1 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-[#0B0E14] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Mais Popular</div>
                <div className="h-full rounded-xl bg-[#0B0E14] p-8 flex flex-col">
                  <div className="mb-4 text-cyan-400 font-medium tracking-wide text-sm">GROWTH</div>
                  <div className="mb-6">
                     <span className="text-4xl font-bold text-white">R$ 3.900</span>
                     <span className="text-slate-500">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Até 1.000 colaboradores', 'AI Insights Completo', 'Conectores Ilimitados', 'Headcount Planning'].map(i => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                        <Check className="h-4 w-4 text-cyan-500" /> {i}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] transition-colors font-bold text-sm">Solicitar Acesso</button>
                </div>
              </div>

              {/* Plan 3 */}
              <div className="rounded-2xl border border-white/10 bg-[#0F1219] p-1 shadow-2xl hover:border-white/20 transition-all">
                <div className="h-full rounded-xl bg-[#0B0E14] p-8 flex flex-col">
                  <div className="mb-4 text-purple-400 font-medium tracking-wide text-sm">ENTERPRISE</div>
                  <div className="mb-6">
                     <span className="text-2xl font-bold text-white">Sob Consulta</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Colaboradores Ilimitados', 'Infraestrutura Dedicada', 'SLA Garantido', 'Gerente de Conta'].map(i => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                        <Check className="h-4 w-4 text-purple-500" /> {i}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-semibold text-sm">Falar com Vendas</button>
                </div>
              </div>
           </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-[#080a0f] py-12">
         <div className="mx-auto max-w-7xl px-6">
            {/* Disclaimer */}
            <div className="mb-8 border-b border-white/5 pb-8 text-xs leading-relaxed text-slate-500 text-justify">
              O sistema foi concebido para permitir que cada organização insira e gera os seus próprios dados financeiros e de capital humano. Durante as fases de desenvolvimento e teste, são utilizados dados fictícios ou anonimizados, assegurando a confidencialidade da informação. Em ambiente de produção, a responsabilidade pela inserção e veracidade dos dados pertence à empresa utilizadora, sendo o sistema responsável apenas pelo processamento, análise e apoio à tomada de decisão.
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-slate-500 text-sm">
                 © 2026 Horizon 360° Inc. Building the future.
              </div>
              <div className="flex gap-6">
                 <Link href="#" className="text-slate-500 hover:text-white transition-colors"><Globe2 className="h-5 w-5" /></Link>
                 <Link href="#" className="text-slate-500 hover:text-white transition-colors"><Bot className="h-5 w-5" /></Link>
                 <Link href="#" className="text-slate-500 hover:text-white transition-colors"><Zap className="h-5 w-5" /></Link>
              </div>
            </div>
         </div>
      </footer>

    </div>
  );
}
