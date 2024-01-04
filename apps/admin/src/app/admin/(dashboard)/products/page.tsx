import { buttonVariants } from "@repo/ui/components/ui/button";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@repo/ui/components/ui/page-header";
import { Shell } from "@repo/ui/components/ui/shell-variants";
import { cn } from "@repo/ui/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

const ProductPage = () => {
  return (
    <Shell>
      <PageHeader
        aria-labelledby="dashboard-categories-page-header-heading"
        id="dashboard-categories-page-header"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading className="flex-1" size="sm">
            Products
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
            Add products
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your products
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}

export default ProductPage;
