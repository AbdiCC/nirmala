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

const formSchema = z.object({
  galon: z.coerce.number().min(0, { message: "Tidak bisa menerima order negatif" }),
  karton: z.coerce.number().min(0, { message: "Tidak bisa menerima order negatif" })
})

export const FormOrder = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const route = useRouter()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    route.push("/")
    toast.success('Order berhasil dikirim'+values.galon+values.karton)
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
            name="karton"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Laku<span className='text-destructive-foreground'>*</span></FormLabel>
                <FormControl>
                  <Input {...field} type='number' placeholder="Laku" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="galon"
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
        <Button type='submit' className='w-full md:w-[80px]'>Submit</Button>
      </form>
    </Form>
  )
}
