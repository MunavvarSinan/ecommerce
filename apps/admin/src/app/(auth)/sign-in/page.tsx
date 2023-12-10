"use client"

import * as z from 'zod';
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type FormValues = z.infer<typeof formSchema>;

const initialValues: FormValues = {
    email: '',
    password: '',
};


const SignIn = (): JSX.Element => {
    const form = useForm({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: zodResolver(formSchema),

    })
    function onSubmit(values: FormValues): undefined {
        console.log(values);
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <Form {...form}>
                    <form className="w-full max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
                        <h1 className="mt-3 text-2xl mb-3 font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">sign In</h1>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </section>
    );
}

export default SignIn;