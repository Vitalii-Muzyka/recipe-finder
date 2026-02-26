import { Suspense } from "react";
import { ActiveFiltersBar } from "./components/ActiveFiltersBar";
import { RecipesFallback } from "./components/RecipesFallback";
import { RecipesResults } from "./components/RecipesResults";
import { normalizeSearchParams } from "./utils/normalizeSearchParams";

type RecipesSearchParams = {
  query?: string;
  cuisine?: string;
  diet?: string;
  mealType?: string;
  includeIngredients?: string;
  maxReadyTime?: string;
  page?: string;
};

type RecipesPageProps = {
  searchParams: Promise<RecipesSearchParams>;
};

const PAGE_SIZE = 9;

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const { page, ...filters } = normalizeSearchParams(await searchParams);
  const activeFilters = [
    filters.query ? { label: "Query", value: filters.query } : null,
    filters.cuisine ? { label: "Cuisine", value: filters.cuisine } : null,
    filters.diet ? { label: "Diet", value: filters.diet } : null,
    filters.mealType ? { label: "Meal type", value: filters.mealType } : null,
    filters.includeIngredients
      ? { label: "Ingredients", value: filters.includeIngredients }
      : null,
    filters.maxReadyTime
      ? { label: "Max prep", value: `${filters.maxReadyTime} min` }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6">
      <ActiveFiltersBar filters={activeFilters} />

      <h1 className="mb-6 text-3xl font-semibold text-[#1f2e1f]">Recipes</h1>

      <Suspense fallback={<RecipesFallback count={PAGE_SIZE} />}>
        <RecipesResults filters={filters} currentPage={page} pageSize={PAGE_SIZE} />
      </Suspense>
    </main>
  );
}
