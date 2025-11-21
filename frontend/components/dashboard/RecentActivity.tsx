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
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Atividades recentes
          </h2>
          <p className="text-xs text-slate-500">
            Últimos lançamentos de RH e Finanças.
          </p>
        </div>
      </header>
      <ul className="divide-y divide-slate-100 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 py-2.5"
          >
            <div className="flex flex-1 flex-col">
              <span className="font-medium text-slate-900">{item.label}</span>
              <span className="text-xs text-slate-500">{item.timestamp}</span>
            </div>
            <div className="flex items-center gap-3">
              {item.amount ? (
                <span className="text-xs font-medium text-slate-900">
                  {item.amount}
                </span>
              ) : null}
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  item.type === "hcm"
                    ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
                    : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
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
