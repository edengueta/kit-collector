"use client";

import { FC } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import NextLink from "next/link";
import { Product } from "@/lib/getProducts";
import {productConfig} from "@/config/products";


interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const discount = (product.priceRegular && product.priceCurrent) ?
      (Math.round((product.priceRegular - product.priceCurrent) / product.priceRegular) * 100) : 0;

  // @ts-ignore
  // @ts-ignore
  return (
    <Card 
      className="w-full h-full"
      shadow="sm"
      isPressable
      as={NextLink}
      href={`/product/${product.slug}`}
    >
      <CardBody className="p-0 overflow-hidden">
        <div className="relative">
          <Image
            shadow="sm"
            radius="none"
            width="100%"
            alt={product.title}
            className="w-full object-cover h-[240px]"
            src={product.images[0]}
          />
          {discount > 0 && (
            <Chip 
              color="warning" 
              variant="solid" 
              className="absolute top-2 right-2"
            >
              {discount}% OFF
            </Chip>
          )}
          {/* Team badge in top left */}
          <Chip 
            color="default" 
            variant="solid" 
            className="absolute top-2 left-2"
          >
            {product.team}
          </Chip>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start">

        {/* Jersey details */}
        <div className="flex gap-1 flex-wrap mb-1">
          {productConfig.primaryChips.map((c) => (
              <Chip key={product[c]} size="sm" variant="flat" color="primary">
                {product[c]}
              </Chip>
          ))}
          {productConfig.chips.map(c => (
              <Chip key={product[c]} size="sm" variant="flat" color="default">
                {product[c]}
              </Chip>
          ))}
        </div>

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
            <Chip size="sm" color="warning" variant="dot">
              {product.couponCode}
            </Chip>
          )}
        </div>

        {/* Player name if available */}
        {productConfig.showPlayerName && product.playerName && (
          <div className="flex items-center gap-2 mb-2">
            <Chip size="sm" color="success" variant="flat">
              {product.playerName}
            </Chip>
          </div>
        )}

        <Button
          color="warning"
          variant="flat"
          radius="full"
          size="sm"
          className="self-end mt-2"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
