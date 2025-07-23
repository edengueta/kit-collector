"use client";
import React, { Suspense } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/getProducts";
import NextLink from "next/link";

interface HomeProps {
  searchParams: { 
    tag?: string;
    team?: string;
    league?: string;
    minPrice?: string;
    maxPrice?: string;
    color?: string;
    season?: string;
    search?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const { 
    tag,
    team,
    league,
    minPrice,
    maxPrice,
    color,
    season,
    search
  } = searchParams;

  const products = getProducts();

  // Extract unique values for filter options
  const allTeams = Array.from(new Set(products.map(product => product.team))).sort();
  const allLeagues = Array.from(new Set(products.map(product => product.league))).sort();
  const allColors = Array.from(new Set(products.map(product => product.color))).sort();
  const allSeasons = Array.from(new Set(products.map(product => product.season))).sort();

  // Price range for filtering
  const priceRange = minPrice && maxPrice ? {
    min: parseFloat(minPrice),
    max: parseFloat(maxPrice)
  } : undefined;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div className="text-center">
        {search && (
          <div className="mt-4 flex justify-center">
            <div className="bg-warning-100 text-amber-600 px-4 py-2 rounded-full flex items-center">
              <span>Search results for: <strong>{search}</strong></span>
              <Button 
                as={NextLink}
                href="/"
                size="sm"
                variant="light"
                className="ml-2"
                aria-label="Clear search"
              >
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Filter section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Team filter */}
        <div>
          <Select
            label="Team"
            placeholder="All Teams"
            className="w-full"
            selectedKeys={team ? [team] : []}
          >
            {allTeams.map((teamName) => (
              <SelectItem key={teamName}>
                {teamName}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* League filter */}
        <div>
          <Select 
            label="League" 
            placeholder="All Leagues"
            className="w-full"
            selectedKeys={league ? [league] : []}
          >
            {allLeagues.map((leagueName) => (
              <SelectItem key={leagueName}>
                {leagueName}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Color filter */}
        <div>
          <Select 
            label="Color" 
            placeholder="All Colors"
            className="w-full"
            selectedKeys={color ? [color] : []}
          >
            {allColors.map((colorName) => (
              <SelectItem key={colorName}>
                {colorName}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Season filter */}
        <div>
          <Select 
            label="Season" 
            placeholder="All Seasons"
            className="w-full"
            selectedKeys={season ? [season] : []}
          >
            {allSeasons.map((seasonName) => (
              <SelectItem key={seasonName}>
                {seasonName}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Version filter */}
        <div>
          <Select 
            label="Version" 
            placeholder="All Versions"
            className="w-full"
          >
            <SelectItem key="Home">Home</SelectItem>
            <SelectItem key="Away">Away</SelectItem>
            <SelectItem key="Third">Third</SelectItem>
            <SelectItem key="Retro">Retro</SelectItem>
          </Select>
        </div>
      </div>

      {/* Product grid */}
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid 
          products={products} 
          tag={tag}
          team={team}
          league={league}
          priceRange={priceRange}
          color={color}
          season={season}
          search={search}
        />
      </Suspense>
    </section>
  );
}
