"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import { IconSearch } from "@tabler/icons-react";
import NextImage from "next/image";
import { useSearchParams } from "next/navigation";

import logo from "../public/images/logo-kc.png";

import { ThemeSwitch } from "@/components/theme-switch";
import { FilterBar } from "@/components/FilterBar";
import { getProducts } from "@/lib/getProducts";

export const Navbar = () => {
  const searchParams = useSearchParams();
  const products = getProducts();

  // Convert searchParams to an object for FilterBar
  const searchParamsObj = Object.fromEntries(searchParams.entries());

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;

    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const searchInput = (
    <form className="w-full flex" onSubmit={handleSearch}>
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100 rounded-r-none",
          input: "text-sm",
        }}
        labelPlacement="outside"
        name="search"
        placeholder="Search jerseys..."
        startContent={
          <IconSearch className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
      <Button
        aria-label="Search"
        className="rounded-l-none"
        color="warning"
        type="submit"
      >
        Search
      </Button>
    </form>
  );

  return (
    <HeroUINavbar maxWidth="xl">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <NextImage
              alt="KitCollector Logo"
              className="p-1"
              height={50}
              src={logo}
            />
            <p className="font-retro text-2xl">KitCollector</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mt-2 px-2">
          {searchInput}
          <div className="mt-4 mb-2">
            <h3 className="text-lg font-semibold mb-2">Filters</h3>
            <FilterBar
              className="md:hidden"
              products={products}
              searchParams={searchParamsObj}
            />
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
