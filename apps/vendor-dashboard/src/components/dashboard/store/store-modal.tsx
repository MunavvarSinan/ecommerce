"use client"

import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@repo/ui/components/ui/form'
import { Input } from '@repo/ui/components/ui/input'
import { Modal } from '@repo/ui/components/ui/modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

import { CREATE_STORE } from '@/lib/graphql/mutation'
import { GET_ALL_STORES } from '@/lib/graphql/query'
import { useStoreModal } from '@/lib/store/model'
import { userStore } from '@/lib/store/user'

const formSchema = z.object({
  name: z.string().min(3, { message: "Enter a valid store name" }),
  description: z.string()
})

interface CreateStoreData {
  data: {
    createStore: {
      id: string;
      name: string;
      description: string;
    }
  }
}

export default function StoreModal(): JSX.Element {
  const storeModal = useStoreModal()
  const router = useRouter()
  const { user } = userStore()
  const [loading, setLoading] = useState(false)
  const [createStore] = useMutation(CREATE_STORE);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })


  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const { data } = (await createStore({
        variables: {
          name: formData.name,
          description: formData.description ? formData.description : '',
          vendorId: user?.id
        },
        refetchQueries: [{ query: GET_ALL_STORES }]
      })) as CreateStoreData

      if (data) {
        form.reset()
        toast.success(`Store ${data.createStore.name} added successfully`)
        storeModal.closeModal()
        router.push(`/vendor/${data.createStore.id}`)
        setLoading(false)
      }
    } catch (error) {
      toast.error('Something went wrong, please try again ( store name might already exist )')
      setLoading(false)
    }
  }
  return (
    <Modal
      description="Add a new store to manage products and orders"
      isOpen={storeModal.isOpen}
      onClose={storeModal.closeModal}
      title="Create store"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="E-Commerce" {...field} />
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
                        <Input disabled={loading} placeholder="Give a description for your store" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={loading} onClick={storeModal.closeModal} variant="outline">
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

    </Modal >
  )
}
