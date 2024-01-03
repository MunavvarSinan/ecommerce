"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import t from "react-hot-toast";
import * as z from "zod";
import { useMutation } from "@apollo/client";
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { cn } from "@repo/ui/lib/utils";

import { CREATE_CATEGORY } from "@/lib/graphql/admin/mutation/admin";
import { GET_ALL_CATEGORIES, GET_CATEGORY } from "@/lib/graphql/admin/query/admin";
import type { ADD_CATEGORY_TYPE, CATEGORIES_DATA } from "@/types";
import type { categorySchema } from "@/validations/category";

import { SubcategoriesList } from "./subcategories-list";


interface SubCategoryFormProps {
  initialData: {
    name: string;
    id: string
    subcategories: CATEGORIES_DATA[]
  },
  formTitle?: string;
}

const schema = z.object({
  name: z.string().min(3, 'Title must be at least 3 characters').max(50, 'Title must be at most 50 characters')
});

type Inputs = z.infer<typeof categorySchema>;

export const SubCategoryForm = ({
  initialData,
  formTitle,
}: SubCategoryFormProps): JSX.Element => {
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransaction] = useTransition();

  const [createCategory] = useMutation(CREATE_CATEGORY);
  const router = useRouter();

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (inputData: Inputs): void => {
    startTransaction(async () => {
      try {
        setIsLoading(true)
        const { data } = await createCategory({
          variables: {
            ...inputData,
            parentId: initialData.id
          },
          refetchQueries: [{ query: GET_ALL_CATEGORIES }, { query: GET_CATEGORY, variables: { categoryId: initialData.id } }],
        }) as ADD_CATEGORY_TYPE
        if (data) {
          form.reset();
          t.success(`Category ${data.createCategory.name} added successfully`);
          setIsLoading(false)
          router.push("/admin/categories");
          router.refresh();
        } else {
          setIsLoading(false)
          t.error("Something went wrong");
        }
      } catch (error) {
        t.error('Error creating subcategory');

      }
    });
  };
  const onEdit = (id: string) => {
    router.push(`/admin/categories/${id}`);
  }

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isLoading ? <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
      </div> : null}
      <div className="font-medium flex items-center justify-between">
        {formTitle}
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a subcategory
            </>
          )}
        </Button>
      </div>
      {isCreating ? <Form {...form}>
        <form
          className="space-y-4 mt-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Introduction to the course'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
          >
            Create
          </Button>
        </form>
      </Form> : null}
      {!isCreating ? (
        <div className={
          cn(
            "text-sm mt-2",
            !initialData.subcategories.length && "text-slate-500 italic"
          )
        }>
          {!initialData.subcategories.length && "No subcategories yet"}
          <SubcategoriesList
            items={initialData.subcategories}
            onEdit={onEdit}
          />
        </div>
      ) : null}

    </div>
  )
}
