"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

// SearchBar manages local typing state, while the parent decides what a search means.
interface SearchBarProps {
  // value comes from URL-backed filter state in useFilters.
  value: string;
  // onChange writes back to the parent after a short debounce.
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search experience titles…",
}: SearchBarProps) {
  // Draft lets users type smoothly before the URL query string updates.
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    // Debounce typing before updating the URL so the explorer does not rewrite on every keystroke.
    const timeoutId = window.setTimeout(() => {
      if (draft !== value) {
        onChange(draft);
      }
    }, 280);

    return () => window.clearTimeout(timeoutId);
  }, [draft, onChange, value]);

  return (
    // label wrapper keeps the search input accessible while allowing the icon to sit inside.
    <label className="relative block">
      <span className="sr-only">Search experiences</span>
      {/* Decorative search icon is pointer-events-none so clicks still focus the input. */}
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-brand-700 focus:ring-brand-700"
      />
    </label>
  );
}
