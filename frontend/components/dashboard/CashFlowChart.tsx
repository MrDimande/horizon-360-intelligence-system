"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

export type CashFlowPoint = {
  date: string;
  income: number;
  expense: number;
  net: number;
};

type CashFlowChartProps = {
  data?: CashFlowPoint[];
};

const defaultData: CashFlowPoint[] = [
  { date: "01 Out", income: 55000, expense: 62000, net: -7000 },
  { date: "05 Out", income: 30000, expense: 35000, net: -5000 },
  { date: "09 Out", income: 65000, expense: 48000, net: 17000 },
  { date: "12 Out", income: 82000, expense: 56000, net: 26000 },
  { date: "18 Out", income: 100000, expense: 95500, net: 4500 },
];

export function CashFlowChart({ data }: CashFlowChartProps) {
  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <section className="flex h-full flex-col rounded-3xl bg-[#151921] p-6 shadow-xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Fluxo de caixa
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Entradas e saídas agregadas no período recente.
          </p>
        </div>
        
        <div className="flex gap-4">
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-linear-to-r from-violet-500 to-indigo-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"></div>
                <span className="text-xs font-medium text-slate-400">Entrada</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-linear-to-r from-sky-400 to-blue-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
                <span className="text-xs font-medium text-slate-400">Saída</span>
             </div>
        </div>
      </header>
      <div className="mt-1 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => `${Math.round(value / 1000)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: 12,
                border: "1px solid #1e293b",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                padding: "12px",
              }}
              labelStyle={{ fontSize: 12, color: "#94a3b8", marginBottom: "8px" }}
              itemStyle={{ fontSize: 12, fontWeight: 500 }}
              formatter={(value: unknown, name: string) => {
                const label =
                  name === "income"
                    ? "Entrada"
                    : name === "expense"
                    ? "Saída"
                    : "Líquido";
                const numeric =
                  typeof value === "number" ? value : Number(value ?? 0);
                const formatted = new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                }).format(numeric);
                return [formatted, label];
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#8b5cf6"
              fill="url(#incomeGradient)"
              strokeWidth={3}
              name="income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#0ea5e9"
              fill="url(#expenseGradient)"
              strokeWidth={3}
              name="expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
