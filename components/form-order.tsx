"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Textarea } from './ui/textarea'

const formSchema = z.object({
  order: z.coerce.number().min(0, { message: "Tidak bisa menerima order negatif" }),
  terjual: z.coerce.number().min(0, { message: "Tidak bisa menerima order negatif" }),
  catatan: z.string().nullable()
})

export const FormOrder = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      catatan: ""
    }
  })
  const route = useRouter()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      route.push("/")
      toast.success('Order: '+values.order+"Terjual: "+values.terjual)
    } catch (error) {
      toast.error(error as string)
      console.error(error as string)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex gap-4'>
          <FormItem>
            <FormLabel className='text-xs'>Stock</FormLabel>
            <Input placeholder='50' disabled />
          </FormItem>
          <FormItem>
            <FormLabel className='text-xs'>Sisa</FormLabel>
            <Input placeholder='50' disabled />
          </FormItem>
        </div>
        <div className='flex gap-4'>
          <FormField
            control={form.control}
            name="terjual"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Terjual<span className='text-destructive-foreground'>*</span></FormLabel>
                <FormControl>
                  <Input {...field} type='number' placeholder="Laku" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Order<span className='text-destructive-foreground'>*</span></FormLabel>
                <FormControl>
                  <Input {...field} type='number' value={field.value ?? ''} placeholder="Order" />
                </FormControl>
              </FormItem>
            )}
          />
          </div>
          <FormField
            control={form.control}
            name="catatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Catatan (Opsional)</FormLabel>
                <FormControl>
                  <Textarea value={field.value || undefined}/>
                </FormControl>
              </FormItem>
            )}
          />
        <Button type='submit' className='w-full md:w-[80px]'>Submit</Button>
      </form>
    </Form>
  )
}
