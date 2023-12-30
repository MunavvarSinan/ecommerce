import Link from "next/link";
import { ActivitySquare } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/ui/navigation-menu";

import type { MENU_ITEM_PROPS } from "@/types";
import { siteConfig } from "@/config/site-config";

interface MainMenuProps {
  items: MENU_ITEM_PROPS[];
}

const MainMenu = ({ items }: MainMenuProps): JSX.Element => {
  return (
    <div className="hidden gap-6 md:flex">
      <Link
        aria-label="Home"
        className="hidden items-center space-x-2 lg:flex"
        href="/"
      >
        <ActivitySquare className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block font-heading">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.title}>
              <Link href={`${item.href}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
