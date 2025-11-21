import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const [employees, financialRecords, insights] = await Promise.all([
      prisma.employee.count(),
      prisma.financialRecord.count(),
      prisma.aiInsight.count(),
    ]);

    return NextResponse.json({
      status: "ok",
      data: {
        employees,
        financialRecords,
        insights,
      },
    });
  } catch (error) {
    console.error("Prisma test route error", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Prisma test failed",
      },
      { status: 500 }
    );
  }
}
