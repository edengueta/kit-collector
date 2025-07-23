import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Chicle as FontRetro,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontRetro = FontRetro({
  subsets: ["latin"],
  variable: "--font-retro",
  weight: "400",
});
