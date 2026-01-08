import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 60;

type InsightCategory = "headcount" | "financial" | "performance" | "recommendation";

type Insight = {
  id: string;
  category: InsightCategory;
  title: string;
  description: string;
  trend?: "up" | "down" | "stable";
  value?: string;
  priority: "high" | "medium" | "low";
};

async function gatherCompanyData() {
  const [
    totalEmployees,
    activeEmployees,
    departmentStats,
    recentHires,
    recentFinancials,
    incomeTotal,
    expenseTotal,
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.employee.count({ where: { isActive: true } }),
    prisma.employee.groupBy({
      by: ["department"],
      _count: { id: true },
      where: { isActive: true },
    }),
    prisma.employee.count({
      where: {
        hireDate: {
          gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Last 90 days
        },
      },
    }),
    prisma.financialRecord.findMany({
      orderBy: { date: "desc" },
      take: 50,
      select: { type: true, amount: true, category: true, date: true },
    }),
    prisma.financialRecord.aggregate({
      _sum: { amount: true },
      where: { type: "INCOME" },
    }),
    prisma.financialRecord.aggregate({
      _sum: { amount: true },
      where: { type: "EXPENSE" },
    }),
  ]);

  const income = Number(incomeTotal._sum?.amount ?? 0);
  const expense = Number(expenseTotal._sum?.amount ?? 0);

  return {
    totalEmployees,
    activeEmployees,
    inactiveEmployees: totalEmployees - activeEmployees,
    departmentStats: departmentStats.map((d) => ({
      name: d.department,
      count: d._count.id,
    })),
    recentHires,
    recentFinancials: recentFinancials.map((f) => ({
      type: f.type,
      amount: Number(f.amount),
      category: f.category,
      date: f.date.toISOString(),
    })),
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,
    profitMargin: income > 0 ? ((income - expense) / income) * 100 : 0,
  };
}

async function generateInsightsWithAI(data: Awaited<ReturnType<typeof gatherCompanyData>>): Promise<Insight[]> {
  const prompt = `Você é um analista empresarial especializado. Analise os dados da empresa e gere insights acionáveis.

DADOS DA EMPRESA:
- Total de funcionários: ${data.totalEmployees}
- Funcionários ativos: ${data.activeEmployees}
- Funcionários inativos: ${data.inactiveEmployees}
- Contratações recentes (90 dias): ${data.recentHires}
- Departamentos: ${JSON.stringify(data.departmentStats)}
- Receita total: R$ ${data.totalIncome.toLocaleString("pt-BR")}
- Despesa total: R$ ${data.totalExpense.toLocaleString("pt-BR")}
- Saldo líquido: R$ ${data.netBalance.toLocaleString("pt-BR")}
- Margem de lucro: ${data.profitMargin.toFixed(1)}%

Gere exatamente 4 insights em JSON:
[
  {
    "id": "string único",
    "category": "headcount|financial|performance|recommendation",
    "title": "Título curto (max 50 caracteres)",
    "description": "Descrição detalhada com ação recomendada (max 200 caracteres)",
    "trend": "up|down|stable",
    "value": "valor principal formatado",
    "priority": "high|medium|low"
  }
]

Regras:
- Um insight sobre headcount/RH
- Um insight sobre finanças
- Um insight sobre tendência ou anomalia
- Uma recomendação estratégica
- Responda APENAS com o array JSON`;

  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    const jsonMatch = result.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("AI insights generation failed:", error);

    // Fallback to calculated insights
    return [
      {
        id: "headcount-1",
        category: "headcount",
        title: "Força de Trabalho",
        description: `${data.activeEmployees} funcionários ativos. ${data.recentHires} contratações nos últimos 90 dias.`,
        trend: data.recentHires > 0 ? "up" : "stable",
        value: `${data.activeEmployees}`,
        priority: "medium",
      },
      {
        id: "financial-1",
        category: "financial",
        title: "Resultado Financeiro",
        description: `Margem de ${data.profitMargin.toFixed(1)}%. ${data.netBalance >= 0 ? "Operação lucrativa" : "Atenção: despesas superam receitas"}.`,
        trend: data.netBalance >= 0 ? "up" : "down",
        value: `R$ ${data.netBalance.toLocaleString("pt-BR")}`,
        priority: data.netBalance < 0 ? "high" : "low",
      },
      {
        id: "performance-1",
        category: "performance",
        title: "Distribuição por Departamento",
        description: `${data.departmentStats.length} departamentos ativos. Maior: ${data.departmentStats[0]?.name || "N/A"}.`,
        trend: "stable",
        value: `${data.departmentStats.length} deps`,
        priority: "low",
      },
      {
        id: "recommendation-1",
        category: "recommendation",
        title: "Próximos Passos",
        description: data.inactiveEmployees > 0
          ? `Revise ${data.inactiveEmployees} funcionário(s) inativo(s) para decisão de reativação ou desligamento.`
          : "Considere planear expansão de equipa para próximo trimestre.",
        priority: "medium",
      },
    ];
  }
}

export async function GET() {
  try {
    const data = await gatherCompanyData();
    const insights = await generateInsightsWithAI(data);

    return NextResponse.json({
      insights,
      generatedAt: new Date().toISOString(),
      dataSnapshot: {
        employees: data.activeEmployees,
        netBalance: data.netBalance,
        profitMargin: data.profitMargin,
      },
    });
  } catch (error) {
    console.error("Failed to generate insights:", error);
    return NextResponse.json(
      { error: "Falha ao gerar insights" },
      { status: 500 }
    );
  }
}
