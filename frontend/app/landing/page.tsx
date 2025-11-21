"use client";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative isolate">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-16 -top-32 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-purple-700/40 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
        </div>

        {/* HEADER */}
        <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-slate-900 shadow-[0_0_25px_rgba(56,189,248,0.8)]" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
                  Horizon 360°
                </span>
                <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Intelligence System
                </span>
              </div>
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-100"
                onClick={() => {
                  const checkbox = document.getElementById(
                    "landing-nav-toggle"
                  ) as HTMLInputElement | null;
                  if (checkbox) checkbox.checked = !checkbox.checked;
                }}
              >
                Menu
              </button>
            </div>

            <input
              id="landing-nav-toggle"
              type="checkbox"
              className="peer hidden"
              aria-label="Alternar navegação principal"
            />

            <nav className="absolute left-0 right-0 top-full max-h-0 overflow-hidden border-b border-slate-800/60 bg-slate-950/95 px-4 pb-3 pt-2 text-sm opacity-0 transition-all duration-200 peer-checked:max-h-80 peer-checked:opacity-100 md:static md:max-h-none md:border-none md:bg-transparent md:px-0 md:py-0 md:opacity-100">
              <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-6">
                  <a
                    href="#sobre"
                    className="text-sm font-medium text-slate-300 transition-colors hover:text-sky-300"
                  >
                    Sobre
                  </a>
                  <a
                    href="#funcionalidades"
                    className="text-sm font-medium text-slate-300 transition-colors hover:text-sky-300"
                  >
                    Funcionalidades
                  </a>
                  <a
                    href="#precos"
                    className="text-sm font-medium text-slate-300 transition-colors hover:text-sky-300"
                  >
                    Preços
                  </a>
                  <a
                    href="#contactos"
                    className="text-sm font-medium text-slate-300 transition-colors hover:text-sky-300"
                  >
                    Contactos
                  </a>
                </div>
                <div className="mt-2 flex items-center gap-2 md:mt-0">
                  <button className="rounded-full border border-slate-600/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-100">
                    Entrar
                  </button>
                  <a
                    href="/dashboard"
                    className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-[0_15px_40px_rgba(8,47,73,0.8)] transition-transform hover:-translate-y-[1px]"
                  >
                    Aceder ao Dashboard
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <main className="relative z-10">
          {/* HERO */}
          <section className="border-b border-slate-800/70 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950/60 py-10 md:py-14">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 md:flex-row md:px-6">
              <div className="max-w-xl space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">
                  Plataforma unificada de RH + Finanças
                </p>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Uma visão{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
                    360°
                  </span>{" "}
                  da sua empresa, em tempo real.
                </h1>
                <p className="text-sm leading-relaxed text-slate-300">
                  O Horizon 360° integra gestão de recursos humanos e gestão
                  financeira numa única plataforma inteligente, com IA para
                  automatizar processos, prever resultados e gerar relatórios
                  estratégicos em tempo real.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/dashboard"
                    className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_15px_40px_rgba(8,47,73,0.8)] transition-transform hover:-translate-y-[1px]"
                  >
                    Aceder ao Dashboard
                  </a>
                  <a
                    href="#como-funciona"
                    className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-100 hover:border-sky-500 hover:text-sky-100"
                  >
                    Ver Demonstração
                  </a>
                </div>
                <p className="max-w-md text-xs text-slate-400">
                  Pensado para{" "}
                  <span className="font-medium text-slate-100">
                    empresas em crescimento
                  </span>
                  , PMEs e grandes organizações que precisam de decisões
                  rápidas, dados confiáveis e um cockpit único para pessoas e
                  finanças.
                </p>
                <dl className="grid grid-cols-2 gap-4 pt-2 text-xs text-slate-300 md:grid-cols-3">
                  <div>
                    <dt className="font-medium text-slate-400">Cobertura</dt>
                    <dd className="text-slate-100">
                      RH, Folha, Cashflow &amp; IA
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-400">Atualização</dt>
                    <dd className="text-slate-100">Dados em tempo real</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-400">Segurança</dt>
                    <dd className="text-slate-100">
                      Encriptação ponta-a-ponta
                    </dd>
                  </div>
                </dl>
              </div>

              {/* pseudo-3D dashboard */}
              <div className="relative flex flex-1 items-center justify-center py-4 md:py-0">
                <div className="pointer-events-none absolute inset-6 rounded-full border border-dashed border-sky-500/40 opacity-70 blur-[0.5px]" />
                <div className="relative h-64 w-full max-w-md [perspective:1400px]">
                  <div className="absolute inset-0 rounded-2xl border border-slate-700/70 bg-slate-900/80 shadow-[0_25px_70px_rgba(15,23,42,0.95)] backdrop-blur-xl [transform:rotateX(18deg)_rotateY(-20deg)_translate3d(10px,-16px,80px)]">
                    <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Painel executivo
                      </p>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.7rem] text-emerald-300">
                        IA ativa
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 px-4 py-3 text-xs">
                      <div>
                        <p className="text-slate-400">Headcount ativo</p>
                        <p className="text-lg font-semibold text-slate-50">
                          742
                        </p>
                        <p className="mt-1 text-[0.7rem] text-emerald-400">
                          +4,2% vs. último trimestre
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400">Margem de caixa</p>
                        <p className="text-lg font-semibold text-slate-50">
                          R$ 1,9M
                        </p>
                        <p className="mt-1 text-[0.7rem] text-emerald-400">
                          Risco de stress &lt; 8%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-900/80 px-4 py-3 text-[0.7rem] text-slate-400">
                      <span>Insights de IA ativos</span>
                      <span className="rounded-full border border-sky-500/50 bg-sky-500/10 px-2 py-0.5 text-[0.7rem] text-sky-100">
                        24 alertas críticos
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-6 bottom-2 top-10 rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-[0_18px_50px_rgba(15,23,42,0.9)] backdrop-blur-lg [transform:rotateX(18deg)_rotateY(-14deg)_translate3d(-24px,30px,30px)_scale(0.95)]">
                    <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-2.5 text-[0.7rem] text-slate-300">
                      <span>Entradas previstas (30 dias)</span>
                      <span>R$ 2,7M</span>
                    </div>
                    <div className="flex gap-1 px-4 pt-3">
                      <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
                      <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-sky-500 to-sky-300/40" />
                      <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200/40" />
                    </div>
                  </div>

                  <div className="absolute inset-x-10 bottom-0 top-20 rounded-2xl border border-slate-800/80 bg-slate-950/90 shadow-[0_16px_40px_rgba(15,23,42,0.95)] backdrop-blur-lg [transform:rotateX(18deg)_rotateY(-26deg)_translate3d(40px,52px,-10px)_scale(0.9)]">
                    <div className="flex items-center justify-between px-4 py-2.5 text-[0.7rem] text-slate-300">
                      <span>Folha &amp; benefícios</span>
                      <span>+12% vs. período anterior</span>
                    </div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-sky-400 via-purple-500/70 to-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SOBRE / COMO AJUDA */}
          <section
            id="sobre"
            className="border-b border-slate-800/60 bg-slate-950/70 py-12"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">
                  Como o Horizon 360° ajuda
                </p>
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                  Um cockpit único para decisões sobre pessoas, custos e caixa.
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  Em vez de dezenas de folhas de cálculo e soluções
                  desconectadas, o Horizon 360° liga dados de RH, folha de
                  pagamento e finanças numa plataforma única. Com modelos de IA
                  prontos, a sua equipa ganha recomendações acionáveis, alertas
                  de risco e projeções de cenário em segundos.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <article className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-slate-900 text-xs font-semibold text-emerald-950 shadow-[0_10px_25px_rgba(16,185,129,0.8)]">
                    👥
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Gestão de Pessoas ligada ao caixa
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Headcount, custos de pessoal, absenteísmo e performance
                    conectados ao impacto financeiro. Simule admissões,
                    promoções e planos de redução com efeito imediato no
                    P&amp;L.
                  </p>
                  <p className="mt-3 inline-flex rounded-full border border-emerald-400/60 bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-200">
                    • Headcount em tempo real
                  </p>
                </article>

                <article className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-slate-900 text-xs font-semibold text-sky-950 shadow-[0_10px_25px_rgba(56,189,248,0.8)]">
                    📊
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Cashflow e projeções inteligentes
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Receitas, despesas, folha, impostos e compromissos futuros
                    numa linha única de fluxo de caixa, com previsões
                    trimestrais e stress tests gerados por IA.
                  </p>
                  <p className="mt-3 inline-flex rounded-full border border-sky-400/50 bg-sky-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-sky-100">
                    • Cenários "what-if" em segundos
                  </p>
                </article>

                <article className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-slate-900 text-xs font-semibold text-fuchsia-50 shadow-[0_10px_25px_rgba(192,38,211,0.85)]">
                    🤖
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Insights de IA como copiloto
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    O motor de IA monitora padrões de rotatividade, risco de
                    retenção, concentração de custos e anomalias no fluxo de
                    caixa, sugerindo ações práticas antes que o problema apareça
                    no resultado.
                  </p>
                  <p className="mt-3 inline-flex rounded-full border border-fuchsia-400/60 bg-fuchsia-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-fuchsia-100">
                    • Alertas proativos &amp; recomendações
                  </p>
                </article>

                <article className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 via-violet-500 to-slate-900 text-xs font-semibold text-indigo-50 shadow-[0_10px_25px_rgba(129,140,248,0.85)]">
                    📈
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Relatórios estratégicos em tempo real
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Dashboards dinâmicos para diretoria, RH e finanças, com KPIs
                    consolidados e narrativas de IA que suportam decisões
                    rápidas e fundamentadas.
                  </p>
                  <p className="mt-3 inline-flex rounded-full border border-indigo-400/60 bg-indigo-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-indigo-100">
                    • Visões executivas prontas para conselho
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* COMO FUNCIONA */}
          <section
            id="como-funciona"
            className="border-b border-slate-800/60 bg-slate-950/75 py-12"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">
                  Como funciona
                </p>
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                  Do onboarding ao Dashboard 360° em poucos passos.
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  Um fluxo guiado para configurar unidades de negócio, importar
                  dados de RH e financeiro e ativar insights de IA sem paralisar
                  a operação do dia a dia.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <article className="relative rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                  <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-sky-400/70 bg-sky-500/10 text-[0.7rem] font-semibold text-sky-100">
                    1
                  </span>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Configure a sua empresa e equipas
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Parametrize unidades de negócio, centros de custo, funções e
                    políticas de RH para que o cockpit reflita a estrutura real
                    da organização.
                  </p>
                </article>

                <article className="relative rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                  <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 text-[0.7rem] font-semibold text-emerald-100">
                    2
                  </span>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Importe dados de RH e financeiro
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Conecte folha de pagamento, ERPs, CRMs e bancos para trazer
                    headcount, custos, receitas e compromissos futuros para um
                    único modelo de dados.
                  </p>
                </article>

                <article className="relative rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
                  <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-fuchsia-400/70 bg-fuchsia-500/10 text-[0.7rem] font-semibold text-fuchsia-100">
                    3
                  </span>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Acompanhe tudo no Dashboard 360°
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Visualize pessoas, custos e caixa em tempo real, com
                    sugestões de IA e alertas proativos para apoiar decisões
                    executivas no dia a dia.
                  </p>
                </article>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-md text-xs text-slate-400">
                  Em poucas semanas, a sua equipa passa de relatórios manuais e
                  dispersos para um cockpit único com visão 360° e previsões de
                  IA prontas para discussão com diretoria e conselho.
                </p>
                <a
                  href="/dashboard"
                  className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_15px_40px_rgba(8,47,73,0.8)] transition-transform hover:-translate-y-[1px]"
                >
                  Aceder ao Dashboard
                </a>
              </div>
            </div>
          </section>

          {/* FUNCIONALIDADES */}
          <section
            id="funcionalidades"
            className="border-b border-slate-800/60 bg-slate-950/80 py-12"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">
                  Funcionalidades
                </p>
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                  Tudo o que precisa para gerir pessoas e finanças num só lugar.
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  Desenhado para equipas de RH, Finanças e Direção que querem
                  fugir do caos de planilhas, integrações manuais e relatórios
                  atrasados.
                </p>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                <div className="space-y-5 text-xs text-slate-300">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-sky-500/70 bg-sky-500/10 text-[0.65rem] text-sky-100">
                      HR
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        Analytics completo de capital humano
                      </h3>
                      <p className="mt-1 leading-relaxed">
                        Dashboards de headcount, senioridade, diversidade,
                        absenteísmo e custo por FTE, com filtros por unidade de
                        negócio, projeto e centro de custo.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/70 bg-emerald-500/10 text-[0.65rem] text-emerald-100">
                      💸
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        Folha, despesas e receitas em linha única
                      </h3>
                      <p className="mt-1 leading-relaxed">
                        Consolidação automática de folha de pagamento, despesas
                        operacionais, CAPEX e receitas, ligada ao plano de
                        contas e centros de custo da sua contabilidade.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-500/80 bg-fuchsia-500/10 text-[0.65rem] text-fuchsia-100">
                      IA
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        IA para previsão e detecção de riscos
                      </h3>
                      <p className="mt-1 leading-relaxed">
                        Modelos preditivos de rotatividade, margem de caixa e
                        probabilidade de estouro de orçamento, com explicações
                        claras dos fatores que influenciam cada previsão.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-slate-500/80 bg-slate-800/80 text-[0.65rem] text-slate-100">
                      API
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        Conectado ao seu ecossistema
                      </h3>
                      <p className="mt-1 leading-relaxed">
                        APIs e conectores para ERPs, CRMs, plataformas de folha
                        e bancos, garantindo dados sempre atualizados sem
                        trabalho manual.
                      </p>
                    </div>
                  </div>
                </div>

                <aside className="space-y-3 rounded-2xl border border-indigo-400/70 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.95)]">
                  <h3 className="text-sm font-semibold text-slate-50">
                    Segurança e governança de nível enterprise
                  </h3>
                  <p className="text-xs leading-relaxed text-indigo-100/90">
                    Controlo granular de acessos, logs de auditoria, segregação
                    de ambientes e encriptação ponta-a-ponta mantêm dados
                    sensíveis de pessoas e finanças protegidos. Perfis de acesso
                    para RH, CFO, diretoria e gestores garantem que cada pessoa
                    veja apenas o que deve ver.
                  </p>
                </aside>
              </div>
            </div>
          </section>

          {/* PREÇOS */}
          <section
            id="precos"
            className="border-b border-slate-800/60 bg-slate-950/80 py-12"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">
                  Planos &amp; preços
                </p>
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                  Um plano para cada fase da sua empresa.
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  Comece pequeno e escale à medida que a sua operação cresce.
                  Todos os planos incluem atualizações contínuas, segurança
                  avançada e suporte especializado.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <article className="relative rounded-2xl border border-slate-700/80 bg-slate-950/80 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.95)]">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    PMEs e equipas em arranque
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-50">
                    Starter
                  </h3>
                  <p className="mt-2 text-xl font-semibold text-slate-50">
                    R$ 990
                  </p>
                  <p className="text-xs text-slate-400">por mês</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    Ideal para empresas que querem sair das planilhas e
                    consolidar RH + Finanças num único cockpit.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Até 150 colaboradores
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Dashboards de RH, folha e cashflow
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      1 conector financeiro (banco ou ERP)
                    </li>
                  </ul>
                  <button className="mt-4 inline-flex rounded-full border border-slate-600 bg-slate-900/80 px-4 py-1.5 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-100">
                    Falar com especialista
                  </button>
                </article>

                <article className="relative rounded-2xl border border-sky-400/80 bg-slate-950/90 p-5 shadow-[0_26px_70px_rgba(8,47,73,0.95)]">
                  <span className="absolute right-4 top-4 rounded-full border border-sky-400/80 bg-sky-500/20 px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sky-100">
                    Mais escolhido
                  </span>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                    Empresas em crescimento
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-50">
                    Growth
                  </h3>
                  <p className="mt-2 text-xl font-semibold text-slate-50">
                    R$ 3.900
                  </p>
                  <p className="text-xs text-slate-400">por mês</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    Para organizações que precisam integrar múltiplas unidades
                    de negócio, cenários de IA e reporting executivo.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Até 1.000 colaboradores
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Cenários de IA para headcount e cashflow
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Conectores ilimitados (RH, ERP, bancos)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Suporte prioritário e onboarding assistido
                    </li>
                  </ul>
                  <button className="mt-4 inline-flex rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-[0_18px_45px_rgba(8,47,73,0.9)]">
                    Aceder ao Dashboard de demonstração
                  </button>
                </article>

                <article className="relative rounded-2xl border border-slate-700/80 bg-slate-950/80 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.95)]">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Grandes grupos e corporates
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-50">
                    Enterprise
                  </h3>
                  <p className="mt-2 text-lg font-semibold text-slate-50">
                    Sob consulta
                  </p>
                  <p className="text-xs text-slate-400">modelo customizado</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    Arquitetura dedicada, requisitos regulatórios específicos e
                    integrações sob medida para grupos com alta complexidade.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Ambiente dedicado e SLAs reforçados
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Integração com múltiplos ERPs e HCMs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-emerald-400/80 bg-emerald-500/20" />
                      Equipa de sucesso do cliente dedicada
                    </li>
                  </ul>
                  <button className="mt-4 inline-flex rounded-full border border-slate-600 bg-slate-900/80 px-4 py-1.5 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-100">
                    Agendar conversa com o time
                  </button>
                </article>
              </div>
            </div>
          </section>

          {/* CONTACTOS */}
          <section id="contactos" className="bg-slate-950/85 py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">
                  Contactos
                </p>
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                  Pronto para ligar pessoas, folha e finanças num só cockpit?
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  Fale com o nosso time para ver o Horizon 360° em ação num
                  ambiente próximo à realidade da sua empresa.
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
                <article className="rounded-2xl border border-slate-700/80 bg-slate-950/80 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.95)]">
                  <p className="text-xs leading-relaxed text-slate-300">
                    Partilhe alguns dados básicos (número de colaboradores,
                    sistemas atuais de folha e ERP, localização) e preparamos
                    uma demonstração guiada com os casos de uso mais relevantes
                    para o seu contexto.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-100">
                    <span className="rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1">
                      📧 comercial@horizon360.ai
                    </span>
                    <span className="rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1">
                      📞 +55 (11) 0000-0000
                    </span>
                    <span className="rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1">
                      ⚙️ Integração com o seu ERP
                    </span>
                  </div>
                  <p className="mt-4 text-[0.7rem] text-slate-500">
                    Não enviamos spam. Usamos os seus dados apenas para falar
                    sobre a adoção do Horizon 360° e temas relacionados.
                  </p>
                </article>

                <aside className="rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.95)]">
                  <h3 className="text-sm font-semibold text-slate-50">
                    Comece com um piloto em 4 semanas.
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Se já dispõe de dados de RH, folha e finanças, conseguimos
                    montar um piloto com dashboards reais em poucas semanas, sem
                    paralisações na operação.
                  </p>
                  <button className="mt-4 inline-flex rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-[0_18px_45px_rgba(8,47,73,0.9)]">
                    Agendar demonstração guiada
                  </button>
                </aside>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-800/70 bg-slate-950/90 py-4 text-[0.7rem] text-slate-500">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 md:flex-row md:items-center md:px-6">
            <p>
              © 2025 Horizon 360° Intelligence System. Todos os direitos
              reservados.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#sobre" className="hover:text-slate-200">
                Sobre
              </a>
              <a href="#funcionalidades" className="hover:text-slate-200">
                Funcionalidades
              </a>
              <a href="#precos" className="hover:text-slate-200">
                Preços
              </a>
              <a href="#contactos" className="hover:text-slate-200">
                Contactos
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
