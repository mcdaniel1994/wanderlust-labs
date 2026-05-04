"use client";

import { useMemo } from "react";

import { experiences } from "@/data/experiences";
import type { Experience } from "@/types/experience";

interface ExperienceFilters {
  search: string;
  category: string;
  destination: string;
}

function matchesSearch(experience: Experience, searchTerm: string) {
  if (!searchTerm) {
    return true;
  }

  try {
    return new RegExp(searchTerm, "i").test(experience.title);
  } catch {
    return experience.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

function matchesDestination(experience: Experience, destination: string) {
  if (!destination) {
    return true;
  }

  if (experience.destination === destination) {
    return true;
  }

  if (!destination.includes(",")) {
    return experience.destination
      .toLowerCase()
      .endsWith(`, ${destination.toLowerCase()}`);
  }

  return false;
}

export function useExperiences(filters: ExperienceFilters) {
  const { search, category, destination } = filters;

  return useMemo(() => {
    const searchTerm = search.trim();

    return experiences.filter((experience) => {
      const categoryMatch = category ? experience.category === category : true;
      const destinationMatch = matchesDestination(experience, destination);

      return (
        matchesSearch(experience, searchTerm) &&
        categoryMatch &&
        destinationMatch
      );
    });
  }, [search, category, destination]);
}
