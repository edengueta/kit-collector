import productsData from "../data/products.json";

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[]; // Multiple images
  affiliateUrl: string;
  tags: string[];
  priceRegular?: number;
  priceCurrent?: number;
  couponCode?: string;
  // Football jersey specific fields
  team?: string;
  league?: string;
  season?: string;
  playerName?: string; // Optional
  version?: string; // home, away, third, retro, etc.
  color?: string; // Base color of the jersey
}

// Get all products
export function getProducts(): Product[] {
  return productsData as Product[];
}

// Get a single product by slug
export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();

  return products.find((product) => product.slug === slug);
}
