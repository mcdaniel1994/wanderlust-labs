"use client";

import type { Experience } from "@/types/experience";

const categories: Array<Experience["category"]> = [
  "Adventure",
  "Culture",
  "Food",
  "Wellness",
  "Nature",
];

interface FilterBarProps {
  category: string;
  destination: string;
  destinations: string[];
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

export function FilterBar({
  category,
  destination,
  destinations,
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) {
  const selectClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition focus:border-brand-700 focus:ring-brand-700";

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Category
        </span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={selectClass}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Destination
        </span>
        <select
          value={destination}
          onChange={(event) => onDestinationChange(event.target.value)}
          className={selectClass}
        >
          <option value="">All destinations</option>
          {destinations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Sort by
        </span>
        <select className={selectClass} defaultValue="recommended">
          <option value="recommended">Recommended</option>
        </select>
      </label>
    </div>
  );
}
