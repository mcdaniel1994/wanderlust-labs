"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Public contract for the favorites state shared across the app.
export interface FavoritesContextValue {
  // favorites stores ids only so the catalog remains the single source of record details.
  favorites: string[];
  // Components use helpers instead of reaching into state shape directly.
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  // count saves consumers from repeatedly reading favorites.length.
  count: number;
}

// null default lets useFavorites throw a clear error if the provider is missing.
export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Session-only favorite ids power the MVP; refreshing the page intentionally clears them.
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = useCallback((id: string) => {
    // Toggle keeps the public API small for cards, detail pages, navbar badges, and profile stats.
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }, []);

  // Read helper keeps favorite checks readable in buttons and detail pages.
  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const value = useMemo(
    // Memoize the context value so consumers do not re-render from a new object every render.
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      count: favorites.length,
    }),
    [favorites, isFavorite, toggleFavorite],
  );

  return (
    // Every descendant can read/write favorites through useFavorites.
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
