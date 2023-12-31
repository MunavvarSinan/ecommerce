"use client";

import { useSuspenseQuery } from "@apollo/client";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import chroma from "chroma-js";
import clientCookies from "js-cookie";
import { ME } from "@repo/ui/lib/graphql/query";

import type { USER_DATA } from "@repo/ui/types";

const COLOR_PALETTE = [
  "#2DBF52", // Green
  "#F2709C", // Pink
  "#F06292", // Orange
  "#99AB9C", // Teal
  "#3DC2FF", // Blue
];
interface UserNavProps {
  userId: string;
  userRole: string;
}
export function UserNav({ userId, userRole }: UserNavProps): JSX.Element {
  const { data } = useSuspenseQuery(ME, {
    variables: {
      id: userId,
      role: userRole,
    },
  }) as USER_DATA;
  const initials = data.me.name.slice(0, 2).toUpperCase();
  const paletteIndex = initials.charCodeAt(0) % COLOR_PALETTE.length;
  const backgroundColor = COLOR_PALETTE[paletteIndex];
  const textColor =
    chroma.contrast(backgroundColor, "white") > 2 ? "white" : "black";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8 rounded-full" variant="ghost">
          <Avatar className="h-10 w-10 ">
            {/* <AvatarImage alt="@shadcn" className="bg-black" src="/avatars/01.png" /> */}
            <AvatarFallback
              className={`text-${textColor} font-bold`}
              style={{ background: backgroundColor }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data.me.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data.me.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            clientCookies.remove("token");
            window.location.href = "/sign-in";
          }}
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
