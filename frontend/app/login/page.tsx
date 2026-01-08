"use client";

import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Credenciais inválidas");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar entrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950">
      <div className="relative w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="absolute -top-12 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 bg-sky-500/10 blur-[80px]" />
        
        <div className="mb-8 text-center">
          <div className="-mb-6 flex items-center justify-center">
             <div className="relative h-48 w-48">
                 <Image 
                   src="/logo.png" 
                   alt="Horizon 360 Logo" 
                   fill
                   className="object-contain"
                 />
             </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Bem-vindo
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Entre na sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:border-sky-500/50 focus:outline-hidden focus:ring-1 focus:ring-sky-500/50"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:border-sky-500/50 focus:outline-hidden focus:ring-1 focus:ring-sky-500/50"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-sky-500 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
