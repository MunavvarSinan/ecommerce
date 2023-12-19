"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { cn } from "@repo/ui/lib/utils";

import type { MENU_ITEM_PROPS } from "@/types";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site-config";

interface MobileMenuProps {
  MainMenuItems?: MENU_ITEM_PROPS[];
}

export function MobileMenu({ MainMenuItems }: MobileMenuProps): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          variant="ghost"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
          <span className="ml-2 font-heading tracking-wide">
            Ecommerce Admin
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="pl-1 pr-0" side="left">
        <div className="px-7">
          <Link
            aria-label="Home"
            className="flex items-center"
            href="/"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <span className="font-heading">{siteConfig.name}</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)]  pb-10 pl-6">
          <div className="pl-1 pr-7">
            {MainMenuItems?.map((item) => (
              <div className="flex flex-col p-4 border-b" key={item.title}>
                {item.href ? (
                  <MobileLink
                    disabled={item.disabled}
                    href={String(item.href)}
                    key={item.title}
                    pathname={pathname}
                    setIsOpen={setIsOpen}
                  >
                    {item.title}
                  </MobileLink>
                ) : (
                  <div
                    className="text-foreground/70 transition-colors"
                    key={item.title}
                  >
                    {item.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string | null;
  disabled?: boolean;
  pathname: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps): JSX.Element {
  return (
    <Link
      className={cn(
        "text-foreground/70 text-lg transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60",
      )}
      href={`${href}`}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      {children}
    </Link>
  );
}
