"use client";

import { useMemo } from "react";

import { EmptyState } from "@/components/EmptyState";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { experiences } from "@/data/experiences";
import { useExperiences } from "@/hooks/useExperiences";
import { useFilters } from "@/hooks/useFilters";

// Client component owns the interactive explorer UI: search, filters, count, and results.
export function ExplorerPageClient() {
  // Query-string filters are the source of truth, which makes explorer links shareable.
  const filters = useFilters();
  // Filtered results are recomputed from local data whenever URL-backed filters change.
  const filteredExperiences = useExperiences({
    search: filters.search,
    category: filters.category,
    destination: filters.destination,
  });

  const destinations = useMemo(
    // Build the destination dropdown from the catalog so it stays current when data changes.
    () =>
      Array.from(new Set(experiences.map((experience) => experience.destination)))
        .sort((a, b) => a.localeCompare(b)),
    [],
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      {/* Header shows where the user is and how many catalog records currently match. */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Curated worldwide
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Explore experiences
          </h1>
        </div>
        <p className="text-sm font-medium text-slate-500">
          {filteredExperiences.length} of {experiences.length} experiences
        </p>
      </div>

      {/* SearchBar and FilterBar are controlled by URL state through useFilters. */}
      <div className="space-y-4">
        <SearchBar
          key={filters.search}
          value={filters.search}
          onChange={filters.setSearch}
        />
        <FilterBar
          category={filters.category}
          destination={filters.destination}
          destinations={destinations}
          onCategoryChange={filters.setCategory}
          onDestinationChange={filters.setDestination}
        />
      </div>

      <div className="mt-8">
        {/* Results branch switches between the shared grid and a clear-filters empty state. */}
        {filteredExperiences.length > 0 ? (
          <ExperienceGrid experiences={filteredExperiences} />
        ) : (
          <EmptyState
            title="No experiences match your filters"
            description="Try a different search term, category, or destination to keep exploring."
            actionLabel="Clear filters"
            onAction={filters.clearAll}
          />
        )}
      </div>
    </section>
  );
}
