"use client";


import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";

import { VendorsTableShell } from "@/components/dashboard/vendors/vendors-table";
import { Shell } from "@/components/shell-variants";
import { PageHeaderHeading } from "@/components/ui/page-header";
import { type VENDORS_TYPE } from "@/types";
import { GET_ALL_VENDORS } from "@/lib/graphql/admin/query/admin";

const pageCount = 3; // Assuming you have 3 pages of data

const Vendors = (): JSX.Element => {
    const { data } = useSuspenseQuery(GET_ALL_VENDORS) as VENDORS_TYPE;

    return (
        <Shell className="gap-4" variant="sidebar">
            <div className="flex items-center space-x-4 pr-1">
                <PageHeaderHeading className="line-clamp-1 flex-1" size="sm">
                    Vendors
                </PageHeaderHeading>
                <Link
                    aria-label="Create store"
                    className={cn(
                        buttonVariants({
                            size: "sm",
                        }),
                    )}
                    href="/vendors/new"
                >
                    Create vendor
                </Link>
            </div>
            <div className="space-y-4 overflow-hidden">
                <div className="space-y-2.5">
                    <VendorsTableShell data={data.getVendors} pageCount={pageCount} />
                </div>
            </div>
        </Shell>
    );
};

export default Vendors;
