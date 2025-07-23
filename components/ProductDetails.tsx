import { Chip } from "@heroui/chip";
import React from "react";

import { productConfig } from "@/config/products";
import { Product } from "@/lib/getProducts";

interface ProductDetailsProps {
  small?: boolean;
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  small,
  product,
}) => {
  return (
    <div className={`flex flex-wrap ${small ? "gap-1 mb-1" : "gap-2 mb-4"}`}>
      {productConfig.showPlayerName && product.playerName && (
        <Chip color="success" size={small ? "sm" : "md"} variant="flat">
          {product.playerName}
        </Chip>
      )}
      {productConfig.primaryChips
        .filter((key) => !!product[key])
        .map((key) => (
          <Chip
            key={product[key as keyof Product] as string | number}
            color="primary"
            size={small ? "sm" : "md"}
            variant="flat"
          >
            {product[key]}
          </Chip>
        ))}
      {productConfig.chips
        .filter((key) => product.hasOwnProperty(key))
        .map((key) => (
          <Chip
            key={product[key as keyof Product] as string | number}
            color="default"
            size={small ? "sm" : "md"}
            variant="flat"
          >
            {product[key]}
          </Chip>
        ))}
    </div>
  );
};
