"use client";

import { AlertTriangle, Lightbulb, Loader2, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type ForecastDataPoint = {
  period: string;
  income: number;
  expense: number;
  net: number;
  isProjected: boolean;
};

type ForecastInsight = {
  type: "trend" | "warning" | "opportunity";
  title: string;
  description: string;
};

type ForecastData = {
  historical: ForecastDataPoint[];
  projections: ForecastDataPoint[];
  insights: ForecastInsight[];
  summary: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const InsightIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "trend":
      return <TrendingUp className="h-4 w-4 text-sky-400" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-amber-400" />;
    case "opportunity":
      return <Lightbulb className="h-4 w-4 text-emerald-400" />;
    default:
      return <TrendingUp className="h-4 w-4 text-slate-400" />;
  }
};

export function ForecastChart() {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateForecast = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ months: 3 }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Falha ao gerar previsão");
      }

      const forecastData = await response.json();
      setData(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const chartData = data
    ? [...data.historical, ...data.projections]
    : [];

  const lastHistoricalPeriod = data?.historical[data.historical.length - 1]?.period;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">
            Previsão Financeira com IA
          </h3>
          <p className="text-sm text-slate-400">
            Projeções baseadas em análise de tendências históricas
          </p>
        </div>
        <button
          onClick={generateForecast}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4" />
              Gerar Previsão
            </>
          )}
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Chart */}
      {data && chartData.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="period"
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f1f5f9" }}
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === "income"
                    ? "Receita"
                    : name === "expense"
                      ? "Despesa"
                      : "Líquido",
                ]}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) =>
                  value === "income"
                    ? "Receita"
                    : value === "expense"
                      ? "Despesa"
                      : "Líquido"
                }
              />
              {lastHistoricalPeriod && (
                <ReferenceLine
                  x={lastHistoricalPeriod}
                  stroke="#64748b"
                  strokeDasharray="5 5"
                  label={{
                    value: "Projeção →",
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />
              )}
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={payload.isProjected ? "transparent" : "#22c55e"}
                      stroke="#22c55e"
                      strokeWidth={2}
                      strokeDasharray={payload.isProjected ? "3 3" : "0"}
                    />
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={payload.isProjected ? "transparent" : "#ef4444"}
                      stroke="#ef4444"
                      strokeWidth={2}
                      strokeDasharray={payload.isProjected ? "3 3" : "0"}
                    />
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#0ea5e9"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={payload.isProjected ? "transparent" : "#0ea5e9"}
                      stroke="#0ea5e9"
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Summary */}
      {data?.summary && (
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm text-slate-300">{data.summary}</p>
        </div>
      )}

      {/* Insights */}
      {data?.insights && data.insights.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.insights.map((insight, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3"
            >
              <div className="mt-0.5">
                <InsightIcon type={insight.type} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-200">
                  {insight.title}
                </h4>
                <p className="text-xs text-slate-400">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!data && !loading && !error && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 py-12 text-center">
          <TrendingUp className="mb-3 h-10 w-10 text-slate-600" />
          <p className="text-sm text-slate-400">
            Clique em &quot;Gerar Previsão&quot; para criar uma análise
            preditiva com IA
          </p>
        </div>
      )}
    </div>
  );
}
