"use client";

import { Heart } from "lucide-react";
import type { MouseEvent } from "react";

import { useFavorites } from "@/hooks/useFavorites";

// Small favorite toggle used anywhere an experience can be saved from a compact UI.
interface HeartButtonProps {
  // id is stored in FavoritesProvider rather than duplicating full experience objects.
  id: string;
  // className lets cards position this button without changing its base styling.
  className?: string;
}

export function HeartButton({ id, className = "" }: HeartButtonProps) {
  // Context keeps all heart buttons, badges, favorites page, and profile stats in sync.
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Cards are clickable links, so stop this button click from also opening the detail page.
    event.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <button
      type="button"
      // aria-label/aria-pressed expose the toggle state to assistive technology.
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      aria-pressed={active}
      onClick={handleClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition hover:scale-105 hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2 ${className}`}
    >
      {/* Filled red heart is the visual saved state; outline is unsaved. */}
      <Heart
        className={`h-5 w-5 ${active ? "fill-red-500 text-red-500" : ""}`}
        strokeWidth={2.2}
      />
    </button>
  );
}
