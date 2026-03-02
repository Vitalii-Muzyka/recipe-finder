import Link from "next/link";

type PageLink = {
  page: number;
  href: string;
  isActive: boolean;
};

type RecipesPaginationProps = {
  prevHref: string;
  nextHref: string;
  hasPrev: boolean;
  hasNext: boolean;
  pageLinks: PageLink[];
};

export function RecipesPagination({
  prevHref,
  nextHref,
  hasPrev,
  hasNext,
  pageLinks,
}: RecipesPaginationProps) {
  return (
    <nav
      aria-label="Recipes pagination"
      className="flex items-center justify-center gap-2 text-sm"
    >
      <Link
        href={prevHref}
        aria-label="Previous page"
        aria-disabled={!hasPrev}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#c6cdbf] bg-white text-[#2f4a36] transition hover:bg-[#eef4ea] aria-disabled:pointer-events-none aria-disabled:opacity-50"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      {pageLinks.map((pageLink) => (
        <Link
          key={pageLink.page}
          href={pageLink.href}
          aria-current={pageLink.isActive ? "page" : undefined}
          className={`inline-flex h-9.5 w-9.5 items-center justify-center rounded-md border transition ${
            pageLink.isActive
              ? "border-[#7aa88b] bg-[#dcefe3] text-[#274033]"
              : "border-[#c6cdbf] bg-white text-[#2f4a36] hover:bg-[#eef4ea]"
          }`}
        >
          {pageLink.page}
        </Link>
      ))}
      <Link
        href={nextHref}
        aria-label="Next page"
        aria-disabled={!hasNext}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#c6cdbf] bg-white text-[#2f4a36] transition hover:bg-[#eef4ea] aria-disabled:pointer-events-none aria-disabled:opacity-50"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </nav>
  );
}
