import bannersData from "../data/banners.json";

import { Banner } from "@/components/Banner";

// Get all banners
export function getBanners(): Banner[] {
  return bannersData as Banner[];
}

// Get a single banner by id
export function getBannerById(id: string): Banner | undefined {
  const banners = getBanners();

  return banners.find((banner) => banner.id === id);
}
