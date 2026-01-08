import { ForecastChart } from "../../../components/finance/ForecastChart";
import { InsightCard } from "../../../components/finance/InsightCard";
import { prisma } from "../../../lib/prisma";

async function getFinanceSummary() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      currentMonthIncome,
      currentMonthExpense,
      lastMonthIncome,
      lastMonthExpense,
      recentRecords,
    ] = await Promise.all([
      prisma.financialRecord.aggregate({
        _sum: { amount: true },
        where: { type: "INCOME", date: { gte: startOfMonth } },
      }),
      prisma.financialRecord.aggregate({
        _sum: { amount: true },
        where: { type: "EXPENSE", date: { gte: startOfMonth } },
      }),
      prisma.financialRecord.aggregate({
        _sum: { amount: true },
        where: {
          type: "INCOME",
          date: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.financialRecord.aggregate({
        _sum: { amount: true },
        where: {
          type: "EXPENSE",
          date: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.financialRecord.findMany({
        orderBy: { date: "desc" },
        take: 5,
        select: {
          id: true,
          type: true,
          category: true,
          amount: true,
          date: true,
          description: true,
        },
      }),
    ]);

    const income = Number(currentMonthIncome._sum?.amount ?? 0);
    const expense = Number(currentMonthExpense._sum?.amount ?? 0);
    const lastIncome = Number(lastMonthIncome._sum?.amount ?? 0);
    const lastExpense = Number(lastMonthExpense._sum?.amount ?? 0);

    const incomeTrend =
      lastIncome > 0 ? ((income - lastIncome) / lastIncome) * 100 : 0;
    const expenseTrend =
      lastExpense > 0 ? ((expense - lastExpense) / lastExpense) * 100 : 0;

    return {
      income,
      expense,
      net: income - expense,
      incomeTrend,
      expenseTrend,
      netTrend:
        lastIncome - lastExpense !== 0
          ? ((income - expense - (lastIncome - lastExpense)) /
              Math.abs(lastIncome - lastExpense)) *
            100
          : 0,
      recentRecords,
    };
  } catch (error) {
    console.error("Failed to fetch finance summary:", error);
    return {
      income: 0,
      expense: 0,
      net: 0,
      incomeTrend: 0,
      expenseTrend: 0,
      netTrend: 0,
      recentRecords: [],
    };
  }
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export default async function FinancePage() {
  const summary = await getFinanceSummary();

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-500">
          Gestão Financeira
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Finanças e Cashflow
        </h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Monitore fluxo de caixa, custos e receitas com apoio de previsões de
          IA.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InsightCard
          title="Receita Mensal"
          value={formatCurrency(summary.income)}
          trend={{ value: summary.incomeTrend, label: "vs. mês anterior" }}
          variant={summary.incomeTrend >= 0 ? "positive" : "negative"}
        />
        <InsightCard
          title="Despesa Mensal"
          value={formatCurrency(summary.expense)}
          trend={{ value: summary.expenseTrend, label: "vs. mês anterior" }}
          variant={summary.expenseTrend <= 0 ? "positive" : "negative"}
        />
        <InsightCard
          title="Resultado Líquido"
          value={formatCurrency(summary.net)}
          trend={{ value: summary.netTrend, label: "vs. mês anterior" }}
          variant={summary.net >= 0 ? "positive" : "negative"}
        />
      </div>

      {/* Forecast Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <ForecastChart />
      </div>

      {/* Recent Transactions */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-100">
          Transações Recentes
        </h3>
        {summary.recentRecords.length > 0 ? (
          <div className="space-y-2">
            {summary.recentRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      record.type === "INCOME" ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {record.description || record.category}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(record.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    record.type === "INCOME"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {record.type === "INCOME" ? "+" : "-"}
                  {formatCurrency(Number(record.amount))}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Nenhuma transação recente encontrada.
          </p>
        )}
      </div>
    </section>
  );
}
