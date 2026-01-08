import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type Trend = {
  value: number;
};

export type KpiColor = "violet" | "pink" | "orange" | "cyan";

type KpiCardProps = {
  title: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  trend?: Trend;
  color?: KpiColor;
};

const colorStyles = {
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/10",
    iconBg: "bg-linear-to-br from-violet-600 to-indigo-600",
  },
  pink: {
    bg: "bg-sky-500/10", // Replaced Pink with Sky for brand consistency
    text: "text-sky-400",
    border: "border-sky-500/20",
    glow: "shadow-sky-500/10",
    iconBg: "bg-linear-to-br from-sky-500 to-blue-600",
  },
  orange: {
    bg: "bg-blue-500/10", // Replaced Orange with Blue
    text: "text-blue-400",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/10",
    iconBg: "bg-linear-to-br from-blue-600 to-indigo-600",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/10",
    iconBg: "bg-linear-to-br from-cyan-500 to-sky-600",
  },
};

export function KpiCard({ title, value, icon: Icon, trend, color = "violet" }: KpiCardProps) {
  const isPositive = trend && trend.value >= 0;
  const styles = colorStyles[color];

  return (
    <article className={`relative overflow-hidden rounded-3xl bg-[#151921] p-6 shadow-xl border border-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-700 hover:shadow-sky-900/20`}>
      {/* Glow effect */}
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${styles.bg} blur-[60px] opacity-40`} />

      <div className="relative flex items-start justify-between">
        <div>
           <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.iconBg} text-white shadow-lg shadow-black/20`}>
              <Icon className="h-6 w-6 drop-shadow-md" />
           </div>
           
           <div className="mt-8 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
              <span className="text-3xl font-bold text-white tracking-tight block drop-shadow-sm">{value}</span>
           </div>
        </div>

        {trend && (
           <div className={`flex flex-col items-end gap-1`}>
              {/* Mini Sparkline Visualization (Abstract) */}
              <div className="flex items-end gap-1 h-8 mb-2">
                 <div className={`w-1.5 rounded-full ${isPositive ? styles.bg : "bg-slate-800"} h-3`}></div>
                 <div className={`w-1.5 rounded-full ${isPositive ? styles.bg : "bg-slate-800"} h-5`}></div>
                 <div className={`w-1.5 rounded-full ${styles.iconBg} h-8`}></div>
              </div>

              <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${isPositive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                 {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                 {Math.abs(trend.value)}%
              </div>
           </div>
        )}
      </div>
    </article>
  );
}
