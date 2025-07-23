"use client";

import React from "react";
import { notFound } from "next/navigation";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { getProductBySlug, getProducts } from "@/lib/getProducts";
import { ProductCard } from "@/components/ProductCard";


interface ProductPageProps {
  params: {
    slug: string;
  };
}


export default function ProductPage({params}: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  const allProducts = getProducts();

  // If product not found, show 404 page
  if (!product) {
    notFound();
  }

  // Calculate discount only if both prices are available and priceRegular is not zero
  const discount = (product.priceRegular && product.priceCurrent && product.priceRegular > 0) 
    ? Math.round(((product.priceRegular - product.priceCurrent) / product.priceRegular) * 100)
    : 0;

  // Get related products (same team or league)
  const relatedProducts = allProducts
    .filter(p => 
      p.id !== product.id && 
      (p.team === product.team || p.league === product.league)
    )
    .slice(0, 4);

  return (
    <div className="py-8 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <Tabs aria-label="Product Images">
            {product.images.map((image, index) => (
              <Tab key={index} title={`Image ${index + 1}`}>
                <Card>
                  <CardBody className="p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={`${product.title} - Image ${index + 1}`}
                      className="w-full object-cover max-h-[500px]"
                      src={image}
                    />
                  </CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <Image
                key={index}
                shadow="sm"
                radius="lg"
                width={80}
                height={80}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover cursor-pointer"
                src={image}
              />
            ))}
          </div>

          {discount > 0 && (
            <Chip 
              color="warning" 
              variant="solid" 
              size="lg"
              className="self-start"
            >
              {discount}% OFF
            </Chip>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          {/* Jersey details */}
          <div className="flex gap-2 flex-wrap mb-4">
            <Chip color="primary" variant="flat">
              {product.team}
            </Chip>
            <Chip color="primary" variant="flat">
              {product.league}
            </Chip>
            <Chip color="default" variant="flat">
              {product.version}
            </Chip>
            <Chip color="default" variant="flat">
              {product.season}
            </Chip>
            {product.playerName && (
              <Chip color="success" variant="flat">
                Player: {product.playerName}
              </Chip>
            )}
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
              <Chip color="warning" variant="dot" size="lg">
                {product.couponCode}
              </Chip>
            )}
          </div>

          <p className="text-default-700 mb-8 text-lg">
            {product.description}
          </p>

          <Divider className="my-4" />

          <div className="mt-auto">
            <Button
              as={Link}
              href={product.affiliateUrl}
              color="warning"
              variant="solid"
              size="lg"
              className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600"
              isExternal
              showAnchorIcon
            >
              Buy on AliExpress
            </Button>

            <p className="text-default-500 text-sm mt-2">
              * Prices and availability may vary. Use coupon code for additional discount.
            </p>
          </div>
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
    </div>
  );
}
