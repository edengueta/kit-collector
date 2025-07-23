"use client";

import { FC } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import NextLink from "next/link";

import { calculateDiscountPercentage, Product } from "@/lib/getProducts";
import { ProductDetails } from "@/components/ProductDetails";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const discount = calculateDiscountPercentage(product);

  return (
    <Card
      isPressable
      as={NextLink}
      className="w-full h-full"
      href={`/product/${product.slug}`}
      shadow="sm"
    >
      <CardBody className="p-0 overflow-hidden">
        <div className="relative">
          <Image
            alt={product.title}
            className="w-full object-cover h-[240px]"
            radius="none"
            shadow="sm"
            src={product.images[0]}
            width="100%"
          />
          {discount > 0 && (
            <Chip
              className="absolute top-2 right-2"
              color="warning"
              variant="solid"
            >
              {discount}% OFF
            </Chip>
          )}
          {/* Team badge in top left */}
          <Chip
            className="absolute top-2 left-2"
            color="default"
            variant="solid"
          >
            {product.team}
          </Chip>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <ProductDetails small product={product} />

        {/* Jersey title */}
        <h3 className="font-semibold text-lg mb-1">{product.title}</h3>

        {/* Price information */}
        <div className="flex items-center gap-2 mb-2">
          {product.priceRegular && (
            <span className="text-default-500 line-through text-sm">
              ${product.priceRegular.toFixed(2)}
            </span>
          )}
          {product.priceCurrent && (
            <span className="text-amber-400 font-semibold">
              ${product.priceCurrent.toFixed(2)}
            </span>
          )}
          {product.couponCode && (
            <Chip color="warning" size="sm" variant="dot">
              {product.couponCode}
            </Chip>
          )}
        </div>

        <Button
          className="self-end mt-2"
          color="warning"
          radius="full"
          size="sm"
          variant="flat"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
