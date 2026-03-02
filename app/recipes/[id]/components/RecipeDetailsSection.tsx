import { fetchRecipeDetails } from "@/lib/spoonacular";
import { RecipeDetailsArticle } from "./RecipeDetailsArticle";
import { RecipeDetailsError } from "./RecipeDetailsError";

type RecipeDetailsSectionProps = {
  id: string;
};

export async function RecipeDetailsSection({ id }: RecipeDetailsSectionProps) {
  let recipe: Awaited<ReturnType<typeof fetchRecipeDetails>> | null = null;
  let errorMessage: string | null = null;

  try {
    recipe = await fetchRecipeDetails(id);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unexpected error.";
  }

  if (errorMessage) {
    return <RecipeDetailsError message={errorMessage} />;
  }

  if (!recipe) {
    return <RecipeDetailsError message="Recipe details are unavailable." />;
  }

  return <RecipeDetailsArticle recipe={recipe} />;
}
