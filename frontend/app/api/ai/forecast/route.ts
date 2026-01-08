import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 60;

type ForecastDataPoint = {
  period: string;
  income: number;
  expense: number;
  net: number;
  isProjected: boolean;
};

type ForecastInsight = {
  type: "trend" | "warning" | "opportunity";
  title: string;
  description: string;
};

type ForecastResponse = {
  historical: ForecastDataPoint[];
  projections: ForecastDataPoint[];
  insights: ForecastInsight[];
  summary: string;
};

async function getHistoricalData() {
  const records = await prisma.financialRecord.findMany({
    orderBy: { date: "asc" },
    select: {
      type: true,
      amount: true,
      date: true,
      category: true,
    },
  });

  // Group by month
  const monthlyData: Record<string, { income: number; expense: number }> = {};

  records.forEach((record) => {
    const date = new Date(record.date);
    const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!monthlyData[period]) {
      monthlyData[period] = { income: 0, expense: 0 };
    }

    const amount = Number(record.amount);
    if (record.type === "INCOME") {
      monthlyData[period].income += amount;
    } else {
      monthlyData[period].expense += amount;
    }
  });

  // Convert to array and calculate net
  const historical: ForecastDataPoint[] = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([period, data]) => ({
      period,
      income: data.income,
      expense: data.expense,
      net: data.income - data.expense,
      isProjected: false,
    }));

  return historical;
}

async function generateForecastWithAI(
  historical: ForecastDataPoint[],
  months: number = 3
): Promise<{ projections: ForecastDataPoint[]; insights: ForecastInsight[]; summary: string }> {
  const historicalSummary = historical
    .slice(-6)
    .map(
      (d) =>
        `${d.period}: Receita R$${d.income.toLocaleString("pt-BR")}, Despesa R$${d.expense.toLocaleString("pt-BR")}, Líquido R$${d.net.toLocaleString("pt-BR")}`
    )
    .join("\n");

  const prompt = `Você é um analista financeiro especializado. Com base nos dados históricos abaixo, gere uma previsão para os próximos ${months} meses.

DADOS HISTÓRICOS (últimos meses):
${historicalSummary}

Responda em JSON válido com exatamente esta estrutura:
{
  "projections": [
    {"period": "YYYY-MM", "income": number, "expense": number, "net": number}
  ],
  "insights": [
    {"type": "trend|warning|opportunity", "title": "string", "description": "string"}
  ],
  "summary": "Resumo executivo da previsão em 2-3 frases"
}

Regras:
- Projete ${months} meses a partir do último período nos dados
- Baseie as projeções em tendências observadas
- Inclua 2-4 insights relevantes
- Valores devem ser números realistas baseados no histórico
- Responda APENAS com o JSON, sem markdown ou texto adicional`;

  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    // Parse the AI response
    const jsonMatch = result.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response format");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Add isProjected flag to projections
    const projections: ForecastDataPoint[] = parsed.projections.map(
      (p: { period: string; income: number; expense: number; net: number }) => ({
        ...p,
        isProjected: true,
      })
    );

    return {
      projections,
      insights: parsed.insights,
      summary: parsed.summary,
    };
  } catch (error) {
    console.error("AI forecast generation failed:", error);

    // Fallback: simple linear projection
    const lastData = historical[historical.length - 1] || {
      income: 100000,
      expense: 80000,
      net: 20000,
    };
    const avgGrowth = 1.02; // 2% monthly growth assumption

    const projections: ForecastDataPoint[] = [];
    let lastPeriod = historical[historical.length - 1]?.period || "2024-10";

    for (let i = 1; i <= months; i++) {
      const [year, month] = lastPeriod.split("-").map(Number);
      const nextMonth = month + i;
      const nextYear = year + Math.floor((nextMonth - 1) / 12);
      const nextMonthNormalized = ((nextMonth - 1) % 12) + 1;
      const period = `${nextYear}-${String(nextMonthNormalized).padStart(2, "0")}`;

      projections.push({
        period,
        income: Math.round(lastData.income * Math.pow(avgGrowth, i)),
        expense: Math.round(lastData.expense * Math.pow(avgGrowth * 0.98, i)),
        net:
          Math.round(lastData.income * Math.pow(avgGrowth, i)) -
          Math.round(lastData.expense * Math.pow(avgGrowth * 0.98, i)),
        isProjected: true,
      });
    }

    return {
      projections,
      insights: [
        {
          type: "trend" as const,
          title: "Projeção baseada em tendência linear",
          description:
            "Devido a limitações na análise de IA, utilizamos uma projeção linear simples com crescimento de 2% ao mês.",
        },
      ],
      summary:
        "Previsão gerada com base em tendência linear. Para análises mais precisas, verifique os dados históricos disponíveis.",
    };
  }
}

export async function POST(req: Request) {
  try {
    const { months = 3 } = await req.json();

    const historical = await getHistoricalData();

    if (historical.length === 0) {
      return NextResponse.json(
        {
          error: "Não há dados históricos suficientes para gerar previsões",
        },
        { status: 400 }
      );
    }

    const { projections, insights, summary } = await generateForecastWithAI(
      historical,
      months
    );

    const response: ForecastResponse = {
      historical,
      projections,
      insights,
      summary,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Forecast generation failed:", error);
    return NextResponse.json(
      { error: "Falha ao gerar previsão financeira" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Default to 3-month forecast
  try {
    const historical = await getHistoricalData();

    if (historical.length === 0) {
      return NextResponse.json({
        historical: [],
        projections: [],
        insights: [],
        summary: "Sem dados históricos disponíveis.",
      });
    }

    const { projections, insights, summary } = await generateForecastWithAI(
      historical,
      3
    );

    const response: ForecastResponse = {
      historical,
      projections,
      insights,
      summary,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Forecast generation failed:", error);
    return NextResponse.json(
      { error: "Falha ao gerar previsão financeira" },
      { status: 500 }
    );
  }
}
