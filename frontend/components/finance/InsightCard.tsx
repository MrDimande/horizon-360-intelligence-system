import { Minus, TrendingDown, TrendingUp } from "lucide-react";

type InsightCardProps = {
  title: string;
  value: string;
  trend?: {
    value: number;
    label?: string;
  };
  description?: string;
  variant?: "default" | "positive" | "negative" | "warning";
};

export function InsightCard({
  title,
  value,
  trend,
  description,
  variant = "default",
}: InsightCardProps) {
  const variantStyles = {
    default: "border-slate-800 bg-slate-900/60",
    positive: "border-emerald-800/50 bg-emerald-950/30",
    negative: "border-red-800/50 bg-red-950/30",
    warning: "border-amber-800/50 bg-amber-950/30",
  };

  const trendColor =
    trend?.value === 0
      ? "text-slate-400"
      : trend && trend.value > 0
        ? "text-emerald-400"
        : "text-red-400";

  const TrendIcon =
    trend?.value === 0 ? Minus : trend && trend.value > 0 ? TrendingUp : TrendingDown;

  return (
    <div
      className={`rounded-xl border p-4 ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-100">{value}</p>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span className="text-sm font-medium">
              {trend.value > 0 ? "+" : ""}
              {trend.value.toFixed(1)}%
            </span>
          </div>
        )}
      </div>
      {description && (
        <p className="mt-2 text-xs text-slate-400">{description}</p>
      )}
      {trend?.label && (
        <p className="mt-1 text-xs text-slate-500">{trend.label}</p>
      )}
    </div>
  );
}
