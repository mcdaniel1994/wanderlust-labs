"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type FilterKey = "search" | "category" | "destination";

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsString = searchParams.toString();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const destination = searchParams.get("destination") ?? "";

  const replaceUrl = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const updateParam = useCallback(
    (key: FilterKey, value: string) => {
      const params = new URLSearchParams(paramsString);
      const cleanValue = value.trim();

      if (!cleanValue) {
        params.delete(key);
      } else {
        params.set(key, cleanValue);
      }

      replaceUrl(params);
    },
    [paramsString, replaceUrl],
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

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
