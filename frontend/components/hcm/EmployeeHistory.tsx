"use client";

import { Calendar, FileEdit, History, Shield, Trash2, UserPlus } from "lucide-react";

type Change = {
  old: any;
  new: any;
};

type AuditLog = {
  id: string;
  createdAt: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  changes: Record<string, Change> | null;
  performedBy: string;
  description: string | null;
};

type EmployeeHistoryProps = {
  logs: AuditLog[];
};

const actionIcons = {
  CREATE: UserPlus,
  UPDATE: FileEdit,
  DELETE: Trash2,
};

const actionColors = {
  CREATE: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  UPDATE: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  DELETE: "bg-red-500/10 text-red-500 border-red-500/20",
};

const formatValue = (value: any) => {
  if (value === null || value === undefined) return "N/A";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  return String(value);
};

export function EmployeeHistory({ logs }: EmployeeHistoryProps) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-slate-900 p-4">
          <History className="h-8 w-8 text-slate-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-300">
          Sem histórico registado
        </h3>
        <p className="text-sm text-slate-500">
          Nenhuma alteração foi realizada neste funcionário ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-8 pl-4 before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-slate-800">
      {logs.map((log) => {
        const Icon = actionIcons[log.action] || Shield;
        const colorClass = actionColors[log.action] || "bg-slate-800 text-slate-400";

        return (
          <div key={log.id} className="relative">
            <div className={`absolute left-0 top-1 -translate-x-1/2 rounded-full border bg-slate-950 p-2 ${colorClass}`}>
              <Icon className="h-4 w-4" />
            </div>

            <div className="ml-8 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-200">
                    {log.description || `Ação: ${log.action}`}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {log.performedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(log.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>

              {log.changes && Object.keys(log.changes).length > 0 && (
                <div className="space-y-2 rounded-lg bg-slate-950/50 p-3 text-sm">
                  {Object.entries(log.changes).map(([field, change]) => (
                    <div key={field} className="grid grid-cols-[1fr,auto,1fr] gap-4">
                      <div className="text-right text-red-400/80 line-through">
                        {formatValue(change.old)}
                      </div>
                      <div className="text-xs font-medium text-slate-600">
                        {field}
                      </div>
                      <div className="text-emerald-400">
                        {formatValue(change.new)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
