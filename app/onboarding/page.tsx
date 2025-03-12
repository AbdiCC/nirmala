import { FormOnboarding } from '@/components/form-onboarding'
import { db } from '@/db'
import { getCurrentUser } from '@/lib/auth'
import { ShieldCheck } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const user = await getCurrentUser()
  const subagen = await db.query.subagens.findMany()

  if (user!.isVerified !== 'pending') {
    redirect('/')
  }

  return (
    <div className='flex container flex-col justify-center items-center gap-6 p-4 py-6'>
      <div className='space-y-2'>
        <h1 className='font-bold flex gap-1 text-lg'><ShieldCheck className='h-6 w-6 font-bold' /> Pengajuan Verifikasi</h1>
        <p className='text-sm text-muted-foreground'>Lengkapi data diri anda sebagai Sub Agen untuk mengajukan verifikasi ke Admin.</p>
      </div>
      <FormOnboarding nama={user!.name} subagen={subagen} email={user!.email} id={user!.id} />
    </div>
  )
}

export default page