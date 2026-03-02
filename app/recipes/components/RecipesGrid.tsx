import Image from "next/image";
import Link from "next/link";

type RecipeCard = {
  id: number;
  title: string;
  image: string;
};

type RecipesGridProps = {
  recipes: RecipeCard[];
  detailsQuery?: string;
};

export function RecipesGrid({ recipes, detailsQuery }: RecipesGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          href={
            detailsQuery
              ? `/recipes/${recipe.id}?${detailsQuery}`
              : `/recipes/${recipe.id}`
          }
          className="group overflow-hidden rounded-xl border border-[#d6dccf] bg-white shadow-[0_10px_24px_rgba(38,62,44,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(38,62,44,0.15)]"
        >
          <div className="relative aspect-4/3">
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
  );
}
