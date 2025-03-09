import React from 'react'
import { DataTable } from './data-table'
import { columns, Laporan } from './columns'
import { z } from 'zod'
import ExportButton from '@/components/ekspor-button'

async function getData(): Promise<z.infer<typeof Laporan>[]> {
  return [
    {
        nama: "Abdi",
        kode: 1,
        subagen: 'Trucuk',
        stok: 10,
        sisa: 8,
        terjual: 2,
        order: 5,
        tanggal: '12/03/2025'
    }
  ]
}

const page = async() => {
  const data = await getData()

  return (
    <div className='space-y-6'>
      <div className='flex justify-end'>
        <ExportButton data={data} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default page