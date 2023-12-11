"use client";

import * as z from 'zod';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import clientCookies from 'js-cookie';

import { ADMIN_LOGIN } from "@/lib/graphql/auth/mutations/auth";
import { Button } from "@repo/ui/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { cn } from "@repo/ui/lib/utils";

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
        <main className={cn("flex min-h-screen flex-col items-center justify-between p-24", className)} {...props}>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
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
                        render={({ field }) => {
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
        </main>
    )
}