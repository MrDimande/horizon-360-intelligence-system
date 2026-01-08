type ActivityItem = {
  id: string;
  label: string;
  type: "hcm" | "finance";
  amount?: string;
  timestamp: string;
};

type RecentActivityProps = {
  items: ActivityItem[];
};

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <section className="flex flex-col rounded-3xl bg-[#151921] p-6 shadow-xl">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Atividades recentes
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Últimos lançamentos de RH e Finanças.
          </p>
        </div>
      </header>
      <ul className="divide-y divide-slate-800 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 py-3"
          >
            <div className="flex flex-1 flex-col">
              <span className="font-medium text-slate-200">{item.label}</span>
              <span className="text-xs text-slate-500">{item.timestamp}</span>
            </div>
            <div className="flex items-center gap-3">
              {item.amount ? (
                <span className="text-sm font-semibold text-white">
                  {item.amount}
                </span>
              ) : null}
              <span
                className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  item.type === "hcm"
                    ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                }`}
              >
                {item.type === "hcm" ? "HCM" : "Finance"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
