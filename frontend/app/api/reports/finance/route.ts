import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";

function generateFinanceCSV(records: any[]): string {
  const headers = [
    "Data",
    "Tipo",
    "Categoria",
    "Descrição",
    "Valor",
    "Moeda",
  ];

  const rows = records.map((r) => [
    new Date(r.date).toLocaleDateString("pt-BR"),
    r.type === "INCOME" ? "Receita" : "Despesa",
    r.category,
    r.description || "",
    Number(r.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    r.currency,
  ]);

  const csvContent = [
    headers.join(";"),
    ...rows.map((row) => row.join(";")),
  ].join("\n");

  return csvContent;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const type = searchParams.get("type"); // INCOME or EXPENSE
  const format = searchParams.get("format") || "csv";

  try {
    const where: any = {};

    if (startDate) {
      where.date = { ...where.date, gte: new Date(startDate) };
    }
    if (endDate) {
      where.date = { ...where.date, lte: new Date(endDate) };
    }
    if (type === "INCOME" || type === "EXPENSE") {
      where.type = type;
    }

    const records = await prisma.financialRecord.findMany({
      where,
      orderBy: { date: "desc" },
    });

    if (records.length === 0) {
      return NextResponse.json(
        { error: "Nenhum registro financeiro encontrado" },
        { status: 404 }
      );
    }

    // Calculate totals
    const totals = records.reduce(
      (acc, r) => {
        const amount = Number(r.amount);
        if (r.type === "INCOME") {
          acc.income += amount;
        } else {
          acc.expense += amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    if (format === "csv") {
      // Add totals row at the end
      const csv = generateFinanceCSV(records);
      const totalsRow = `\n\nRESUMO:\nTotal Receitas;${totals.income.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\nTotal Despesas;${totals.expense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\nSaldo;${(totals.income - totals.expense).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

      const filename = "relatorio_financeiro.csv";

      return new NextResponse(csv + totalsRow, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    // JSON format with summary
    return NextResponse.json({
      count: records.length,
      summary: {
        totalIncome: totals.income,
        totalExpense: totals.expense,
        netBalance: totals.income - totals.expense,
      },
      data: records,
    });
  } catch (error) {
    console.error("Failed to export finance:", error);
    return NextResponse.json(
      { error: "Falha ao exportar dados financeiros" },
      { status: 500 }
    );
  }
}
