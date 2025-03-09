"use client"

import { Button } from '@/components/ui/button'
import { FileSpreadsheet } from 'lucide-react'
import { exportToExcel } from '@/app/(root)/laporan/export-excel'
import { z } from 'zod'
import { Laporan } from '@/app/(root)/laporan/columns'

interface ExportButtonProps {
  data: z.infer<typeof Laporan>[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  return (
    <Button className='text-xs' size='sm' onClick={() => exportToExcel(data)}>
      <FileSpreadsheet className='h-4 w-4' />
      Ekspor
    </Button>
  )
}

export default ExportButton