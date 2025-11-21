"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
  description?: string;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    description: "Visão integrada de HCM e Finanças",
  },
  {
    label: "HCM",
    href: "/hcm",
    description: "Pessoas, clima e performance",
  },
  {
    label: "Finanças",
    href: "/finance",
    description: "Fluxos de caixa, custos e receitas",
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();
  const [openMobile, setOpenMobile] = useState(false);

  const content = (
    <div className="flex h-full flex-col gap-6 px-4 py-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
          Horizon 360°
        </div>
        <div className="mt-1 text-sm text-slate-400">Intelligence System</div>
      </div>
      <nav className="space-y-1 text-sm">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex flex-col rounded-xl border px-3 py-2 transition-colors ${
                active
                  ? "border-sky-500/70 bg-slate-900 text-slate-50"
                  : "border-slate-800/80 bg-slate-950/40 text-slate-400 hover:border-slate-600 hover:bg-slate-900 hover:text-slate-50"
              }`}
              onClick={() => setOpenMobile(false)}
            >
              <span className="font-medium tracking-tight">{item.label}</span>
              {item.description ? (
                <span className="text-xs text-slate-500 group-hover:text-slate-400">
                  {item.description}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-1 text-xs text-slate-500">
        <p>
          IA preparada para conectar dados de pessoas, folha e fluxo de caixa.
        </p>
        <p className="text-slate-600">
          Em breve: insights em tempo real alimentados por modelos generativos.
        </p>
      </div>
    </div>
  );

  return (
    <aside className="relative flex-shrink-0 border-r border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 md:hidden">
        <span className="text-sm font-semibold tracking-tight text-slate-50">
          Horizon 360°
        </span>
        <button
          type="button"
          onClick={() => setOpenMobile((prev) => !prev)}
          className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 hover:border-slate-500"
        >
          Menu
        </button>
      </div>
      <div className="hidden h-screen w-64 md:block">{content}</div>
      {openMobile ? (
        <div className="absolute inset-x-0 top-12 z-40 block h-[calc(100vh-3rem)] w-64 border-r border-slate-800 bg-slate-950 md:hidden">
          {content}
        </div>
      ) : null}
    </aside>
  );
}
