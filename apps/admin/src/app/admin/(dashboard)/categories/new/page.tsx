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

import { AddCategoryForm } from "@/components/dashboard/categories/add-category";
import { userStore } from "@/lib/store/user";

export default function NewCategoryPage(): JSX.Element {
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
        <PageHeaderHeading size="sm">New Category</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Add a new category to your store.
        </PageHeaderDescription>
      </PageHeader>
      <Card
        aria-labelledby="new-store-page-form-heading"
        id="new-store-page-form-container"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add Category</CardTitle>
          <CardDescription>Add a new category to your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddCategoryForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
