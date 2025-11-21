"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
    <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Fluxo de caixa
          </h2>
          <p className="text-xs text-slate-500">
            Entradas e sadas agregadas no perido recente.
          </p>
        </div>
      </header>
      <div className="mt-1 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              stroke="#9ca3af"
            />
            <YAxis
              tickLine={false}
              tickMargin={8}
              stroke="#9ca3af"
              tickFormatter={(value) => `${Math.round(value / 1000)}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                borderColor: "#e5e7eb",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
              }}
              labelStyle={{ fontSize: 12, color: "#6b7280" }}
              formatter={(value: unknown, name: string) => {
                const label =
                  name === "income"
                    ? "Entrada"
                    : name === "expense"
                    ? "Sada"
                    : "Lduino";
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
              stroke="#22c55e"
              fill="#22c55e20"
              strokeWidth={2}
              name="income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#f97316"
              fill="#f9731620"
              strokeWidth={2}
              name="expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
