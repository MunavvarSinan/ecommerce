"use client";

import { tv, type VariantProps } from "tailwind-variants";
import { ThemesGeneralSwitcher } from "@repo/ui/components/switchers/themes-general-switcher";
import MainNav from "@repo/ui/components/dashboard/navigation/main-nav";
import { UserNav } from "@repo/ui/components/dashboard/navigation/user-nav";
import { MobileMenu } from "@repo/ui/components/dashboard/navigation/mobile-menu"
import { usePathname } from "next/navigation";

import { userStore } from "@/lib/store/user";

// TODO: update navbar

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
interface NavMenuItem {
  title: string;
  href: string;
};

interface NavbarProps {
  border?: boolean;
  sticky?: boolean;
};

export type SiteHeaderProps = object & VariantProps<typeof NavbarStyles>;

const Navbar = ({ border = true, sticky = true }: NavbarProps): JSX.Element => {
  const pathname = usePathname();
  const { user } = userStore();
  const { id, role } = user as { id: string, role: string }
  const routes = [
    {
      href: '/admin',
      title: 'Overview',
      active: pathname === '/admin'
    },
    {
      title: "Vendors",
      href: "/admin/vendors",
      active: pathname === '/admin/vendors'
    },
    {
      title: "Stores",
      href: "/admin/stores",
      active: pathname === '/admin/stores'
    },
    {
      title: "Categories",
      href: "/admin/categories",
      active: pathname === '/admin/categories'
    },
    {
      title: "Products",
      href: "/admin/products",
      active: pathname === '/admin/products'
    },
    {
      title: "Orders",
      href: "/admin/orders",
      active: pathname === '/admin/orders'
    },
    {
      title: "Customers",
      href: "/admin/customers",
      active: pathname === '/admin/customers'
    },
    {
      title: "Settings",
      href: "/admin/settings",
      active: pathname === '/admin/settings'
    }
  ]
  return (
    <header className={NavbarStyles({ border, sticky })}>
      <nav className="container flex justify-between h-16 items-center">
        <MobileMenu MainMenuItems={routes} />
        <MainNav items={routes} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemesGeneralSwitcher />
          <UserNav userId={id} userRole={role} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
