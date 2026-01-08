import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";

function generateEmployeesCSV(employees: any[]): string {
  const headers = [
    "Nome",
    "Email",
    "Departamento",
    "Cargo",
    "Data de Admissão",
    "Status",
  ];

  const rows = employees.map((e) => [
    e.name,
    e.email,
    e.department,
    e.position,
    new Date(e.hireDate).toLocaleDateString("pt-BR"),
    e.isActive ? "Ativo" : "Inativo",
  ]);

  const csvContent = [
    headers.join(";"),
    ...rows.map((row) => row.join(";")),
  ].join("\n");

  return csvContent;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department");
  const activeOnly = searchParams.get("active") === "true";
  const format = searchParams.get("format") || "csv";

  try {
    const employees = await prisma.employee.findMany({
      where: {
        ...(department ? { department } : {}),
        ...(activeOnly ? { isActive: true } : {}),
      },
      orderBy: { name: "asc" },
    });

    if (employees.length === 0) {
      return NextResponse.json(
        { error: "Nenhum funcionário encontrado" },
        { status: 404 }
      );
    }

    if (format === "csv") {
      const csv = generateEmployeesCSV(employees);
      const filename = department
        ? `funcionarios_${department.toLowerCase().replace(/\s+/g, "_")}.csv`
        : "funcionarios_todos.csv";

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    // JSON format as fallback
    return NextResponse.json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("Failed to export employees:", error);
    return NextResponse.json(
      { error: "Falha ao exportar funcionários" },
      { status: 500 }
    );
  }
}
