import Link from "next/link";
import { ActivitySquare } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/ui/navigation-menu";

import type { MENU_ITEM_PROPS } from "@repo/ui/types";
import { siteConfig } from "@repo/ui/config/site-config";
import { cn } from "@repo/ui/lib/utils";

interface MainMenuProps {
  items: MENU_ITEM_PROPS[];
  dashboardName?: string;
}

const MainMenu = ({ items, dashboardName }: MainMenuProps): JSX.Element => {
  return (
    <div className="hidden gap-6 md:flex">
      <Link
        aria-label="Home"
        className="hidden items-center space-x-2 lg:flex"
        href="/"
      >
        <ActivitySquare className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block font-heading">
          {dashboardName ? dashboardName : siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.title} >
              <Link href={item.href as string} passHref >
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  item.active ? 'bg-accent transition-colors' : null
                )}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MainMenu;
