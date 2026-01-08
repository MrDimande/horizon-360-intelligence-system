import { Calendar, Plus, Star, User } from "lucide-react";
import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

async function getPerformanceReviews() {
  try {
    const reviews = await prisma.performanceReview.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        employee: {
          select: { name: true, department: true, position: true },
        },
      },
    });
    return reviews;
  } catch (error) {
    console.error("Failed to fetch performance reviews:", error);
    return [];
  }
}

async function getEmployees() {
  try {
    return await prisma.employee.findMany({
      where: { isActive: true },
      select: { id: true, name: true, department: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
}

const statusColors = {
  DRAFT: "bg-slate-600 text-slate-200",
  SUBMITTED: "bg-amber-600 text-amber-100",
  APPROVED: "bg-emerald-600 text-emerald-100",
};

const statusLabels = {
  DRAFT: "Rascunho",
  SUBMITTED: "Submetida",
  APPROVED: "Aprovada",
};

const ratingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
      }`}
    />
  ));
};

export default async function EvaluationsPage() {
  const [reviews, employees] = await Promise.all([
    getPerformanceReviews(),
    getEmployees(),
  ]);

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-500">
            HCM / Avaliações
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
            Avaliações de Desempenho
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Gerir avaliações trimestrais, anuais e feedback de performance.
          </p>
        </div>
        <Link
          href="/hcm/evaluations/new"
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500"
        >
          <Plus className="h-4 w-4" />
          Nova Avaliação
        </Link>
      </header>

      {/* Filters */}
      <div className="flex gap-3">
        <select
          aria-label="Filtrar por período"
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none focus:border-sky-500"
        >
          <option value="">Todos os Períodos</option>
          <option value="Q4-2024">Q4 2024</option>
          <option value="Q3-2024">Q3 2024</option>
          <option value="Q2-2024">Q2 2024</option>
          <option value="Q1-2024">Q1 2024</option>
        </select>
        <select
          aria-label="Filtrar por status"
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none focus:border-sky-500"
        >
          <option value="">Todos os Status</option>
          <option value="DRAFT">Rascunho</option>
          <option value="SUBMITTED">Submetida</option>
          <option value="APPROVED">Aprovada</option>
        </select>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-700"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-100">
                    {review.employee?.name || "Funcionário"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {review.employee?.position} • {review.employee?.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {ratingStars(review.rating)}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="h-4 w-4" />
                  {review.period}
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusColors[review.status as keyof typeof statusColors]
                  }`}
                >
                  {statusLabels[review.status as keyof typeof statusLabels]}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 py-16 text-center">
          <Star className="mb-4 h-12 w-12 text-slate-600" />
          <h3 className="text-lg font-medium text-slate-300">
            Sem avaliações registadas
          </h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Comece criando a primeira avaliação de desempenho para um
            funcionário.
          </p>
          <Link
            href="/hcm/evaluations/new"
            className="mt-4 flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500"
          >
            <Plus className="h-4 w-4" />
            Criar Avaliação
          </Link>
        </div>
      )}
    </section>
  );
}
