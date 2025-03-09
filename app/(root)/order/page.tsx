import { FormOrder } from '@/components/form-order'
import React from 'react'

const page = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-bold'>Order</h1>
        <p className='text-sm text-muted-foreground'>Laporkan laku penjualan dan jumlah order untuk memesan.</p>
      </div>
      <FormOrder />
    </div>
  )
}

export default page