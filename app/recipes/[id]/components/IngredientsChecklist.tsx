"use client";

import { useEffect, useMemo, useState } from "react";

type IngredientsChecklistProps = {
  items: string[];
  storageKey: string;
};

export function IngredientsChecklist({ items, storageKey }: IngredientsChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const selectedCount = useMemo(
    () => Object.values(checkedItems).filter(Boolean).length,
    [checkedItems],
  );

  useEffect(() => {
    try {
      const savedValue = window.localStorage.getItem(storageKey);
      if (savedValue) {
        const parsed = JSON.parse(savedValue) as Record<string, boolean>;
        const restored: Record<number, boolean> = {};

        Object.entries(parsed).forEach(([key, value]) => {
          const index = Number(key);
          if (Number.isInteger(index) && index >= 0 && index < items.length && value) {
            restored[index] = true;
          }
        });

        setCheckedItems(restored);
      }
    } catch {
      setCheckedItems({});
    } finally {
      setIsHydrated(true);
    }
  }, [storageKey, items.length]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const hasAnyChecked = Object.values(checkedItems).some(Boolean);
    if (!hasAnyChecked) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(checkedItems));
  }, [checkedItems, isHydrated, storageKey]);

  async function onCopy() {
    const text = items.map((item) => `- ${item}`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-[#273827]">Ingredients</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-(--muted)">
            Checked {selectedCount}/{items.length}
          </span>
          <button
            type="button"
            onClick={() => setCheckedItems({})}
            disabled={!selectedCount}
            className="cursor-pointer rounded-md border border-[#c6cdbf] bg-white px-3 py-1.5 text-xs font-medium text-[#2f4a36] transition hover:bg-[#eef4ea] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear selected
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="cursor-pointer rounded-md border border-[#c6cdbf] bg-white px-3 py-1.5 text-xs font-medium text-[#2f4a36] transition hover:bg-[#eef4ea]"
          >
            {copied ? "Copied" : "Copy ingredients"}
          </button>
        </div>
      </div>

      <ul className="space-y-2 text-sm text-[#334433] sm:text-base">
        {items.map((item, index) => {
          const id = `ingredient-${index}`;
          const checked = Boolean(checkedItems[index]);

          return (
            <li key={id}>
              <label
                htmlFor={id}
                className={`flex cursor-pointer items-start gap-3 rounded-md px-2 py-1 transition ${
                  checked ? "bg-[#eef4ea]" : "hover:bg-[#f6f8f2]"
                }`}
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => {
                    setCheckedItems((prev) => ({
                      ...prev,
                      [index]: event.target.checked,
                    }));
                  }}
                  className="mt-1 h-4 w-4 rounded border-[#b5c4b8] text-[#2f6b49] focus:ring-[#9dcbb2]"
                />
                <span className={checked ? "line-through opacity-70" : ""}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
