"use client";

import type { Experience } from "@/types/experience";

// Keep categories typed to the shared Experience model so filters cannot drift from the data.
const categories: Array<Experience["category"]> = [
  "Adventure",
  "Culture",
  "Food",
  "Wellness",
  "Nature",
];

// FilterBar is controlled by useFilters; it never stores filter state itself.
interface FilterBarProps {
  // Empty string means "All" for both category and destination.
  category: string;
  destination: string;
  // Destination options are derived from the catalog in ExplorerPageClient.
  destinations: string[];
  // Change handlers update the URL query string through useFilters.
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
  // Shared select styling keeps all controls aligned and avoids duplicated class strings.
  const selectClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition focus:border-brand-700 focus:ring-brand-700";

  return (
    // Three-column layout becomes a stacked control group on small screens.
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <label className="space-y-2">
        {/* Category filter compares exact category values in useExperiences. */}
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
        {/* Destination filter can match full destination strings or country suffixes. */}
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
        {/* Sorting is presentational in this MVP; real ranking logic can attach here later. */}
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
