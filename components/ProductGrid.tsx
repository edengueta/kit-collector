"use client";

import { FC, useState } from "react";
import { Product } from "@/lib/getProducts";
import { ProductCard } from "./ProductCard";
import { LoadMoreButton } from "./LoadMoreButton";
import { siteConfig } from "@/config/site";
import { Banner } from "./Banner";
import { getBanners } from "@/lib/getBanners";

interface ProductGridProps {
  products: Product[];
  tag?: string;
  team?: string;
  league?: string;
  priceRange?: { min: number; max: number };
  color?: string;
  season?: string;
  search?: string;
  version?: string;
  itemsPerPage?: number;
}

export const ProductGrid: FC<ProductGridProps> = ({ 
  products, 
  tag,
  team,
  league,
  priceRange,
  color,
  season,
  search,
  version,
  itemsPerPage = siteConfig.itemsPerPage
}) => {
  const [displayCount, setDisplayCount] = useState<number>(itemsPerPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        product.priceCurrent &&
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

  // Filter by version if provided
  if (version) {
    filteredProducts = filteredProducts.filter((product) => 
      product.version === version
    );
  }

  // Filter by search term if provided
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter((product) => 
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.team?.toLowerCase().includes(searchLower) ||
      product.league?.toLowerCase().includes(searchLower) ||
      product.season?.toLowerCase().includes(searchLower) ||
      product.version?.toLowerCase().includes(searchLower) ||
      product.color?.toLowerCase().includes(searchLower) ||
      (product.playerName && product.playerName.toLowerCase().includes(searchLower)) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount(prev => prev + itemsPerPage);
      setIsLoading(false);
    }, 500);
  };

  // Display only the number of products specified by displayCount
  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMoreProducts = displayedProducts.length < filteredProducts.length;

  // Get banners for display
  const banners = siteConfig.showBannerInGrid ? getBanners() : [];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          displayedProducts.map((product, index) => {
            // Insert banner after every bannerInterval items
            const shouldShowBanner = siteConfig.showBannerInGrid &&
              banners.length > 0 &&
              (index + 1) % siteConfig.bannerInterval === 0 &&
              index > 0;

            // Select a banner using a rotating pattern
            const bannerIndex = Math.floor(index / siteConfig.bannerInterval) % banners.length;

            return (
              <>
                <div key={product.id} className="w-full">
                  <ProductCard product={product} />
                </div>

                {shouldShowBanner && (
                  <div key={`banner-${index}`} className="col-span-full w-full my-4">
                    <Banner banner={banners[bannerIndex]} />
                  </div>
                )}
              </>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-default-500">
              No products match your selected filters. Try adjusting your criteria.
            </p>
          </div>
        )}
      </div>

      {filteredProducts.length > itemsPerPage && (
        <LoadMoreButton
          onLoadMore={handleLoadMore}
          hasMore={hasMoreProducts}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
