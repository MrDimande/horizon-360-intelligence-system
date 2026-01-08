import { Building2, ChevronRight, Plus, Users } from "lucide-react";
import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

async function getDepartments() {
  try {
    const departments = await prisma.department.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      include: {
        children: {
          where: { isActive: true },
          select: { id: true, name: true, code: true },
        },
        parent: {
          select: { id: true, name: true },
        },
      },
    });
    return departments;
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return [];
  }
}

type DepartmentStats = {
  totalDepartments: number;
  employeesByDept: Record<string, number>;
};

async function getDepartmentStats(): Promise<DepartmentStats> {
  try {
    const [totalDepartments, employeeCounts] = await Promise.all([
      prisma.department.count({ where: { isActive: true } }),
      prisma.employee.groupBy({
        by: ["department"],
        _count: { id: true },
        where: { isActive: true },
      }),
    ]);

    const employeesByDept = Object.fromEntries(
      employeeCounts.map((e) => [e.department, e._count.id])
    ) as Record<string, number>;

    return { totalDepartments, employeesByDept };
  } catch (error) {
    console.error("Failed to fetch department stats:", error);
    return { totalDepartments: 0, employeesByDept: {} };
  }
}

const formatCurrency = (value: number | null) =>
  value
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "MZN",
        maximumFractionDigits: 0,
      }).format(value)
    : "N/A";

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  const stats = await getDepartmentStats();

  const totalEmployees = Object.values(stats.employeesByDept).reduce(
    (a: number, b: number) => a + b,
    0
  );

  const largestDeptEntry = Object.entries(stats.employeesByDept).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0];

  const largestDeptName = largestDeptEntry ? largestDeptEntry[0] : "N/A";

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-500">
            HCM / Departamentos
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
            Gestão de Departamentos
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Estrutura organizacional com hierarquia, orçamentos e gestores.
          </p>
        </div>
        <Link
          href="/hcm/departments/new"
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500"
        >
          <Plus className="h-4 w-4" />
          Novo Departamento
        </Link>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-indigo-600">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-100">
                {stats.totalDepartments}
              </p>
              <p className="text-xs text-slate-500">Departamentos Ativos</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-500">Total de Funcionários</p>
          <p className="mt-1 text-2xl font-semibold text-slate-100">
            {totalEmployees}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-500">Departamento más grande</p>
          <p className="mt-1 text-lg font-medium text-slate-200">
            {largestDeptName}
          </p>
        </div>
      </div>

      {/* Departments List */}
      {departments.length > 0 ? (
        <div className="space-y-3">
          {departments
            .filter((d) => !d.parentId) // Show root departments
            .map((dept) => (
              <div
                key={dept.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                      <Building2 className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-100">
                          {dept.name}
                        </p>
                        <span className="rounded bg-slate-700 px-1.5 py-0.5 text-xs text-slate-300">
                          {dept.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {dept.description || "Sem descrição"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Users className="h-4 w-4" />
                      {stats.employeesByDept[dept.name] || 0} funcionários
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-300">
                        {formatCurrency(Number(dept.budget))}
                      </p>
                      <p className="text-xs text-slate-500">Orçamento</p>
                    </div>
                    <Link
                      href={`/hcm/departments/${dept.id}`}
                      className="flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300"
                    >
                      Ver detalhes
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Child departments */}
                {dept.children && dept.children.length > 0 && (
                  <div className="border-t border-slate-800 bg-slate-900/40 px-4 py-2">
                    <p className="mb-2 text-xs text-slate-500">
                      Sub-departamentos:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dept.children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/hcm/departments/${child.id}`}
                          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300 transition-colors hover:border-slate-600"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 py-16 text-center">
          <Building2 className="mb-4 h-12 w-12 text-slate-600" />
          <h3 className="text-lg font-medium text-slate-300">
            Sem departamentos registados
          </h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Crie a estrutura organizacional da sua empresa.
          </p>
          <Link
            href="/hcm/departments/new"
            className="mt-4 flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500"
          >
            <Plus className="h-4 w-4" />
            Criar Departamento
          </Link>
        </div>
      )}
    </section>
  );
}
