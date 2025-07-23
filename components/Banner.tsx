"use client";

import { FC } from "react";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import NextLink from "next/link";

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  affiliateUrl?: string;
  productSlug?: string;
  ribbon?: string;
}

interface BannerProps {
  banner: Banner;
  className?: string;
}

export const Banner: FC<BannerProps> = ({ banner, className }) => {
  const isExternalLink = !!banner.affiliateUrl;
  const href = isExternalLink ? banner.affiliateUrl! : `/product/${banner.productSlug}`;

  return (
    <Card 
      className={`w-full ${className || ''}`}
      shadow="sm"
      isPressable
      as={NextLink}
      href={href}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
    >
      <CardBody className="p-0 overflow-hidden">
        <div className="relative">
          <Image
            shadow="sm"
            radius="none"
            width="100%"
            alt={banner.title}
            className="w-full object-cover h-[160px]"
            src={banner.image}
          />
          {banner.ribbon && (
            <div className="absolute top-0 right-0 z-30 overflow-hidden w-[150px] h-[150px]">
              <div className="absolute top-[35px] right-[-55px] bg-rose-600 text-white font-bold py-1 px-8 shadow-xl transform rotate-[45deg] text-center text-sm w-[200px]">
                {banner.ribbon}
              </div>
            </div>
          )}
          <div style={{height: "100%"}} className="flex flex-col justify-end absolute z-20 bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <h3 className="font-bold text-xl mb-1">{banner.title}</h3>
            <p className="text-sm mb-2 line-clamp-2">{banner.description}</p>
            <Button
              color="warning"
              variant="solid"
              radius="full"
              size="sm"
              className="self-start"
            >
              {isExternalLink ? "Shop Now" : "View Details"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
