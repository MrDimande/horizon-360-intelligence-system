import { streamText, type LanguageModelV1 } from "ai";

type InsightContext = {
  topic: "hcm" | "finance" | "mixed";
  tenantId?: string;
};

export async function streamInsightText(
  model: LanguageModelV1,
  prompt: string,
  context?: InsightContext
) {
  return streamText({
    model,
    prompt,
    // context can be used to enrich prompts ou logs em camadas superiores
  });
}
