import Link from "next/link";
import { Suspense } from "react";
import { fetchRecipeDetails } from "@/lib/spoonacular";

type RecipeDetailsPageProps = {
  params: Promise<{ id: string }>;
};

async function RecipeDetails({ id }: { id: string }) {
  let recipe: Awaited<ReturnType<typeof fetchRecipeDetails>> | null = null;
  let errorMessage: string | null = null;

  try {
    recipe = await fetchRecipeDetails(id);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unexpected error.";
  }

  if (errorMessage) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-[#e6b5b5] bg-[#fff4f4] p-6 text-sm text-[#8f1e1e]"
      >
        Failed to load recipe details: {errorMessage}
      </div>
    );
  }

  if (!recipe) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-[#e6b5b5] bg-[#fff4f4] p-6 text-sm text-[#8f1e1e]"
      >
        Recipe details are unavailable.
      </div>
    );
  }

  return (
    <article className="rounded-2xl border border-[#d6dccf] bg-white p-6 shadow-[0_12px_30px_rgba(38,62,44,0.08)] sm:p-8">
      <h1 className="text-3xl font-semibold text-[#1f2e1f]">{recipe.title}</h1>

      <div className="mt-3 flex flex-wrap gap-2 text-sm text-[var(--muted)]">
        <span className="rounded-full bg-[#edf2ea] px-3 py-1">
          Ready in {recipe.readyInMinutes} min
        </span>
        <span className="rounded-full bg-[#edf2ea] px-3 py-1">
          Servings {recipe.servings}
        </span>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-xl font-semibold text-[#273827]">Ingredients</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-[#334433] sm:text-base">
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={`${ingredient.id}-${index}`}>{ingredient.original}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function RecipeDetailsFallback() {
  return (
    <div className="rounded-2xl border border-[#d6dccf] bg-white p-6" aria-hidden>
      <div className="h-8 w-2/3 animate-pulse rounded bg-[#e7ebde]" />
      <div className="mt-5 h-5 w-1/3 animate-pulse rounded bg-[#e7ebde]" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-4 w-full animate-pulse rounded bg-[#e7ebde]" />
        ))}
      </div>
    </div>
  );
}

export default async function RecipeDetailsPage({ params }: RecipeDetailsPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-[#31543d] underline-offset-4 hover:underline"
        >
          Back to search
        </Link>
      </div>

      <Suspense fallback={<RecipeDetailsFallback />}>
        <RecipeDetails id={id} />
      </Suspense>
    </main>
  );
}
