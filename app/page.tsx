"use client";
import React, { Suspense } from "react";
import { Button } from "@heroui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/getProducts";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { FilterBar } from "@/components/FilterBar";

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
    version?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const router = useRouter();
  const { 
    tag,
    team,
    league,
    minPrice,
    maxPrice,
    color,
    season,
    search,
    version
  } = searchParams;

  const products = getProducts();

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

      {/* Filter section - visible only on desktop */}
      <div className="hidden md:block mb-6">
        <FilterBar 
          searchParams={searchParams} 
          products={products} 
        />
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
          version={version}
        />
      </Suspense>
    </section>
  );
}
