"use client";

import { useMemo } from "react";

import { experiences } from "@/data/experiences";
import type { Experience } from "@/types/experience";

// Filters are intentionally strings because they come directly from URL search params.
interface ExperienceFilters {
  search: string;
  category: string;
  destination: string;
}

function matchesSearch(experience: Experience, searchTerm: string) {
  // Regex allows flexible title searches; invalid regex text falls back to plain matching.
  if (!searchTerm) {
    // Empty search should not exclude any records.
    return true;
  }

  try {
    // A valid regex gives a little extra power during demo searches.
    return new RegExp(searchTerm, "i").test(experience.title);
  } catch {
    // Plain text fallback prevents invalid regex characters from breaking filtering.
    return experience.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

function matchesDestination(experience: Experience, destination: string) {
  // Destination filters support either an exact city/country or a country-only suffix.
  if (!destination) {
    // Empty destination means "All destinations."
    return true;
  }

  if (experience.destination === destination) {
    // Full dropdown values match exact "City, Country" strings.
    return true;
  }

  if (!destination.includes(",")) {
    // Country-only values can match any destination ending in that country.
    return experience.destination
      .toLowerCase()
      .endsWith(`, ${destination.toLowerCase()}`);
  }

  return false;
}

export function useExperiences(filters: ExperienceFilters) {
  // Destructure once so the memo dependency list stays explicit.
  const { search, category, destination } = filters;

  return useMemo(() => {
    // All catalog filtering is derived from the current URL-backed filter state.
    const searchTerm = search.trim();

    return experiences.filter((experience) => {
      // Category is an exact-match filter because categories are a fixed union type.
      const categoryMatch = category ? experience.category === category : true;
      // Destination matching is delegated because it has exact and country-only behavior.
      const destinationMatch = matchesDestination(experience, destination);

      // Search, category, and destination must all pass for an experience to display.
      return (
        matchesSearch(experience, searchTerm) &&
        categoryMatch &&
        destinationMatch
      );
    });
  }, [search, category, destination]);
}
