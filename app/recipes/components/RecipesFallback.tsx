type RecipesFallbackProps = {
  count: number;
};

export function RecipesFallback({ count }: RecipesFallbackProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-[#d6dccf] bg-white"
        >
          <div className="aspect-4/3 animate-pulse bg-[#e7ebde]" />
          <div className="p-4">
            <div className="h-4 w-4/5 animate-pulse rounded bg-[#e7ebde]" />
          </div>
        </div>
      ))}
    </div>
  );
}
