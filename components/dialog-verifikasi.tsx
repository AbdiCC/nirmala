"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { accVerify, rejectVerify } from '@/actions/edit'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

interface DialogVerifikasiProps {
  id: string
  name: string
  wilayah: string
  email: string
  whatsapp: string
}

export const DialogVerifikasi = ({ id, name, wilayah, email, whatsapp }: DialogVerifikasiProps) => {
  const handleAcc = async (id: string) => {
    accVerify(id)
    toast.success("Permintaan verifikasi diterima")
    redirect("/verifikasi")
  }

  const handleReject = async (id: string) => {
    rejectVerify(id)
    toast.success("Permintaan verifikasi ditolak")
    redirect("/verifikasi")
  }
  return (
    <div className='grow basis-[200px]'>
      <Dialog key={id}>
        <DialogTrigger asChild>
          <div className='border rounded-md p-3 px-5 flex justify-between'>
            <h1 className='font-bold'>{name}</h1>
            <p className='text-muted-foreground text-sm font-semibold'>{wilayah}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verifikasi</DialogTitle>
            <DialogDescription>Meminta verifikasi akun</DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-5'>
              <Label>Email: </Label>
              <p className='text-muted-foreground'>{email}</p>
            </div>
            <div className='flex gap-5'>
              <Label>Nama: </Label>
              <p>{name}</p>
            </div>
            <div className='flex gap-5'>
              <Label>No. WhatsApp: </Label>
              <a href={`https://wa.me/${whatsapp}`}>
                <Button variant='link' className='p-0 underline underline-offset-2 decoration-lime-500 decoration-dashed font-semibold' >+{whatsapp}</Button>
              </a>
            </div>
            <div className='flex gap-5'>
              <Label>Wilayah Sub: </Label>
              <p>{wilayah}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant='destructive' onClick={() => handleReject(id)}>Tolak</Button>
            <Button onClick={() => handleAcc(id)}>Terima</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}