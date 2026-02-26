"use client";

import { useEffect, useId, useRef, useState } from "react";

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  ariaLabel: string;
};

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
}: CustomSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();

  useEffect(() => {
    function onOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-[#c8ccb7] bg-white px-3 text-sm text-left outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[#cfe7db]"
      >
        <span>{value || placeholder}</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen ? (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-[#c8ccb7] bg-white shadow-[0_10px_22px_rgba(38,62,44,0.12)]">
          <ul id={listId} role="listbox" className="max-h-56 w-full overflow-auto py-1">
            <li>
              <button
                type="button"
                role="option"
                aria-selected={value === ""}
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm transition hover:bg-[#eef4ea] ${
                  value === "" ? "bg-[#dcefe3] text-[#1f2a1f]" : "text-[#1f2a1f]"
                }`}
              >
                {placeholder}
              </button>
            </li>
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm transition hover:bg-[#eef4ea] ${
                    value === option ? "bg-[#dcefe3] text-[#1f2a1f]" : "text-[#1f2a1f]"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
