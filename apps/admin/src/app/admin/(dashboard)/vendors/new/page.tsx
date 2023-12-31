"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { redirect } from "next/navigation";
import { Shell } from "@repo/ui/components/ui/shell-variants";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@repo/ui/components/ui/page-header";

import { AddVendorForm } from "@/components/dashboard/vendors/add-vendor";
import { userStore } from "@/lib/store/user";

export default function NewStorePage(): JSX.Element {
  const { user } = userStore();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <Shell variant="default">
      <PageHeader
        aria-labelledby="new-store-page-header-heading"
        id="new-store-page-header"
      >
        <PageHeaderHeading size="sm">New Store</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Add a new store to your account
        </PageHeaderDescription>
      </PageHeader>
      <Card
        aria-labelledby="new-store-page-form-heading"
        id="new-store-page-form-container"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add store</CardTitle>
          <CardDescription>Add a new store to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AddVendorForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
