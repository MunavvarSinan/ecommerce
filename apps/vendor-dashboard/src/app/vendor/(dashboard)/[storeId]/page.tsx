"use client"

import { cn, formatter } from "@repo/ui/lib/utils";
import { useParams } from "next/navigation";
import StatCard from '@repo/ui/components/dashboard/cards/stats-card';
import { Shell } from "@repo/ui/components/ui/shell-variants";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@repo/ui/components/ui/page-header";
import Link from "next/link";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";

const StorePage = (): JSX.Element => {
  const { storeId } = useParams<{ storeId: string }>();
  const totalRevenue = 100000;
  const salesCount = 100;
  const stockCount = 1000;
  return (
    <Shell variant="sidebar">
      <PageHeader
        aria-labelledby="dashboard-stores-page-header-heading"
        id="dashboard-stores-page-header"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading className="flex-1" size="sm">
            Analytics

          </PageHeaderHeading>

        </div>
        <PageHeaderDescription size="sm">
          Manage your store analytics
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <StatCard icon="dollar" title="Total Revenue" amount={formatter.format(totalRevenue)} />
        <StatCard icon="creditCard" title="Sales" amount={`+${salesCount}`} />
        <StatCard icon="package" title="Products In Stock" amount={stockCount} />

      </div>
    </Shell>

  );
}

export default StorePage;
