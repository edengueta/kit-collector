import { Product } from "@/lib/getProducts";

export type ProductField = keyof Product;

export const productConfig: {
  primaryChips: ProductField[];
  chips: ProductField[];
  showPlayerName: boolean;
} = {
  showPlayerName: false,
  primaryChips: ["team", "league"],
  chips: [
    "season",
    "version",
    "color",
    // "playerName"
  ],
};
