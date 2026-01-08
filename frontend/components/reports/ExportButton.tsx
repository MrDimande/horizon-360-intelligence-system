"use client";

import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { useState } from "react";

type ExportButtonProps = {
  endpoint: string;
  filename?: string;
  label?: string;
  params?: Record<string, string>;
  variant?: "default" | "compact";
};

export function ExportButton({
  endpoint,
  filename,
  label = "Exportar",
  params = {},
  variant = "default",
}: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        ...params,
        format: "csv",
      }).toString();

      const response = await fetch(`${endpoint}?${queryParams}`);

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "export.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Falha ao exportar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleExport}
        disabled={loading}
        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100 disabled:opacity-50"
        title={label}
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Download className="h-3.5 w-3.5" />
        )}
        CSV
      </button>
    );
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileSpreadsheet className="h-4 w-4" />
      )}
      {label}
    </button>
  );
}
