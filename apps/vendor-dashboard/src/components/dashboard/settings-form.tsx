"use client"

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from "next/navigation";
import { Input } from "@repo/ui/components/ui/input";
import { Button, buttonVariants } from "@repo/ui/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { Separator } from "@repo/ui/components/ui/separator";
import { Heading } from '@repo/ui/components/ui/heading'
import { StoreData } from "@/app/vendor/(root)/layout";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@repo/ui/components/ui/page-header";
import { Shell } from "@repo/ui/components/ui/shell-variants";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { GET_STORE } from "@/lib/graphql/query";
import { userStore } from "@/lib/store/user";


const formSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  slug: z.string().min(3, { message: "Slug is required" }),
  description: z.string(),
});
interface SettingsStoreFormData {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
type SettingsFormValues = z.infer<typeof formSchema>

interface SettingsFormProps {
  initialData: SettingsStoreFormData;
};

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }): JSX.Element => {
  const { storeId }: { storeId: string } = useParams();
  const router = useRouter();


  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });

  const onSubmit = async (values: SettingsFormValues) => {
    setLoading(true);
    try {
      toast.success('Store updated successfully')
      router.push(`/vendor/${storeId}`)
    } catch (error) {
      toast.error('Something went wrong')
    }
    setLoading(false);
  }

  const onDelete = async () => {
    setLoading(true);
    try {
      toast.success('Store deleted successfully')
      router.push(`/vendor/${storeId}`)
    } catch (error) {
      toast.error('Something went wrong')
    }
    setLoading(false);
  }
  return (
    <div className="mx-auto flex w-full flex-col space-y-1.5">
      <Form {...form}>
        <div className="flex justify-center items-center h-full">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-2xl">
            <div className="grid grid-cols-1 gap-8  justify-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Store description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="mx-auto" type="submit">
              Save changes
            </Button>
          </form>
        </div>

      </Form>
    </div>
  )
}
