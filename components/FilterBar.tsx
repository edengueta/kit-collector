"use client";

import React from "react";
import { Select, SelectItem, SelectSection } from "@heroui/select";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

import { useFilters } from "@/config/useFilters";

interface FilterBarProps {
  products: any[];
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  products,
  className = "",
}) => {
  const router = useRouter();
  const filterParams = useFilters();
  const { team, league, minPrice, maxPrice, color, season, search, version } = filterParams;
  // Function to update URL with filter value
  const updateFilter = (filterName: string, value: string | null) => {
    // Create a new URLSearchParams object with the current search parameters
    const params = new URLSearchParams();

    // Add all current search parameters
    Object.entries(filterParams).forEach(([key, val]) => {
      if (key !== filterName && val) {
        params.set(key, val);
      }
    });

    // Add or remove the new filter value
    if (value) {
      params.set(filterName, value);
    }

    // Navigate to the new URL
    router.push(`/?${params.toString()}`);
  };

  // Generic handler for selection changes
  const handleSelectionChange = (
    filterName: string,
    keys: "all" | Set<string>,
    allKey: string,
  ) => {
    // Check if keys is "all"
    if (keys === "all") {
      updateFilter(filterName, null);

      return;
    }

    // Handle Set-like object with size property
    const keysArray = Array.from(keys);
    const selectedKey = keysArray.length > 0 ? keysArray[0].toString() : null;

    // If "All X" is selected, clear the filter
    if (selectedKey === allKey) {
      updateFilter(filterName, null);
    } else {
      updateFilter(filterName, selectedKey);
    }
  };

  // Extract unique values for filter options
  const allTeams = Array.from(
    new Set(products.map((product) => product.team)),
  ).sort();
  const allLeagues = Array.from(
    new Set(products.map((product) => product.league)),
  ).sort();
  const allColors = Array.from(
    new Set(products.map((product) => product.color)),
  ).sort();
  const allSeasons = Array.from(
    new Set(products.map((product) => product.season)),
  ).sort();

  return (
    <div className={`${className}`}>
      {/* Clear filters button - shown only when filters are active */}
      {(team ||
        league ||
        color ||
        season ||
        version ||
        minPrice ||
        maxPrice) && (
        <div className="flex justify-end mb-2">
          <Button
            className="text-sm"
            color="default"
            size="sm"
            variant="flat"
            onClick={() =>
              router.push("/" + (search ? `?search=${search}` : ""))
            }
          >
            Clear All Filters
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Team filter */}
        <div>
          <Select
            className="w-full"
            label="Team"
            placeholder="All Teams"
            selectedKeys={team ? [team] : []}
            onSelectionChange={(keys) =>
              handleSelectionChange("team", keys, "all-teams")
            }
          >
            <SelectItem key="all-teams">All Teams</SelectItem>
            <SelectSection>
              {allTeams.map((teamName) => (
                <SelectItem key={teamName}>{teamName}</SelectItem>
              ))}
            </SelectSection>
          </Select>
        </div>

        {/* League filter */}
        <div>
          <Select
            className="w-full"
            label="League"
            placeholder="All Leagues"
            selectedKeys={league ? [league] : []}
            onSelectionChange={(keys) =>
              handleSelectionChange("league", keys, "all-leagues")
            }
          >
            <SelectItem key="all-leagues">All Leagues</SelectItem>
            <SelectSection>
              {allLeagues.map((leagueName) => (
                <SelectItem key={leagueName}>{leagueName}</SelectItem>
              ))}
            </SelectSection>
          </Select>
        </div>

        {/* Color filter */}
        <div>
          <Select
            className="w-full"
            label="Color"
            placeholder="All Colors"
            selectedKeys={color ? [color] : []}
            onSelectionChange={(keys) =>
              handleSelectionChange("color", keys, "all-colors")
            }
          >
            <SelectItem key="all-colors">All Colors</SelectItem>
            <SelectSection>
              {allColors.map((colorName) => (
                <SelectItem key={colorName}>{colorName}</SelectItem>
              ))}
            </SelectSection>
          </Select>
        </div>

        {/* Season filter */}
        <div>
          <Select
            className="w-full"
            label="Season"
            placeholder="All Seasons"
            selectedKeys={season ? [season] : []}
            onSelectionChange={(keys) =>
              handleSelectionChange("season", keys, "all-seasons")
            }
          >
            <SelectItem key="all-seasons">All Seasons</SelectItem>
            <SelectSection>
              {allSeasons.map((seasonName) => (
                <SelectItem key={seasonName}>{seasonName}</SelectItem>
              ))}
            </SelectSection>
          </Select>
        </div>

        {/* Version filter */}
        <div>
          <Select
            className="w-full"
            label="Version"
            placeholder="All Versions"
            selectedKeys={version ? [version] : []}
            onSelectionChange={(keys) =>
              handleSelectionChange("version", keys, "all-versions")
            }
          >
            <SelectItem key="all-versions">All Versions</SelectItem>
            <SelectItem key="Home">Home</SelectItem>
            <SelectItem key="Away">Away</SelectItem>
            <SelectItem key="Third">Third</SelectItem>
            <SelectItem key="Retro">Retro</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  );
};
