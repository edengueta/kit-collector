import { useSearchParams } from "next/navigation";

import { SearchParams } from "@/types/filters";

export const useFilters = () => {
  const searchParams = useSearchParams();
  const get = (key: string) => searchParams.get(key) ?? undefined;

  return {
    team: get("team"),
    league: get("league"),
    color: get("color"),
    season: get("season"),
    version: get("version"),
    search: get("search"),
    minPrice: get("minPrice"),
    maxPrice: get("maxPrice"),
    tag: get("tag"),
  } as SearchParams;
};
