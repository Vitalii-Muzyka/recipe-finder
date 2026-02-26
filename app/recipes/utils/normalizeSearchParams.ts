import { RecipeSearchFilters } from "@/lib/spoonacular";

export function normalizeSearchParams(
  params: {
    query?: string;
    cuisine?: string;
    diet?: string;
    mealType?: string;
    includeIngredients?: string;
    maxReadyTime?: string;
    page?: string;
  },
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
