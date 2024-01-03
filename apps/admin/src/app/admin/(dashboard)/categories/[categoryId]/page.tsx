"use client"
import { useSuspenseQuery } from "@apollo/client";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@repo/ui/components/ui/page-header";
import { Shell } from "@repo/ui/components/ui/shell-variants";

import { CategoryActions } from "@/components/dashboard/categories/category-actions";
import { SubCategoryForm } from "@/components/dashboard/categories/subcategories-form";
import { TitleForm } from "@/components/dashboard/categories/title-form";
import { GET_CATEGORY } from "@/lib/graphql/admin/query/admin";
import type { GET_CATEGORY_TYPE } from "@/types";

interface UpdateCategoryPageProps {
  params: {
    categoryId: string;
  }
}
const UpdateCategoryPage: React.FC<UpdateCategoryPageProps> = ({ params }): JSX.Element => {
  const { data } = useSuspenseQuery(GET_CATEGORY, {
    variables: {
      categoryId: params.categoryId
    }
  }) as GET_CATEGORY_TYPE;
  const disabled = data.getCategory.subcategories.length > 0

  return (
    <Shell>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <PageHeader className="flex flex-col gap-y-2">
            <PageHeaderHeading className="text-2xl font-medium">
              {`Update Category - ${data.getCategory.name.toUpperCase()}`}
            </PageHeaderHeading>
            <PageHeaderDescription className="text-sm text-slate-700">
              Update required details for your category
            </PageHeaderDescription>
          </PageHeader>
          <CategoryActions
            categoryId={params.categoryId}
            disabled={disabled}
            isPublished={data.getCategory.isActive}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <TitleForm
              formTitle="Category name"
              initialData={data.getCategory}
            />
          </div>
          <div className="space-y-6">
            <div>

              <SubCategoryForm
                formTitle="Subcategories"
                initialData={data.getCategory}
              />
            </div>
          </div>
        </div>
      </div>

    </Shell >
  );
}

export default UpdateCategoryPage;
