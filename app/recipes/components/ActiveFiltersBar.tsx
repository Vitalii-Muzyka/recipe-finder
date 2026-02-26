import Link from "next/link";

type ActiveFilter = {
  label: string;
  value: string;
};

type ActiveFiltersBarProps = {
  filters: ActiveFilter[];
};

export function ActiveFiltersBar({ filters }: ActiveFiltersBarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
      <Link
        href="/"
        className="font-medium text-[#31543d] underline-offset-4 hover:underline"
      >
        Back to search
      </Link>
      <span className="hidden text-[#a2ab98] sm:inline">|</span>
      <p className="font-medium text-[#415844]">Active filters</p>
      {filters.length ? (
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <span
              key={`${filter.label}:${filter.value}`}
              className="inline-flex items-center rounded-full border border-[#cfe0d4] bg-[#eef4ea] px-3 py-1 text-xs font-medium text-[#2d4a35]"
            >
              {filter.label}: {filter.value}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-[var(--muted)]">None</span>
      )}
    </div>
  );
}
