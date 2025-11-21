"use client";

import { useChat, type UseChatOptions } from "ai/react";

export function useHorizonChat(options?: UseChatOptions) {
  return useChat({
    api: "/api/ai/chat",
    ...options,
  });
}
