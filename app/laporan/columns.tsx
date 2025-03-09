import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table"

export const Laporan = z.object({
  nama: z.string().min(2),
  kode: z.number().min(1),
  subagen: z.string().min(2),
  stok: z.number().min(0),
  sisa: z.number().min(0),
  terjual: z.number().min(0),
  order: z.number().min(0),
  tanggal: z.string()
})

export const columns: ColumnDef<z.infer<typeof Laporan>>[] = [
  {
    accessorKey: 'tanggal',
    header: 'Tanggal'
  },
  {
    accessorKey: 'kode',
    header: 'Kode',
  },
  {
    accessorKey: 'subagen',
    header: 'Sub-Agen'
  },
  {
    accessorKey: 'nama',
    header: 'Admin Sub'
  },
  {
    accessorKey: 'stok',
    header: 'Stok'
  },
  {
    accessorKey: 'terjual',
    header: 'Laku'
  },
  {
    accessorKey: 'sisa',
    header: 'Sisa'
  },
  {
    accessorKey: 'order',
    header: 'Order'
  },
]