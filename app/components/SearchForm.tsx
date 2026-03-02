"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CUISINE_OPTIONS, DIET_OPTIONS, MEAL_TYPE_OPTIONS } from "./constants";
import { FormInputField } from "./FormInputField";
import { FormSelectField } from "./FormSelectField";

export function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [mealType, setMealType] = useState("");
  const [includeIngredients, setIncludeIngredients] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState("");

  const canProceed = useMemo(() => {
    return Boolean(
      query.trim() ||
      cuisine ||
      diet ||
      mealType ||
      includeIngredients.trim() ||
      maxReadyTime,
    );
  }, [query, cuisine, diet, mealType, includeIngredients, maxReadyTime]);

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();

    if (!canProceed) {
      return;
    }

    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("query", query.trim());
    }

    if (cuisine) {
      params.set("cuisine", cuisine);
    }

    if (diet) {
      params.set("diet", diet);
    }

    if (mealType) {
      params.set("mealType", mealType);
    }

    if (includeIngredients.trim()) {
      params.set("includeIngredients", includeIngredients.trim());
    }

    if (maxReadyTime) {
      params.set("maxReadyTime", maxReadyTime);
    }

    router.push(`/recipes?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-2xl rounded-2xl border border-[#d9dbc9] bg-(--panel) p-6 shadow-[0_16px_40px_rgba(35,52,35,0.08)] sm:p-8"
      aria-label="Recipe search form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInputField
          label="Recipe query"
          value={query}
          onChange={setQuery}
          placeholder="e.g. pasta"
          className="sm:col-span-2"
        />

        <FormSelectField
          label="Cuisine"
          value={cuisine}
          onChange={setCuisine}
          options={CUISINE_OPTIONS}
          placeholder="Any cuisine"
        />

        <FormSelectField
          label="Diet"
          value={diet}
          onChange={setDiet}
          options={DIET_OPTIONS}
          placeholder="Any diet"
        />

        <FormSelectField
          label="Meal type"
          value={mealType}
          onChange={setMealType}
          options={MEAL_TYPE_OPTIONS}
          placeholder="Any meal type"
        />

        <FormInputField
          label="Max prep time (minutes)"
          value={maxReadyTime}
          onChange={setMaxReadyTime}
          type="number"
          min={1}
          placeholder="e.g. 30"
        />

        <FormInputField
          label="Include ingredients"
          value={includeIngredients}
          onChange={setIncludeIngredients}
          placeholder="e.g. chicken, tomato, basil"
          className="sm:col-span-2"
        />
      </div>

      <button
        type="submit"
        disabled={!canProceed}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-(--accent) px-5 text-sm font-semibold text-white transition hover:bg-(--accent-strong) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#95cfb0] disabled:cursor-not-allowed disabled:bg-[#b4beac]"
      >
        Next
      </button>
    </form>
  );
}
