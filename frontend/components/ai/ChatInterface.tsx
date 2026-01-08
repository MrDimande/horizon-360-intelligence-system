"use client";

import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value);
          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content += chunk;
            }
            return updated;
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-indigo-600">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Assistente Horizon 360°
          </h2>
          <p className="text-xs text-slate-500">
            IA para gestão de pessoas e finanças
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500/20 to-indigo-600/20">
              <Bot className="h-8 w-8 text-sky-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-slate-200">
              Como posso ajudar?
            </h3>
            <p className="max-w-sm text-sm text-slate-500">
              Pergunte sobre funcionários, folha salarial, despesas, receitas ou
              peça insights sobre sua empresa.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "Quantos funcionários ativos temos?",
                "Qual o resumo financeiro do mês?",
                "Sugira formas de reduzir custos",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setInput(suggestion)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-sky-600 hover:text-sky-400"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-sky-500 to-indigo-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  message.role === "user"
                    ? "bg-sky-600 text-white"
                    : "border border-slate-800 bg-slate-900 text-slate-200"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
              {message.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-700">
                  <User className="h-4 w-4 text-slate-300" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-sky-500 to-indigo-600">
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2.5">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400"></span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400"></span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400"></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-400">
            Erro: {error.message}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-slate-800 px-4 py-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreva sua pergunta..."
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors focus:border-sky-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Enviar mensagem"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
