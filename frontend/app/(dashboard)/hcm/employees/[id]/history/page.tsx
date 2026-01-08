import { History } from "lucide-react";
import { EmployeeHistory } from "../../../../../../components/hcm/EmployeeHistory";
import { prisma } from "../../../../../../lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

async function getEmployeeHistory(employeeId: string) {
  try {
    const logs = await prisma.auditLog.findMany({
      where: {
        entityType: "EMPLOYEE",
        entityId: employeeId,
      },
      orderBy: { createdAt: "desc" },
    });
    return logs;
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return [];
  }
}

export default async function EmployeeHistoryPage({ params }: Props) {
  const logs = await getEmployeeHistory(params.id);

  // Cast logs to match component props (Json type vs specific shape)
  const formattedLogs = logs.map((log) => ({
    ...log,
    createdAt: log.createdAt.toISOString(),
    // @ts-ignore - Prisma Json type needs explicit casting
    changes: log.changes as any,
    action: log.action as "CREATE" | "UPDATE" | "DELETE",
  }));

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3 border-b border-slate-800 pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
          <History className="h-5 w-5 text-slate-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-100">
            Histórico de Alterações
          </h1>
          <p className="text-sm text-slate-400">
            Registo de auditoria e modificações do funcionário
          </p>
        </div>
      </header>

      <EmployeeHistory logs={formattedLogs} />
    </div>
  );
}
