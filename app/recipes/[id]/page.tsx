import Link from "next/link";
import { Suspense } from "react";
import { RecipeDetailsFallback } from "./components/RecipeDetailsFallback";
import { RecipeDetailsSection } from "./components/RecipeDetailsSection";

type RecipeDetailsPageProps = {
  params: Promise<{ id: string }>;
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

function buildBackToRecipesUrl(params: Awaited<RecipeDetailsPageProps["searchParams"]>) {
  const query = new URLSearchParams();

  if (params.query) query.set("query", params.query);
  if (params.cuisine) query.set("cuisine", params.cuisine);
  if (params.diet) query.set("diet", params.diet);
  if (params.mealType) query.set("mealType", params.mealType);
  if (params.includeIngredients) {
    query.set("includeIngredients", params.includeIngredients);
  }
  if (params.maxReadyTime) query.set("maxReadyTime", params.maxReadyTime);
  if (params.page) query.set("page", params.page);

  return query.size ? `/recipes?${query.toString()}` : "/recipes";
}

export default async function RecipeDetailsPage({
  params,
  searchParams,
}: RecipeDetailsPageProps) {
  const { id } = await params;
  const backToRecipesUrl = buildBackToRecipesUrl(await searchParams);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Link
          href={backToRecipesUrl}
          className="text-sm font-medium text-[#31543d] underline-offset-4 hover:underline"
        >
          Back to recipes
        </Link>
      </div>

      <Suspense fallback={<RecipeDetailsFallback />}>
        <RecipeDetailsSection id={id} />
      </Suspense>
    </main>
  );
}
