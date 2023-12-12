"use client"

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

import { cn } from "@repo/ui/lib/utils";

const MainNav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname();


    const routes = [
        {
            href: `/settings`,
            label: 'Settings',
            active: pathname === `/settings`
        }
    ]
    return (
        <div className={
            cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )
        }>
            {
                routes.map((route, index) => (
                    <Link href={route.href} key={index} className={
                        cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-gray-900 dark:text-white" : "text-muted-foreground"

                        )
                    }>
                        {route.label}
                    </Link>
                ))
            }
        </div>
    );
}

export default MainNav;