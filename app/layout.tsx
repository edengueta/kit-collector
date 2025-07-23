import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontRetro, fontSans} from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "football jerseys, soccer jerseys, aliexpress, football, soccer, premier league, la liga, serie a, bundesliga, ligue 1, real madrid, barcelona, manchester united, liverpool, manchester city",
  authors: [
    {
      name: "KitCollector",
      url: "/",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable, fontRetro.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-4 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center py-6 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-retro ">KitCollector</span>
              </div>
              <p className="text-default-500 text-xs text-center">
                Product names, logos, and brands are property of their respective owners.
                Product and service names used are for demonstration purposes only.
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
