"use client"

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';

interface TitleFormProps {
  initialData: {
    name: string;
  },
  formTitle?: string;

}

const schema = z.object({
  name: z.string().min(3, 'Title must be at least 3 characters').max(50, 'Title must be at most 50 characters')
});


export const TitleForm = ({
  initialData,
  formTitle
}: TitleFormProps): JSX.Element => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData.name,
    }
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (inputData: { name: string }) => {
    toggleEdit();
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between text-xl">
        {formTitle}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-lg mt-2">
          {initialData.name}
        </p>
      )}
      {isEditing ? <Form {...form}>
        <form
          className="space-y-4 mt-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Advanced web development'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Form> : null
      }
    </div>

  )
}
