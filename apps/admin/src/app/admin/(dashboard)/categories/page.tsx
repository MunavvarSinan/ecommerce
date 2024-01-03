"use client"

import { useSuspenseQuery } from "@apollo/client";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@repo/ui/components/ui/page-header";
import { Shell } from "@repo/ui/components/ui/shell-variants";
import { cn } from "@repo/ui/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

import CategoriesTable from "@/components/dashboard/categories/categories-table";
import { GET_ALL_CATEGORIES } from "@/lib/graphql/admin/query/admin";
import type { CATEGORIES_TYPE } from "@/types";


const CategoriesPage = (): JSX.Element => {
  const { data } = useSuspenseQuery(GET_ALL_CATEGORIES) as CATEGORIES_TYPE;
  return (
    <Shell>
      <PageHeader
        aria-labelledby="dashboard-categories-page-header-heading"
        id="dashboard-categories-page-header"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading className="flex-1" size="sm">
            Categories
          </PageHeaderHeading>
          <Link
            aria-label="Create store"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "default"
              }),

            )}
            href='/admin/categories/new'
          >
            <div className="mr-1 ">
              <Plus className="h-5 w-5" />
            </div>
            Add categories
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your categories
        </PageHeaderDescription>
      </PageHeader>
      <CategoriesTable data={data.getCategories} pageCount={0} />
    </Shell>
  );
}

export default CategoriesPage;
