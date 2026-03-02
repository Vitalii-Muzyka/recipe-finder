import Image from "next/image";
import { RecipeDetailsResponse } from "@/lib/spoonacular";
import { IngredientsChecklist } from "./IngredientsChecklist";

type RecipeDetailsArticleProps = {
  recipe: RecipeDetailsResponse;
};

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function RecipeDetailsArticle({ recipe }: RecipeDetailsArticleProps) {
  const summaryText = stripHtml(recipe.summary);
  const instructionSteps = recipe.analyzedInstructions.flatMap(
    (section) => section.steps,
  );
  const metricBadges = [
    recipe.healthScore ? `Health score ${Math.round(recipe.healthScore)}` : null,
    recipe.pricePerServing
      ? `$${(recipe.pricePerServing / 100).toFixed(2)} / serving`
      : null,
    recipe.cuisines?.length ? `Cuisines: ${recipe.cuisines.join(", ")}` : null,
    recipe.diets?.length ? `Diets: ${recipe.diets.join(", ")}` : null,
    recipe.dishTypes?.length ? `Dish types: ${recipe.dishTypes.join(", ")}` : null,
  ].filter(Boolean) as string[];

  return (
    <article className="rounded-2xl border border-[#d6dccf] bg-white p-6 shadow-[0_12px_30px_rgba(38,62,44,0.08)] sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <h1 className="text-3xl font-semibold text-[#1f2e1f] sm:text-4xl">
            {recipe.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-2 text-sm text-(--muted)">
            <span className="rounded-full bg-[#edf2ea] px-3 py-1">
              Ready in {recipe.readyInMinutes} min
            </span>
            <span className="rounded-full bg-[#edf2ea] px-3 py-1">
              Servings {recipe.servings}
            </span>
          </div>

          {summaryText ? (
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#344534] sm:text-base">
              {summaryText}
            </p>
          ) : null}
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-[#d6dccf] bg-[#f5f8f2]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>

      {metricBadges.length ? (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#3a5a43]">
            Recipe details
          </h2>
          <div className="flex flex-wrap gap-2">
            {metricBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[#cfe0d4] bg-[#eef4ea] px-3 py-1 text-xs font-medium text-[#2d4a35]"
              >
                {badge}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <IngredientsChecklist
        items={recipe.extendedIngredients.map((item) => item.original)}
        storageKey={`recipe-${recipe.id}-ingredients`}
      />

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-[#273827]">Instructions</h2>
        {instructionSteps.length ? (
          <ol className="space-y-3 text-sm leading-7 text-[#334433] sm:text-base">
            {instructionSteps.map((step) => (
              <li key={`${step.number}-${step.step.slice(0, 24)}`} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e7efe4] text-xs font-semibold text-[#2f5f40]">
                  {step.number}
                </span>
                <span>{step.step}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-(--muted)">
            No step-by-step instructions available.
          </p>
        )}
      </section>
    </article>
  );
}
