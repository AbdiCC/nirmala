import { z } from "zod";
import { Laporan } from "./columns";
import ExcelJS from "exceljs"
import { saveAs } from 'file-saver'

export async function exportToExcel(data: z.infer<typeof Laporan>[]) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet("Data")

  worksheet.addRow([
    "Tanggal",
    "KODE",
    "Sub Agen",
    "Admin Sub",
    "Stok",
    "Laku",
    "Sisa",
    "Order",
    "Nominal Setor",
    "Metode Pembayaran"
  ])
  data.forEach((item) => {
    worksheet.addRow([
      item.tanggal,
      item.kode,
      item.subagen,
      item.nama,
      item.stok,
      item.terjual,
      item.sisa,
      item.order])
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
  saveAs(blob, "Rekap Nirmala.xlsx")
}