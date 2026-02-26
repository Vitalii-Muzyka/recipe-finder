import { fetchRecipes, RecipeSearchFilters } from "@/lib/spoonacular";
import { RecipesGrid } from "./RecipesGrid";
import { RecipesPagination } from "./RecipesPagination";

type RecipesResultsProps = {
  filters: RecipeSearchFilters;
  currentPage: number;
  pageSize: number;
};

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

export async function RecipesResults({
  filters,
  currentPage,
  pageSize,
}: RecipesResultsProps) {
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

  const totalPages = Math.max(1, Math.ceil(recipes.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRecipes = recipes.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  );

  const pageLinks = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;

    return {
      page,
      href: buildRecipesUrl(filters, page),
      isActive: page === safeCurrentPage,
    };
  });

  return (
    <div className="space-y-6">
      <RecipesGrid recipes={paginatedRecipes} />

      {totalPages > 1 ? (
        <RecipesPagination
          prevHref={buildRecipesUrl(filters, Math.max(1, safeCurrentPage - 1))}
          nextHref={buildRecipesUrl(filters, Math.min(totalPages, safeCurrentPage + 1))}
          hasPrev={safeCurrentPage > 1}
          hasNext={safeCurrentPage < totalPages}
          pageLinks={pageLinks}
        />
      ) : null}
    </div>
  );
}
