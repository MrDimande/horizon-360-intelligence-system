"use client";

import {
    LayoutGrid,
    LogOut,
    Menu,
    Sparkles,
    Users,
    Wallet,
    X
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NotificationDropdown } from "../notifications/NotificationDropdown";

type NavItem = {
  label: string;
  href: string;
  icon: any;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid
  },
  {
    label: "HCM",
    href: "/hcm",
    icon: Users
  },
  {
    label: "Finanças",
    href: "/finance",
    icon: Wallet
  },
  {
    label: "Assistente IA",
    href: "/ai",
    icon: Sparkles
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
  const { data: session } = useSession();

  const content = (
    <div className="flex h-full flex-col px-4 py-6">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
          <Image 
            src="/logo.png" 
            alt="Horizon 360 Logo" 
            width={48} 
            height={48} 
            className="object-contain"
          />
        </div>
        <div>
          <div className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400 tracking-tight">
            Horizon
          </div>
          <div className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">
            360° Intelligence
          </div>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ${
                active
                  ? "bg-linear-to-r from-sky-600/20 to-violet-600/20 border border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
              }`}
              onClick={() => setOpenMobile(false)}
            >
              <Icon className={`h-5 w-5 transition-colors ${active ? "text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" : "text-slate-500 group-hover:text-white"}`} />
              <span className={`font-medium text-sm ${active ? "text-white" : ""}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800/50">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px]">
                 <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {session?.user?.name?.[0]?.toUpperCase() || "U"}
                    </span>
                 </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate max-w-[100px]">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate max-w-[100px]">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <NotificationDropdown />
         </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-2 rounded-xl bg-slate-900/50 px-4 py-2.5 text-xs font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair da conta</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#0B0E14] px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
                <Image 
                  src="/logo.png" 
                  alt="Horizon Logo" 
                  fill
                  className="object-contain"
                />
            </div>
            <span className="font-bold text-white">Horizon</span>
        </div>
        <button
          type="button"
          onClick={() => setOpenMobile((prev) => !prev)}
          className="text-slate-400 hover:text-white"
        >
          {openMobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden h-screen w-64 shrink-0 bg-[#0B0E14] md:block sticky top-0">
        {content}
      </aside>

      {/* Sidebar Mobile */}
      {openMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="relative w-64 bg-[#0B0E14] shadow-2xl">
             {content}
          </div>
          <div 
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenMobile(false)}
          />
        </div>
      )}
    </>
  );
}
