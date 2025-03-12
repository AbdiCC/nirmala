import { getAskVerify } from '@/actions/query'
import { DialogVerifikasi } from '@/components/dialog-verifikasi'
import React from 'react'

const page = async () => {
  const dataAsk = await getAskVerify()

  return (
    <div>
      <div className='space-y-4'>
        <h1 className='font-bold'>Permintaan Verifikasi</h1>
        <div className='flex flex-wrap gap-2'>
          {dataAsk.map((data) => (
            <DialogVerifikasi 
              key={data.id} 
              id={data.id}
              name={data.name} 
              email={data.email} 
              wilayah={data.subagen?.wilayah || ""} 
              whatsapp={data.whatsapp || ""} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page