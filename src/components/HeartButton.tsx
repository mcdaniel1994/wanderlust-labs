"use client";

import { Heart } from "lucide-react";
import type { MouseEvent } from "react";

import { useFavorites } from "@/hooks/useFavorites";

interface HeartButtonProps {
  id: string;
  className?: string;
}

export function HeartButton({ id, className = "" }: HeartButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <button
      type="button"
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      aria-pressed={active}
      onClick={handleClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition hover:scale-105 hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2 ${className}`}
    >
      <Heart
        className={`h-5 w-5 ${active ? "fill-red-500 text-red-500" : ""}`}
        strokeWidth={2.2}
      />
    </button>
  );
}
