"use client";

import { EmptyState } from "@/components/EmptyState";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  // Favorites context provides ids and the live count shown in the page badge.
  const { favorites, count } = useFavorites();
  // Favorites store ids only; this resolves those ids back into full experience cards.
  const favoriteExperiences = favorites
    .map((id) => experiences.find((experience) => experience.id === id))
    // The type guard removes any stale ids if the local catalog changes later.
    .filter((experience): experience is (typeof experiences)[number] =>
      Boolean(experience),
    );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      {/* Page header keeps the saved count visible even before the grid. */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              My Favorites
            </h1>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              {count} saved
            </span>
          </div>
          <p className="mt-2 text-base text-slate-500">
            Your saved experiences
          </p>
        </div>
      </div>

      {/* Saved cards show when present; otherwise the reusable empty state sends users exploring. */}
      {favoriteExperiences.length > 0 ? (
        <ExperienceGrid experiences={favoriteExperiences} />
      ) : (
        <EmptyState
          title="Find more to love"
          description="Explore new places and save your favorites"
          actionLabel="Explore experiences"
          actionHref="/experiences"
        />
      )}
    </section>
  );
}
