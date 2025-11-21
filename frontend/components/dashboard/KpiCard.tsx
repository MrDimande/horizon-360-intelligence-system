import type { ComponentType, SVGProps } from "react";

type Trend = {
  value: number;
};

type KpiCardProps = {
  title: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  trend?: Trend;
};

export function KpiCard({ title, value, icon: Icon, trend }: KpiCardProps) {
  const isPositive = trend && trend.value >= 0;
  const trendColor = isPositive ? "text-emerald-600" : "text-rose-600";
  const trendPrefix = isPositive ? "+" : "";

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {title}
          </div>
          <div className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
            {value}
          </div>
        </div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      {trend ? (
        <div className="mt-3 text-xs text-slate-500">
          <span className={`${trendColor} font-medium`}>
            {trendPrefix}
            {trend.value.toFixed(1)}%
          </span>{" "}
          vs. período anterior
        </div>
      ) : null}
    </article>
  );
}
