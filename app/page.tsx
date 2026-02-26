import { SearchForm } from "./components/SearchForm";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#486f56]">
          Recipe Finder
        </p>
        <h1 className="text-balance text-3xl font-semibold text-[#202f20] sm:text-5xl">
          Discover recipes that match your cravings
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
          Fill any combination of query, cuisine, diet, meal type, ingredients, and
          max preparation time.
        </p>
      </div>

      <SearchForm />
    </main>
  );
}
