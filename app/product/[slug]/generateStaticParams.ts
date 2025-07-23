import { getProducts } from "@/lib/getProducts";

// Generate static params for all products
export async function generateStaticParams() {
  const products = getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
