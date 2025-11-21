import type { ReactNode } from "react";

type Variant = "neutral" | "positive" | "warning";

type SummaryCardProps = {
  title: string;
  value: string;
  caption?: string;
  badge?: string;
  trend?: string;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  neutral: "from-slate-900 to-slate-950 border-slate-800",
  positive: "from-emerald-900/40 to-slate-950 border-emerald-500/40",
  warning: "from-amber-900/40 to-slate-950 border-amber-500/40",
};

export default function SummaryCard(props: SummaryCardProps) {
  const {
    title,
    value,
    caption,
    badge,
    trend,
    variant = "neutral",
    className,
    children,
  } = props;

  const baseClasses =
    "flex flex-col justify-between rounded-2xl border bg-gradient-to-br p-4 sm:p-5";
  const variantClass = variantClasses[variant];
  const outerClassName = className
    ? `${baseClasses} ${variantClass} ${className}`
    : `${baseClasses} ${variantClass}`;

  return (
    <article className={outerClassName}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            {title}
          </div>
          {caption ? (
            <p className="mt-1 text-xs text-slate-500">{caption}</p>
          ) : null}
        </div>
        {badge ? (
          <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium text-slate-200 ring-1 ring-slate-600/60">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-slate-50">
            {value}
          </div>
          {trend ? (
            <div className="mt-1 text-xs text-emerald-400">{trend}</div>
          ) : null}
        </div>
        {children ? (
          <div className="text-right text-xs text-slate-400">{children}</div>
        ) : null}
      </div>
    </article>
  );
}
