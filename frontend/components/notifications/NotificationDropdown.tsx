"use client";

import {
    AlertTriangle,
    Bell,
    Check,
    CheckCheck,
    Info
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Notification = {
  id: string;
  createdAt: string;
  type: "INFO" | "WARNING" | "SUCCESS" | "ERROR" | "PAYROLL_READY" | "REVIEW_DUE" | "SYSTEM";
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
};

const typeIcons = {
  INFO: Info,
  WARNING: AlertTriangle,
  SUCCESS: Check,
  ERROR: AlertTriangle,
  PAYROLL_READY: Check,
  REVIEW_DUE: AlertTriangle,
  SYSTEM: Info,
};

const typeColors = {
  INFO: "text-sky-400",
  WARNING: "text-amber-400",
  SUCCESS: "text-emerald-400",
  ERROR: "text-red-400",
  PAYROLL_READY: "text-emerald-400",
  REVIEW_DUE: "text-amber-400",
  SYSTEM: "text-slate-400",
};

// Mock notifications for demo (replace with API calls)
const mockNotifications: Notification[] = [
  {
    id: "1",
    createdAt: new Date().toISOString(),
    type: "PAYROLL_READY",
    title: "Folha Salarial Processada",
    message: "A folha de Janeiro 2026 foi processada com sucesso.",
    isRead: false,
    actionUrl: "/hcm/payroll",
  },
  {
    id: "2",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    type: "REVIEW_DUE",
    title: "Avaliação Pendente",
    message: "Existem 3 avaliações de desempenho por aprovar.",
    isRead: false,
    actionUrl: "/hcm/evaluations",
  },
  {
    id: "3",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    type: "INFO",
    title: "Novo funcionário adicionado",
    message: "João Silva foi registado no departamento de TI.",
    isRead: true,
  },
];

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "agora";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
        aria-label="Notificações"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-100">Notificações</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Marcar todas
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const Icon = typeIcons[notification.type];
                const colorClass = typeColors[notification.type];

                return (
                  <div
                    key={notification.id}
                    className={`flex gap-3 border-b border-slate-800/50 px-4 py-3 transition-colors last:border-0 hover:bg-slate-800/50 ${
                      !notification.isRead ? "bg-slate-800/30" : ""
                    }`}
                  >
                    <div className={`mt-0.5 ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm ${
                            notification.isRead
                              ? "text-slate-400"
                              : "font-medium text-slate-100"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <span className="shrink-0 text-xs text-slate-500">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
                        {notification.message}
                      </p>
                      {notification.actionUrl && !notification.isRead && (
                        <Link
                          href={notification.actionUrl}
                          onClick={() => {
                            markAsRead(notification.id);
                            setOpen(false);
                          }}
                          className="mt-1 inline-block text-xs text-sky-400 hover:text-sky-300"
                        >
                          Ver detalhes →
                        </Link>
                      )}
                    </div>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="shrink-0 text-slate-500 hover:text-slate-300"
                        title="Marcar como lida"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center">
                <Bell className="mx-auto mb-2 h-8 w-8 text-slate-600" />
                <p className="text-sm text-slate-500">
                  Sem notificações
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 px-4 py-2">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="block text-center text-xs text-slate-400 hover:text-slate-200"
            >
              Ver todas as notificações
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
