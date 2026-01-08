import { Briefcase, Calendar, Check, Clock, CreditCard, Plus, User } from "lucide-react";
import Link from "next/link";
import { ExportButton } from "../../../../components/reports/ExportButton";
import { prisma } from "../../../../lib/prisma";

async function getPayrolls() {
  try {
    const payrolls = await prisma.payroll.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        employee: {
          select: { name: true, department: true, position: true },
        },
        items: true,
      },
    });
    return payrolls;
  } catch (error) {
    console.error("Failed to fetch payrolls:", error);
    return [];
  }
}

async function getPayrollSummary() {
  try {
    const currentPeriod = new Date().toISOString().slice(0, 7); // YYYY-MM
    
    const [totalPayrolls, periodPayrolls] = await Promise.all([
      prisma.payroll.count(),
      prisma.payroll.aggregate({
        _sum: { netSalary: true },
        where: { period: currentPeriod },
      }),
    ]);

    return {
      total: totalPayrolls,
      currentPeriodTotal: Number(periodPayrolls._sum?.netSalary ?? 0),
    };
  } catch (error) {
    console.error("Failed to fetch payroll summary:", error);
    return { total: 0, currentPeriodTotal: 0 };
  }
}

const statusColors = {
  DRAFT: "bg-slate-600 text-slate-200",
  PROCESSED: "bg-amber-600 text-amber-100",
  PAID: "bg-emerald-600 text-emerald-100",
};

const statusLabels = {
  DRAFT: "Rascunho",
  PROCESSED: "Processada",
  PAID: "Paga",
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "PAID":
      return <Check className="h-4 w-4" />;
    case "PROCESSED":
      return <Clock className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));

export default async function PayrollPage() {
  const [payrolls, summary] = await Promise.all([
    getPayrolls(),
    getPayrollSummary(),
  ]);

  const currentPeriod = new Date().toISOString().slice(0, 7);

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-500">
            HCM / Folha Salarial
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
            Folha Salarial
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Gerar e gerir folhas de pagamento com cálculo automático de impostos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton
            endpoint="/api/reports/payroll"
            filename="folha_salarial.csv"
            label="Exportar CSV"
            variant="default"
          />
          <Link
            href={`/hcm/payroll/generate?period=${currentPeriod}`}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            <Plus className="h-4 w-4" />
            Gerar Folha
          </Link>
        </div>
      </header>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-500">Total de Folhas</p>
          <p className="mt-1 text-2xl font-semibold text-slate-100">
            {summary.total}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-500">Período Atual ({currentPeriod})</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-400">
            {formatCurrency(summary.currentPeriodTotal)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-500">Impostos Incluídos</p>
          <p className="mt-1 text-sm text-slate-300">
            IRT (Imposto Rendimento) + INSS (3%)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select
          aria-label="Filtrar por período"
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none focus:border-sky-500"
        >
          <option value="">Todos os Períodos</option>
          <option value="2024-12">Dezembro 2024</option>
          <option value="2024-11">Novembro 2024</option>
          <option value="2024-10">Outubro 2024</option>
        </select>
        <select
          aria-label="Filtrar por status"
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none focus:border-sky-500"
        >
          <option value="">Todos os Status</option>
          <option value="DRAFT">Rascunho</option>
          <option value="PROCESSED">Processada</option>
          <option value="PAID">Paga</option>
        </select>
      </div>

      {/* Payrolls List */}
      {payrolls.length > 0 ? (
        <div className="space-y-3">
          {payrolls.map((payroll) => (
            <div
              key={payroll.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-700"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-100">
                    {payroll.employee?.name || "Funcionário"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {payroll.employee?.position} • {payroll.employee?.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-100">
                    {formatCurrency(Number(payroll.netSalary))}
                  </p>
                  <p className="text-xs text-slate-500">
                    Bruto: {formatCurrency(Number(payroll.grossSalary))}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="h-4 w-4" />
                  {payroll.period}
                </div>

                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusColors[payroll.status as keyof typeof statusColors]
                  }`}
                >
                  <StatusIcon status={payroll.status} />
                  {statusLabels[payroll.status as keyof typeof statusLabels]}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 py-16 text-center">
          <Briefcase className="mb-4 h-12 w-12 text-slate-600" />
          <h3 className="text-lg font-medium text-slate-300">
            Sem folhas de pagamento
          </h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Gere folhas de pagamento automáticas com cálculo de impostos.
          </p>
          <Link
            href={`/hcm/payroll/generate?period=${currentPeriod}`}
            className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            <Plus className="h-4 w-4" />
            Gerar Folha
          </Link>
        </div>
      )}
    </section>
  );
}
