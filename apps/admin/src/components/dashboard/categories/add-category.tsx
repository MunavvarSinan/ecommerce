"use client";

import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import t from "react-hot-toast";
import type { z } from "zod";

import { Icons } from "@/components/icons";
import { CREATE_CATEGORY } from "@/lib/graphql/admin/mutation/admin";
import { GET_ALL_CATEGORIES } from "@/lib/graphql/admin/query/admin";
import type { ADD_CATEGORY_TYPE } from "@/types";
import { catchError } from "@/utils";
import { categorySchema } from "@/validations/category";

type Inputs = z.infer<typeof categorySchema>;

export const AddCategoryForm = (): JSX.Element => {
  const router = useRouter();
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [isPending, startTransaction] = useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      parentId: "",
    },
  });
  const onSubmit = (inputData: Inputs): void => {
    startTransaction(async () => {
      try {
        const { data } = await createCategory({
          variables: {
            ...inputData,
          },
          refetchQueries: [{ query: GET_ALL_CATEGORIES }],
        }) as ADD_CATEGORY_TYPE

        if (data) {
          form.reset();
          t.success(`Category ${data.createCategory.name} added successfully`);
          router.push("/admin/categories");
          router.refresh();
        } else {
          t.error("Something went wrong");
        }
      } catch (error) {
        catchError(error);
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl
                  >
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                          (language) => language.value === field.value
                        )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.id}
                          key={category.id}
                          onSelect={() => {
                            form.setValue("parentId", category.id)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              category.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}


        {/* <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value: typeof field.value) =>
                  field.onChange(value)
                }
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select a parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(categories).map(
                      (option) => (
                        <SelectItem
                          // key={option}
                          value={'hi'}
                          className="capitalize"
                        >
                          {option.name}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>


              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button className="w-fit" disabled={isPending}>
          {isPending ? <Icons.spinner
            aria-hidden="true"
            className="mr-2 h-4 w-4 animate-spin"
          /> : null}
          Create Category
          <span className="sr-only">Add Store</span>
        </Button>
      </form>
    </Form>
  );
};
