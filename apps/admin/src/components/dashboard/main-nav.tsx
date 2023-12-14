"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

const MainNav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element => {

    const pathname = usePathname();


    const routes = [
        {
            href: `/vendors`,
            label: 'vendors',
            active: pathname === `/vendors`
        },
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

        }
            {...props}
        >
            {
                routes.map((route) => (
                    <Link className={
                        cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-gray-900 dark:text-white" : "text-muted-foreground"

                        )
                    } href={route.href} key={route.label} >
                        {route.label}
                    </Link>
                ))
            }
        </div>
    );
}

export default MainNav;