"use client";

import { tv, type VariantProps } from "tailwind-variants";

import MainNav from "@/components/dashboard/navigation/main-nav";
import { UserNav } from "@/components/dashboard/navigation/user-nav";
import { ThemesGeneralSwitcher } from "@/components/switchers/themes-general-switcher";

import { siteConfig } from "@/config/site-config";

import { MobileMenu } from "./mobile-menu";

const NavbarStyles = tv({
  base: "w-full border-b border-transparent bg-background/95 backdrop-blur-sm",
  variants: {
    border: {
      true: "border-border",
    },
    sticky: {
      true: "sticky top-0 z-40",
    },
    animated: {
      true: "animate-in fade-in slide-in-from-top-full duration-slow",
    },
  },
});

export type SiteHeaderProps = {} & VariantProps<typeof NavbarStyles>;

const Navbar = ({ border = true, sticky = true }): JSX.Element => {
  return (
    <header className={NavbarStyles({ border, sticky })}>
      {/* <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemesGeneralSwitcher />
                    <UserNav />
                </div>
            </div> */}
      <nav className="container flex justify-between h-16 items-center">
        <MobileMenu MainMenuItems={siteConfig.mainNav} />
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemesGeneralSwitcher />
          <UserNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
