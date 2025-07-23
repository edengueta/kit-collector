"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";

import { getProductBySlug, getProducts } from "@/lib/getProducts";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { productConfig } from "@/config/products";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  const allProducts = getProducts();
  const [selectedImage, setSelectedImage] = useState<string>("");

  // If product not found, show 404 page
  if (!product) {
    notFound();
  }

  // Calculate discount only if both prices are available and priceRegular is not zero
  const discount =
    product.priceRegular && product.priceCurrent && product.priceRegular > 0
      ? Math.round(
          ((product.priceRegular - product.priceCurrent) /
            product.priceRegular) *
            100,
        )
      : 0;

  // Get related products (same team or league)
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.team === product.team || p.league === product.league),
    )
    .slice(0, 4);

  // Get other products (excluding current product and related products)
  const otherProducts = allProducts.filter(
    (p) => p.id !== product.id && !relatedProducts.some((rp) => rp.id === p.id),
  );

  return (
    <div className="py-8 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <Card>
            <CardBody className="p-0">
              <Image
                alt={`${product.title} - Main Image`}
                className="w-full object-cover max-h-[500px]"
                radius="lg"
                shadow="sm"
                src={selectedImage || product.images[0]}
                width="100%"
              />
            </CardBody>
          </Card>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.slice(0, 4).map((image, index) => (
              <Image
                key={index}
                alt={`Thumbnail ${index + 1}`}
                className={`object-cover cursor-pointer transition-all ${selectedImage === image ? "ring-2 ring-primary" : ""}`}
                height={80}
                radius="lg"
                shadow="sm"
                src={image}
                width={80}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

          {discount > 0 && (
            <Chip
              className="self-start"
              color="warning"
              size="lg"
              variant="solid"
            >
              {discount}% OFF
            </Chip>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="my-3">
            <Button
              isExternal
              showAnchorIcon
              as={Link}
              className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-00"
              href={product.affiliateUrl}
              size="lg"
              variant="solid"
            >
              Buy on AliExpress
            </Button>
          </div>

          {/*<p className="text-default-500 text-sm mt-2">*/}
          {/*  * Prices and availability may vary. Use coupon code for additional discount.*/}
          {/*</p>*/}

          {/* Jersey details */}
          <div className="flex gap-2 flex-wrap mb-4">
            {productConfig.showPlayerName && product.playerName && (
              <Chip color="success" variant="flat">
                {product.playerName}
              </Chip>
            )}
            {productConfig.primaryChips.map((c: any) => (
              <Chip key={product[c]} color="primary" variant="flat">
                {product[c]}
              </Chip>
            ))}
            {productConfig.chips.map((c) => (
              <Chip key={product[c]} color="default" variant="flat">
                {product[c]}
              </Chip>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            {product.priceRegular && (
              <span className="text-default-500 line-through text-lg">
                ${product.priceRegular.toFixed(2)}
              </span>
            )}
            {product.priceCurrent && (
              <span className="text-amber-400 font-bold text-2xl">
                ${product.priceCurrent.toFixed(2)}
              </span>
            )}
            {product.couponCode && (
              <Chip color="warning" size="lg" variant="dot">
                {product.couponCode}
              </Chip>
            )}
          </div>

          <p className="text-default-700 mb-8 text-lg">{product.description}</p>

          <Divider className="my-4" />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Jerseys</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="w-full">
                <ProductCard product={relatedProduct} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Products */}
      {otherProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <ProductGrid itemsPerPage={10} products={otherProducts} />
        </div>
      )}
    </div>
  );
}
