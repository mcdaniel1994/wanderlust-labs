"use client";

import { useContext } from "react";

import { FavoritesContext } from "@/components/FavoritesProvider";

// Small hook wrapper gives components a clean API and hides raw React context access.
export function useFavorites() {
  // The provider is mounted in RootLayout, so every route should have access.
  const context = useContext(FavoritesContext);

  // Fail fast if a page/component is moved outside RootLayout's FavoritesProvider.
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  // Consumers receive favorites, count, isFavorite, and toggleFavorite from the provider.
  return context;
}
