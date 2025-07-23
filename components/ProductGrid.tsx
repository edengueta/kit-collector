"use client";

import { FC } from "react";
import { Product } from "@/lib/getProducts";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  tag?: string;
  team?: string;
  league?: string;
  priceRange?: { min: number; max: number };
  color?: string;
  season?: string;
  search?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ 
  products, 
  tag,
  team,
  league,
  priceRange,
  color,
  season,
  search
}) => {
  // Apply all filters
  let filteredProducts = products;

  // Filter by tag if provided
  if (tag) {
    filteredProducts = filteredProducts.filter((product) => 
      product.tags.includes(tag)
    );
  }

  // Filter by team if provided
  if (team) {
    filteredProducts = filteredProducts.filter((product) => 
      product.team === team
    );
  }

  // Filter by league if provided
  if (league) {
    filteredProducts = filteredProducts.filter((product) => 
      product.league === league
    );
  }

  // Filter by price range if provided
  if (priceRange) {
    filteredProducts = filteredProducts.filter((product) => 
      product.priceCurrent >= priceRange.min && 
      product.priceCurrent <= priceRange.max
    );
  }

  // Filter by color if provided
  if (color) {
    filteredProducts = filteredProducts.filter((product) => 
      product.color === color
    );
  }

  // Filter by season if provided
  if (season) {
    filteredProducts = filteredProducts.filter((product) => 
      product.season === season
    );
  }

  // Filter by search term if provided
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter((product) => 
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.team.toLowerCase().includes(searchLower) ||
      product.league.toLowerCase().includes(searchLower) ||
      product.season.toLowerCase().includes(searchLower) ||
      product.version.toLowerCase().includes(searchLower) ||
      product.color.toLowerCase().includes(searchLower) ||
      (product.playerName && product.playerName.toLowerCase().includes(searchLower)) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-default-500">
            No products match your selected filters. Try adjusting your criteria.
          </p>
        </div>
      )}
    </div>
  );
};
