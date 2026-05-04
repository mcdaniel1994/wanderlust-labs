"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type FilterKey = "search" | "category" | "destination";

// Keeps explorer filters in the URL so refreshes, browser history, and shared links work.
export function useFilters() {
  // Router/pathname are used together to rewrite the current page without navigating away.
  const router = useRouter();
  const pathname = usePathname();
  // searchParams is the live App Router view of the current query string.
  const searchParams = useSearchParams();

  // Store the serialized params so callbacks can safely clone the latest query string.
  const paramsString = searchParams.toString();

  // These three values are the filter state consumed by ExplorerPageClient.
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const destination = searchParams.get("destination") ?? "";

  // Central URL writer used by every filter setter.
  const replaceUrl = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      // replace avoids filling browser history with every filter/search change.
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  // Shared param updater keeps search/category/destination behavior consistent.
  const updateParam = useCallback(
    (key: FilterKey, value: string) => {
      const params = new URLSearchParams(paramsString);
      const cleanValue = value.trim();

      // Empty values remove the key entirely, keeping URLs clean.
      if (!cleanValue) {
        params.delete(key);
      } else {
        params.set(key, cleanValue);
      }

      replaceUrl(params);
    },
    [paramsString, replaceUrl],
  );

  // Clear means remove every explorer filter and leave the user on the same route.
  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  // Small named setters make component props read naturally in FilterBar/SearchBar.
  const setSearch = useCallback(
    (value: string) => updateParam("search", value),
    [updateParam],
  );

  const setCategory = useCallback(
    (value: string) => updateParam("category", value),
    [updateParam],
  );

  const setDestination = useCallback(
    (value: string) => updateParam("destination", value),
    [updateParam],
  );

  // Stable object return helps child components avoid work when values did not change.
  return useMemo(
    () => ({
      search,
      category,
      destination,
      setSearch,
      setCategory,
      setDestination,
      clearAll,
    }),
    [
      search,
      category,
      destination,
      setSearch,
      setCategory,
      setDestination,
      clearAll,
    ],
  );
}
