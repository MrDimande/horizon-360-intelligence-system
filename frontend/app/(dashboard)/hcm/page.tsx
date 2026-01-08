import { Briefcase, FileText, Star, Users } from "lucide-react";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";

async function getHcmSummary() {
  try {
    const [employeeCount, departmentStats] = await Promise.all([
      prisma.employee.count({ where: { isActive: true } }),
      prisma.employee.groupBy({
        by: ["department"],
        _count: { id: true },
        where: { isActive: true },
      }),
    ]);

    return {
      totalEmployees: employeeCount,
      departments: departmentStats.map((d) => ({
        name: d.department,
        count: d._count.id,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch HCM summary:", error);
    return {
      totalEmployees: 0,
      departments: [],
    };
  }
}

export default async function HcmPage() {
  const summary = await getHcmSummary();

  const modules = [
    {
      title: "Avaliações de Desempenho",
      description: "Gerir avaliações, feedback e metas de performance",
      href: "/hcm/evaluations",
      icon: Star,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Folha Salarial",
      description: "Gerar e gerir folhas de pagamento mensais",
      href: "/hcm/payroll",
      icon: Briefcase,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Funcionários",
      description: "Consultar e gerir dados de colaboradores",
      href: "/hcm/employees",
      icon: Users,
      color: "from-sky-500 to-indigo-600",
    },
    {
      title: "Relatórios",
      description: "Relatórios de RH e análises de pessoas",
      href: "/hcm/reports",
      icon: FileText,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-500">
          Gestão de Capital Humano
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          HCM e Performance
        </h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Acompanhe headcount, engajamento e métricas de performance em tempo
          real.
        </p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-sky-500 to-indigo-600">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-100">
                {summary.totalEmployees}
              </p>
              <p className="text-xs text-slate-500">Funcionários Ativos</p>
            </div>
          </div>
        </div>

        {summary.departments.slice(0, 3).map((dept) => (
          <div
            key={dept.name}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <div>
              <p className="text-xl font-semibold text-slate-100">
                {dept.count}
              </p>
              <p className="text-xs text-slate-500">{dept.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link
              key={module.href}
              href={module.href}
              className="group flex gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-slate-700 hover:bg-slate-900"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${module.color}`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100 group-hover:text-sky-400">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-400">{module.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
