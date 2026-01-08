"use client";

import {
    BarChart3,
    DollarSign,
    Lightbulb,
    Loader2,
    Minus,
    RefreshCw,
    TrendingDown,
    TrendingUp,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";

type Insight = {
  id: string;
  category: "headcount" | "financial" | "performance" | "recommendation";
  title: string;
  description: string;
  trend?: "up" | "down" | "stable";
  value?: string;
  priority: "high" | "medium" | "low";
};

type InsightsData = {
  insights: Insight[];
  generatedAt: string;
  dataSnapshot: {
    employees: number;
    netBalance: number;
    profitMargin: number;
  };
};

const categoryIcons = {
  headcount: Users,
  financial: DollarSign,
  performance: BarChart3,
  recommendation: Lightbulb,
};

const categoryColors = {
  headcount: "from-sky-500 to-blue-600",
  financial: "from-emerald-500 to-teal-600",
  performance: "from-purple-500 to-indigo-600",
  recommendation: "from-amber-500 to-orange-600",
};

const priorityStyles = {
  high: "border-red-500/50 bg-red-950/20",
  medium: "border-amber-500/50 bg-amber-950/20",
  low: "border-slate-700 bg-slate-900/60",
};

const TrendIcon = ({ trend }: { trend?: string }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-400" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-400" />;
  return <Minus className="h-4 w-4 text-slate-400" />;
};

export function AiInsightPanel() {
  const [data, setData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/insights");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Erro ao carregar insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Insights de IA</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-800" />
                  <div className="h-3 w-full rounded bg-slate-800" />
                  <div className="h-3 w-1/2 rounded bg-slate-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-800/50 bg-red-950/30 p-4 text-center">
        <p className="text-sm text-red-400">{error}</p>
        <button
          onClick={fetchInsights}
          className="mt-2 text-sm text-red-300 underline hover:text-red-200"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Insights de IA</h2>
          {data?.generatedAt && (
            <p className="text-xs text-slate-500">
              Atualizado: {new Date(data.generatedAt).toLocaleTimeString("pt-BR")}
            </p>
          )}
        </div>
        <button
          onClick={fetchInsights}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data?.insights.map((insight) => {
          const Icon = categoryIcons[insight.category];
          const colorClass = categoryColors[insight.category];
          const priorityClass = priorityStyles[insight.priority];

          return (
            <div
              key={insight.id}
              className={`rounded-xl border p-4 transition-colors hover:border-slate-600 ${priorityClass}`}
            >
              <div className="flex gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${colorClass}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-slate-100">
                      {insight.title}
                    </h3>
                    {insight.trend && <TrendIcon trend={insight.trend} />}
                  </div>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    {insight.description}
                  </p>
                  {insight.value && (
                    <p className="mt-2 text-lg font-semibold text-slate-100">
                      {insight.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
