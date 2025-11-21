import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Horizon 360° Intelligence System",
  description:
    "Horizon 360° Intelligence System é uma plataforma web inteligente que une Gestão de Capital Humano e Gestão Financeira em um só lugar. Com o apoio de Inteligência Artificial, automatiza processos, antecipa cenários e transforma dados dispersos em decisões estratégicas, em tempo real.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
