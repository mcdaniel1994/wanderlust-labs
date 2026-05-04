"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search experience titles…",
}: SearchBarProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (draft !== value) {
        onChange(draft);
      }
    }, 280);

    return () => window.clearTimeout(timeoutId);
  }, [draft, onChange, value]);

  return (
    <label className="relative block">
      <span className="sr-only">Search experiences</span>
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
