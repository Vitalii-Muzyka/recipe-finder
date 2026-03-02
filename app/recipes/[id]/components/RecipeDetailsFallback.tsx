export function RecipeDetailsFallback() {
  return (
    <div className="rounded-2xl border border-[#d6dccf] bg-white p-6" aria-hidden>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="h-10 w-2/3 animate-pulse rounded bg-[#e7ebde]" />
          <div className="mt-3 h-6 w-1/2 animate-pulse rounded bg-[#e7ebde]" />
          <div className="mt-5 h-4 w-full animate-pulse rounded bg-[#e7ebde]" />
          <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#e7ebde]" />
        </div>
        <div className="aspect-4/3 animate-pulse rounded-xl bg-[#e7ebde]" />
      </div>
      <div className="mt-8 space-y-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="h-4 w-full animate-pulse rounded bg-[#e7ebde]" />
        ))}
      </div>
    </div>
  );
}
