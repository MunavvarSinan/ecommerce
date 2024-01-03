"use client";

import { useSuspenseQuery } from "@apollo/client";
import { tv, type VariantProps } from "tailwind-variants";
import { ThemesGeneralSwitcher } from "@repo/ui/components/switchers/themes-general-switcher";
import MainNav from "@repo/ui/components/dashboard/navigation/main-nav";
import { UserNav } from "@repo/ui/components/dashboard/navigation/user-nav";
import { MobileMenu } from "@repo/ui/components/dashboard/navigation/mobile-menu"
import { useParams, usePathname } from "next/navigation";

import StoreSwitcher from "@/components/switchers/store-switcher";
import { GET_ALL_STORES } from "@/lib/graphql/query";
import { userStore } from "@/lib/store/user";



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


interface NavbarProps {
  border?: boolean;
  sticky?: boolean;
};

export type SiteHeaderProps = object & VariantProps<typeof NavbarStyles>;
interface StoreData {
  data: {
    getAllStores: {
      id: string;
      name: string;
      slug: string;
      description: string;
    }[];
  }
}

const Navbar = ({ border = true, sticky = true }: NavbarProps): JSX.Element => {
  const pathname = usePathname();
  const { storeId }: { storeId: string } = useParams();
  const { user } = userStore();
  const { id, role } = user as { id: string, role: string }
  const { data } = useSuspenseQuery(GET_ALL_STORES) as StoreData
  const routes = [
    {
      href: `/vendor/${storeId}`,
      title: 'Overview',
      active: pathname === `/vendor/${storeId}`
    },
    {
      href: `/vendor/${storeId}/products`,
      title: "Products",
      active: pathname === `/vendor/${storeId}/products`
    },
    {
      href: `/vendor/${storeId}/settings`,
      title: "Settings",
      active: pathname === `/vendor/${storeId}/settings`
    }
  ]

  return (
    <header className={NavbarStyles({ border, sticky })}>
      <nav className="container flex justify-between h-16 items-center">
        <MobileMenu MainMenuItems={routes} dashboardName="Vendor Dashboard" />
        <MainNav dashboardName="Vendor Dashboard" items={routes} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <StoreSwitcher items={data.getAllStores} />
          <ThemesGeneralSwitcher />
          <UserNav userId={id} userRole={role} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
