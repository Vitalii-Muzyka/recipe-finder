import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { fetchRecipes, RecipeSearchFilters } from "@/lib/spoonacular";

type RecipesPageProps = {
  searchParams: Promise<{
    query?: string;
    cuisine?: string;
    diet?: string;
    mealType?: string;
    includeIngredients?: string;
    maxReadyTime?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 9;

function normalizeSearchParams(
  params: Awaited<RecipesPageProps["searchParams"]>,
): RecipeSearchFilters & { page: number } {
  const parsedPage = Number(params.page);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  return {
    query: params.query?.trim(),
    cuisine: params.cuisine?.trim(),
    diet: params.diet?.trim(),
    mealType: params.mealType?.trim(),
    includeIngredients: params.includeIngredients?.trim(),
    maxReadyTime: params.maxReadyTime?.trim(),
    page,
  };
}

function hasFilters(filters: RecipeSearchFilters) {
  return Boolean(
    filters.query ||
    filters.cuisine ||
    filters.diet ||
    filters.mealType ||
    filters.includeIngredients ||
    filters.maxReadyTime,
  );
}

function buildRecipesUrl(filters: RecipeSearchFilters, page: number) {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set("query", filters.query);
  }
  if (filters.cuisine) {
    params.set("cuisine", filters.cuisine);
  }
  if (filters.diet) {
    params.set("diet", filters.diet);
  }
  if (filters.mealType) {
    params.set("mealType", filters.mealType);
  }
  if (filters.includeIngredients) {
    params.set("includeIngredients", filters.includeIngredients);
  }
  if (filters.maxReadyTime) {
    params.set("maxReadyTime", filters.maxReadyTime);
  }
  params.set("page", String(page));

  return `/recipes?${params.toString()}`;
}

async function RecipesResults({
  filters,
  currentPage,
}: {
  filters: RecipeSearchFilters;
  currentPage: number;
}) {
  if (!hasFilters(filters)) {
    return (
      <div className="rounded-xl border border-[#d8dac8] bg-white p-6 text-sm text-[var(--muted)]">
        No filters were provided. Go back and enter at least one filter.
      </div>
    );
  }

  let recipes: Awaited<ReturnType<typeof fetchRecipes>> = [];
  let errorMessage: string | null = null;
  try {
    recipes = await fetchRecipes(filters);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unexpected error.";
  }

  if (errorMessage) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-[#e6b5b5] bg-[#fff4f4] p-6 text-sm text-[#8f1e1e]"
      >
        Failed to load recipes: {errorMessage}
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="rounded-xl border border-[#d8dac8] bg-white p-6 text-sm text-[var(--muted)]">
        No recipes found for your filters.
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(recipes.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRecipes = recipes.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="group overflow-hidden rounded-xl border border-[#d6dccf] bg-white shadow-[0_10px_24px_rgba(38,62,44,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(38,62,44,0.15)]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover transition group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="line-clamp-2 text-base font-semibold text-[#223623]">
                {recipe.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          aria-label="Recipes pagination"
          className="flex items-center justify-center gap-2 text-sm"
        >
          <Link
            href={buildRecipesUrl(filters, Math.max(1, safeCurrentPage - 1))}
            aria-label="Previous page"
            aria-disabled={safeCurrentPage === 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#c6cdbf] bg-white text-[#2f4a36] transition hover:bg-[#eef4ea] aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === safeCurrentPage;

            return (
              <Link
                key={page}
                href={buildRecipesUrl(filters, page)}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex h-[38px] w-[38px] items-center justify-center rounded-md border transition ${
                  isActive
                    ? "border-[#7aa88b] bg-[#dcefe3] text-[#274033]"
                    : "border-[#c6cdbf] bg-white text-[#2f4a36] hover:bg-[#eef4ea]"
                }`}
              >
                {page}
              </Link>
            );
          })}
          <Link
            href={buildRecipesUrl(filters, Math.min(totalPages, safeCurrentPage + 1))}
            aria-label="Next page"
            aria-disabled={safeCurrentPage === totalPages}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#c6cdbf] bg-white text-[#2f4a36] transition hover:bg-[#eef4ea] aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}

function RecipesFallback() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-[#d6dccf] bg-white"
        >
          <div className="aspect-[4/3] animate-pulse bg-[#e7ebde]" />
          <div className="p-4">
            <div className="h-4 w-4/5 animate-pulse rounded bg-[#e7ebde]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const { page, ...filters } = normalizeSearchParams(await searchParams);
  const activeFilters = [
    filters.query ? `query: ${filters.query}` : null,
    filters.cuisine ? `cuisine: ${filters.cuisine}` : null,
    filters.diet ? `diet: ${filters.diet}` : null,
    filters.mealType ? `meal type: ${filters.mealType}` : null,
    filters.includeIngredients ? `ingredients: ${filters.includeIngredients}` : null,
    filters.maxReadyTime ? `max prep: ${filters.maxReadyTime} min` : null,
  ].filter(Boolean) as string[];

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
        <Link
          href="/"
          className="font-medium text-[#31543d] underline-offset-4 hover:underline"
        >
          Back to search
        </Link>
        <span>|</span>
        <p>Filters: {activeFilters.length ? activeFilters.join(" | ") : "-"}</p>
      </div>

      <h1 className="mb-6 text-3xl font-semibold text-[#1f2e1f]">Recipes</h1>

      <Suspense fallback={<RecipesFallback />}>
        <RecipesResults filters={filters} currentPage={page} />
      </Suspense>
    </main>
  );
}
