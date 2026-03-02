import Link from "next/link";

type RecipeDetailsErrorProps = {
  message: string;
};

export function RecipeDetailsError({ message }: RecipeDetailsErrorProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-[#e6b5b5] bg-[#fff4f4] p-6 text-sm text-[#8f1e1e]"
    >
      <p className="font-medium">Failed to load recipe details</p>
      <p className="mt-1">{message}</p>
      <Link href="/recipes" className="mt-4 inline-block underline">
        Back to recipes
      </Link>
    </div>
  );
}
