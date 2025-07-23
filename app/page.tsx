"use client";
import React, { Suspense } from "react";
import { Button } from "@heroui/button";
import NextLink from "next/link";

import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/getProducts";
import { FilterBar } from "@/components/FilterBar";
import { SearchParams } from "@/types/filters";
import { useFilters } from "@/config/useFilters";
interface HomeProps {
  searchParams: SearchParams;
}

export default function Home({ searchParams }: HomeProps) {
  const products = getProducts();
  const { search } = useFilters();

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div className="text-center">
        {search && (
          <div className="mt-4 flex justify-center">
            <div className="bg-warning-100 text-amber-600 px-4 py-2 rounded-full flex items-center">
              <span>
                Search results for: <strong>{search}</strong>
              </span>
              <Button
                aria-label="Clear search"
                as={NextLink}
                className="ml-2"
                href="/"
                size="sm"
                variant="light"
              >
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Filter section - visible only on desktop */}
      <div className="hidden md:block mb-6">
        <FilterBar products={products} />
      </div>

      {/* Product grid */}
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid products={products} />
      </Suspense>
    </section>
  );
}
