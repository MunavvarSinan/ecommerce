"use client";

import * as z from 'zod';
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import clientCookies from 'js-cookie';
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from 'clsx';
import Link from 'next/link';

import { ADMIN_LOGIN } from "@/lib/graphql/auth/mutations/auth";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@repo/ui/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";


type SignInFormProps = React.HTMLAttributes<HTMLDivElement>

export function SignInForm({ className, ...props }: SignInFormProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false)
    const [adminLogin] = useMutation(ADMIN_LOGIN);

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6, { message: 'Invalid Password' }),
    });

    type FormValues = z.infer<typeof formSchema>;

    const initialValues: FormValues = {
        email: '',
        password: '',
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });
    const { handleSubmit, formState } = form;

    const isButtonDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit = async (values: FormValues): Promise<any> => {
        setIsLoading(true)
        try {
            const { data } = await adminLogin({
                variables: {
                    email: values.email,
                    password: values.password
                }
            })
            console.log(data)
            if (data?.adminLogin?.authToken) {
                clientCookies.set('token', data.adminLogin.authToken)
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <main className={clsx(
            "flex flex-col max-w-xl justify-center container -mt-14 lg:max-w-none lg:grid-cols-2 lg:px-0 sm:max-w-lg self-center min-h-screen items-center",
            className,
        )}
            {...props}
        >
            <Card>
                <CardHeader className="flex flex-row justify-between border-b items-baseline px-4">
                    <Link
                        className="z-20 flex items-center dark:text-zinc-200 text-zinc-800 font-heading bg-transparent text-lg font-medium transition-colors hover:bg-accent lg:hover:bg-primary-foreground/10 hover:underline"
                        href="/"
                    >
                        Logo
                    </Link>
                    <CardDescription
                        className={clsx(
                            'leading-7 [&:not(:first-child)]:mt-6',
                            "mb-2 font-bold flex flex-col text-base space-y-2 text-center",
                        )}
                    >
                        Admin Login
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <div className="mx-auto flex flex-col justify-center space-y-6">
                        <div className="mb-4 mt-4">
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }: { field: FormValues }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel>Email address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Email address"
                                                            type="email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }: { field: FormValues }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Password"
                                                            type="passord"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                    <Button className="mt-5 w-full" disabled={isButtonDisabled} type="submit" variant="default">
                                        {isLoading ? (
                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        ) : null}
                                        Submit
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="pl-8 text-sm justify-center items-baseline flex space-x-1 text-muted-foreground border-t">
                    <h2 className="mt-8">
                        By using the buttons above, you agree with{" "}
                        <span>
                            <Link
                                href="/terms"
                                className="text-muted-foreground font-semibold hover:underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>
                        </span>
                        <span className="mx-1">and</span>
                        <span>
                            <Link
                                href="/privacy"
                                className="text-muted-foreground font-semibold hover:underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </span>
                    </h2>
                </CardFooter>
            </Card>
        </main>

    )
}