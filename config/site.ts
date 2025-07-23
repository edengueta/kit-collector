export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "KitCollector",
  description: "Discover the best football jerseys from AliExpress at unbeatable prices.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "New",
      href: "/?tag=2024/25",
    },
    {
      label: "Trend",
      href: "/?sort=popular",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "New",
      href: "/?tag=2024/25",
    },
    {
      label: "Trend",
      href: "/?sort=popular",
    },
  ],
  itemsPerPage: 12,
  showBannerInGrid: true,
  bannerInterval: 16
};
