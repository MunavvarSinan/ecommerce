"use client"

import { StoreData } from "@/app/vendor/(root)/layout";
import { GET_STORE } from "@/lib/graphql/query";
import { userStore } from "@/lib/store/user";
import { useSuspenseQuery } from "@apollo/client";
import React from "react";
import { SettingsForm } from "./components/settings-form";
import { Shell } from "@repo/ui/components/ui/shell-variants";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@repo/ui/components/ui/page-header";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { Trash } from "lucide-react";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import { Separator } from "@repo/ui/components/ui/separator";

interface SettingsPageProps {
  params: {
    storeId: string;
  }
}

const SettingsPage: React.FC<SettingsPageProps> = ({ params }): JSX.Element => {
  const { user } = userStore();
  const { data } = useSuspenseQuery(GET_STORE, {
    variables: {
      vendorId: user?.id,
      storeId: params.storeId
    }
  }) as StoreData;

  return (
    <Shell variant="sidebar">
      <PageHeader
        aria-labelledby="dashboard-stores-page-header-heading"
        id="dashboard-stores-page-header"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading className="flex-1" size="sm">
            Stores

          </PageHeaderHeading>
          <Link
            aria-label="Create store"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "destructive"
              }),
              'text-md'
            )}
            href='/'
          >
            <div className="mr-1 ">
              <Trash className="h-5 w-5" />
            </div>
            Remove
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your stores
        </PageHeaderDescription>
      </PageHeader>
      <Separator />
      <SettingsForm initialData={data.getStore} />

    </Shell>
  );
}

export default SettingsPage;
