import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 30;

async function getSystemContext() {
  try {
    const [employeeCount, recentRecords] = await Promise.all([
      prisma.employee.count({ where: { isActive: true } }),
      prisma.financialRecord.findMany({
        orderBy: { date: "desc" },
        take: 10,
        select: {
          type: true,
          category: true,
          amount: true,
          date: true,
          description: true,
        },
      }),
    ]);

    const totalIncome = recentRecords
      .filter((r) => r.type === "INCOME")
      .reduce((sum, r) => sum + Number(r.amount), 0);

    const totalExpense = recentRecords
      .filter((r) => r.type === "EXPENSE")
      .reduce((sum, r) => sum + Number(r.amount), 0);

    return `
CONTEXTO ATUAL DA EMPRESA:
- Total de funcionários ativos: ${employeeCount}
- Últimas transações financeiras:
  * Total de receitas recentes: R$ ${totalIncome.toLocaleString("pt-BR")}
  * Total de despesas recentes: R$ ${totalExpense.toLocaleString("pt-BR")}
  * Saldo líquido: R$ ${(totalIncome - totalExpense).toLocaleString("pt-BR")}
`;
  } catch (error) {
    console.error("Failed to fetch context:", error);
    return "CONTEXTO: Dados não disponíveis no momento.";
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const context = await getSystemContext();

  const systemPrompt = `Você é o Assistente Horizon 360°, uma IA especializada em gestão integrada de Recursos Humanos e Finanças.

${context}

SUAS CAPACIDADES:
1. Responder perguntas sobre dados de funcionários, folha salarial e despesas
2. Fornecer insights sobre fluxo de caixa e tendências financeiras
3. Dar recomendações sobre gestão de pessoas e retenção de talentos
4. Ajudar na tomada de decisões estratégicas
5. Gerar análises sobre performance e produtividade

REGRAS:
- Responda sempre em português (Brasil/Moçambique)
- Seja conciso mas completo
- Use dados concretos quando disponíveis
- Sugira ações práticas quando apropriado
- Mantenha um tom profissional mas acessível`;

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
