import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";

function generatePayrollCSV(payrolls: any[]): string {
  const headers = [
    "Funcionário",
    "Departamento",
    "Período",
    "Salário Bruto",
    "Deduções",
    "Salário Líquido",
    "Status",
  ];

  const rows = payrolls.map((p) => [
    p.employee?.name || "N/A",
    p.employee?.department || "N/A",
    p.period,
    Number(p.grossSalary).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    Number(p.totalDeductions).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    Number(p.netSalary).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    p.status,
  ]);

  const csvContent = [
    headers.join(";"),
    ...rows.map((row) => row.join(";")),
  ].join("\n");

  return csvContent;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period");
  const format = searchParams.get("format") || "csv";

  try {
    const payrolls = await prisma.payroll.findMany({
      where: period ? { period } : undefined,
      include: {
        employee: {
          select: { name: true, department: true, position: true },
        },
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (payrolls.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma folha de pagamento encontrada" },
        { status: 404 }
      );
    }

    if (format === "csv") {
      const csv = generatePayrollCSV(payrolls);
      const filename = period
        ? `folha_salarial_${period}.csv`
        : `folha_salarial_todos.csv`;

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    // JSON format as fallback
    return NextResponse.json({
      period: period || "todos",
      count: payrolls.length,
      data: payrolls,
    });
  } catch (error) {
    console.error("Failed to export payroll:", error);
    return NextResponse.json(
      { error: "Falha ao exportar folha salarial" },
      { status: 500 }
    );
  }
}
