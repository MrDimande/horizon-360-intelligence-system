import { ChatInterface } from "../../../components/ai/ChatInterface";

export default function AiPage() {
  return (
    <section className="flex h-full flex-col gap-4">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-500">
          Inteligência Artificial
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Assistente Horizon 360°
        </h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Converse com a IA para obter insights sobre sua empresa, funcionários
          e finanças.
        </p>
      </header>
      <ChatInterface />
    </section>
  );
}
