import type { ReactNode } from "react";
import Sidebar from "../../components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar />
      <main className="flex-1 px-4 py-6 md:px-8 lg:px-10 lg:py-8">
        {children}
      </main>
    </div>
  );
}
