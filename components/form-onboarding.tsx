"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { SubagenType } from '@/db/schema'
import { verifyUser } from '@/actions/edit'

interface FormOnboardingProps {
  nama: string
  id: string
  email: string
  subagen: SubagenType[]
}

const formSchema = z.object({
  nama: z.string().min(2, "minimal 2 karakter"),
  subagen: z.string().min(2, "minimal 2 karakter"),
  email: z.string().email("email tidak valid"),
  wa: z.string().min(9).max(11),
})

export const FormOnboarding = ({ nama, email, subagen, id }: FormOnboardingProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama,
      subagen: "",
      email,
      wa: ""
    }
  })

  const router = useRouter()

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    values.wa = `62${values.wa}`
    try {
      verifyUser({id: id, name: values.nama, subagenId: values.subagen, whatsapp: values.wa})
      router.push("/")
      toast('Permintaan verifikasi Anda telah terkirim')
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-xs'>Email<span className='text-destructive-foreground'>*</span></FormLabel>
              <FormControl>
                <Input {...field} type='text' disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nama'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-xs'>Nama<span className='text-destructive-foreground'>*</span></FormLabel>
              <FormControl>
                <Input {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='wa'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-xs'>Nomor WhatsApp<span className='text-destructive-foreground'>*</span></FormLabel>
              <div className='flex items-center'>
                <Input placeholder='+62' disabled className='w-[60px] rounded-r-none bg-muted font-semibold placeholder:text-foreground' />
                <FormControl>
                  <Input {...field} type='number' placeholder='81234567890' className='rounded-l-none' />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subagen'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='font-bold text-xs'>Sub agen<span className='text-destructive-foreground'>*</span></FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? subagen.find((subagen) => subagen.id === field.value)?.wilayah : "Pilih Wilayah..."}
                      <ChevronsUpDown className='opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='p-0'>
                  <Command>
                    <CommandInput
                      placeholder='Cari Wilayah...'
                      className='h-9'
                    />
                    <CommandList>
                      <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                      <CommandGroup heading="Daftar Wilayah">
                        {subagen.map((sub) => (
                          <CommandItem
                            key={sub.id}
                            value={sub.id}
                            onSelect={() => {
                              form.setValue("subagen", sub.id)
                            }}
                          >
                            {sub.wilayah}
                            <Check
                              className={cn(
                                "ml-auto",
                                sub.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type='submit'>Kirim</Button>
      </form>
    </Form>
  )
}
