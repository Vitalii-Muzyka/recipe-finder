const BASE_URL = "https://api.spoonacular.com/recipes";

type SearchRecipe = {
  id: number;
  title: string;
  image: string;
};

type SearchResponse = {
  results: SearchRecipe[];
};

type Ingredient = {
  id: number;
  original: string;
};

type InstructionStep = {
  number: number;
  step: string;
};

type InstructionSection = {
  name: string;
  steps: InstructionStep[];
};

export type RecipeDetailsResponse = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  healthScore: number;
  pricePerServing: number;
  dishTypes: string[];
  diets: string[];
  cuisines: string[];
  extendedIngredients: Ingredient[];
  analyzedInstructions: InstructionSection[];
};

export type RecipeSearchFilters = {
  query?: string;
  cuisine?: string;
  diet?: string;
  mealType?: string;
  includeIngredients?: string;
  maxReadyTime?: string;
};

function getApiKey() {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    throw new Error("Missing SPOONACULAR_API_KEY in environment variables.");
  }

  return apiKey;
}

export async function fetchRecipes(filters: RecipeSearchFilters) {
  const apiKey = getApiKey();
  const params = new URLSearchParams({ apiKey });
  params.set("number", "27");

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
    params.set("type", filters.mealType);
  }

  if (filters.includeIngredients) {
    params.set("includeIngredients", filters.includeIngredients);
  }

  if (filters.maxReadyTime) {
    params.set("maxReadyTime", filters.maxReadyTime);
  }

  const response = await fetch(`${BASE_URL}/complexSearch?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes (${response.status}).`);
  }

  const data = (await response.json()) as SearchResponse;
  return data.results;
}

export async function fetchRecipeDetails(recipeId: string) {
  const apiKey = getApiKey();
  const response = await fetch(`${BASE_URL}/${recipeId}/information?apiKey=${apiKey}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipe details (${response.status}).`);
  }

  return (await response.json()) as RecipeDetailsResponse;
}
