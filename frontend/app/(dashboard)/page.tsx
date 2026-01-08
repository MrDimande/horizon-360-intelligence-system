import { AlertTriangle, ArrowDownCircle, Banknote, Users } from "lucide-react";
import { AiInsightPanel } from "../../components/dashboard/AiInsightPanel";
import {
    CashFlowChart,
    type CashFlowPoint,
} from "../../components/dashboard/CashFlowChart";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { RecentActivity } from "../../components/dashboard/RecentActivity";
import { prisma } from "../../lib/prisma";

type DashboardKpis = {
  totalEmployees: number;
  monthlyIncome: number;
  monthlyExpense: number;
  retentionRisk: number;
};

type ActivityItem = {
  id: string;
  label: string;
  type: "hcm" | "finance";
  amount?: string;
  timestamp: string;
};

type DashboardData = {
  kpis: DashboardKpis;
  cashflow: CashFlowPoint[];
  activities: ActivityItem[];
};

const mockDashboardData: DashboardData = {
  kpis: {
    totalEmployees: 5,
    monthlyIncome: 100_000,
    monthlyExpense: 95_500,
    retentionRisk: 18.5,
  },
  cashflow: [
    { date: "01 Out", income: 55_000, expense: 62_000, net: -7_000 },
    { date: "05 Out", income: 30_000, expense: 35_000, net: -5_000 },
    { date: "09 Out", income: 65_000, expense: 48_000, net: 17_000 },
    { date: "12 Out", income: 82_000, expense: 56_000, net: 26_000 },
    { date: "18 Out", income: 100_000, expense: 95_500, net: 4_500 },
  ],
  activities: [
    {
      id: "1",
      label: "Folha salarial - Outubro",
      type: "hcm",
      amount: "R$ 55.500",
      timestamp: "01/10/2024",
    },
    {
      id: "2",
      label: "Receita MRR - Clientes Enterprise",
      type: "finance",
      amount: "R$ 55.000",
      timestamp: "03/10/2024",
    },
    {
      id: "3",
      label: "Aluguel escritório - Outubro",
      type: "finance",
      amount: "R$ 30.000",
      timestamp: "05/10/2024",
    },
    {
      id: "4",
      label: "Infraestrutura cloud - Outubro",
      type: "finance",
      amount: "R$ 12.000",
      timestamp: "08/10/2024",
    },
    {
      id: "5",
      label: "Bônus performance - Ana Souza",
      type: "hcm",
      amount: "R$ 2.500",
      timestamp: "15/09/2024",
    },
  ],
};

async function getDashboardData(): Promise<DashboardData> {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [employeeCount, incomeAgg, expenseAgg, recentRecords] =
      await Promise.all([
        prisma.employee.count({ where: { isActive: true } }),
        prisma.financialRecord.aggregate({
          _sum: { amount: true },
          where: { type: "INCOME", date: { gte: startOfMonth } },
        }),
        prisma.financialRecord.aggregate({
          _sum: { amount: true },
          where: { type: "EXPENSE", date: { gte: startOfMonth } },
        }),
        prisma.financialRecord.findMany({
          orderBy: { date: "desc" },
          take: 6,
          include: { employee: { select: { name: true } } },
        }),
      ]);

    const kpis: DashboardKpis = {
      totalEmployees: employeeCount,
      monthlyIncome: Number((incomeAgg as any)._sum.amount ?? 0),
      monthlyExpense: Number((expenseAgg as any)._sum.amount ?? 0),
      retentionRisk: mockDashboardData.kpis.retentionRisk,
    };

    const activities: ActivityItem[] = recentRecords.map((record) => {
      const isHcm = Boolean(record.employeeId);
      const amountNumber = Number((record as any).amount ?? 0);
      const formattedAmount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: record.currency ?? "BRL",
        maximumFractionDigits: 0,
      }).format(amountNumber);

      const baseLabel =
        record.description ||
        (isHcm
          ? `Lançamento folha - ${record.category}`
          : `${record.category} ${
              record.type === "INCOME" ? "receita" : "despesa"
            }`);

      const date = new Date(record.date);

      return {
        id: record.id,
        label: baseLabel,
        type: isHcm ? "hcm" : "finance",
        amount: formattedAmount,
        timestamp: date.toLocaleDateString("pt-BR"),
      };
    });

    return {
      kpis,
      cashflow: mockDashboardData.cashflow,
      activities,
    };
  } catch (error) {
    console.error(
      "[Dashboard] Falha ao carregar dados reais, usando mock:",
      error
    );
    return mockDashboardData;
  }
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export default async function DashboardPage() {
  const { kpis, cashflow, activities } = await getDashboardData();

  return (
    <section className="flex flex-col gap-6">
      <header className="space-y-1 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
          Horizon 360°
        </p>
        <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 drop-shadow-sm md:text-5xl">
          Visão Geral
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-400">
          Monitoramento em tempo real de pessoas, finanças e performance.
        </p>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Funcionários"
          value={kpis.totalEmployees.toString()}
          icon={Users}
          trend={{ value: 4.2 }}
          color="violet"
        />
        <KpiCard
          title="Receita Mensal"
          value={formatCurrency(kpis.monthlyIncome)}
          icon={Banknote}
          trend={{ value: 8.1 }}
          color="cyan" 
        />
        <KpiCard
          title="Despesa Mensal"
          value={formatCurrency(kpis.monthlyExpense)}
          icon={ArrowDownCircle}
          trend={{ value: -3.4 }}
          color="orange" // Will render as Blue per new KpiCard styles
        />
        <KpiCard
          title="Risco de Saída"
          value={`${kpis.retentionRisk.toFixed(1)}%`}
          icon={AlertTriangle}
          trend={{ value: -1.2 }}
          color="pink" // Will render as Sky per new KpiCard styles
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-6">
           <CashFlowChart data={cashflow} />

           {/* AI Insights Section */}
           <div className="rounded-3xl border border-dashed border-slate-700/50 p-1">
             <div className="rounded-[20px] bg-slate-900/50 p-6">
                <AiInsightPanel />
             </div>
           </div>
        </div>

        {/* Side Panel / Activity */}
        <div className="space-y-6">
           <RecentActivity items={activities} />
        </div>
      </div>
    </section>
  );
}

