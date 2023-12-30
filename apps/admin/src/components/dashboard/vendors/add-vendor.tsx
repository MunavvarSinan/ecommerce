"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// eslint-disable-next-line import/no-named-as-default
import toast from "react-hot-toast";
import type { z } from "zod";
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

import { catchError } from "@/utils";
import { ADD_VENDOR } from "@/lib/graphql/admin/mutation/admin";
import { Icons } from "@/components/icons";
import { vendorSchema } from "@/validations/vendor";
import { GET_ALL_VENDORS } from "@/lib/graphql/admin/query/admin";

type Inputs = z.infer<typeof vendorSchema>;

export const AddVendorForm = (): JSX.Element => {
  const router = useRouter();
  const [createVendor] = useMutation(ADD_VENDOR);
  const [isPending, startTransaction] = useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
  });
  const onSubmit = (inputData: Inputs): void => {
    startTransaction(async () => {
      try {
        const { data } = await createVendor({
          variables: {
            ...inputData,
          },
          refetchQueries: [{ query: GET_ALL_VENDORS }],
        })

        if (data) {
          form.reset();
          toast.success(`Vendor ${data.name} added successfully`);
          router.push("/admin/vendors");
          router.refresh();
        } else {
          toast.error("Something went wrong");
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isPending}>
          {isPending ? <Icons.spinner
            aria-hidden="true"
            className="mr-2 h-4 w-4 animate-spin"
          /> : null}
          Create Vendor
          <span className="sr-only">Add Store</span>
        </Button>
      </form>
    </Form>
  );
};
