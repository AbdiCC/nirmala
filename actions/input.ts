"use server"
import { db } from "@/db"
import { subagens } from "@/db/schema"

export const seedSubAgen = async() => {
  await db.insert(subagens).values([
    { kode: 1, wilayah: "Trucuk" },
    { kode: 2, wilayah: "Ceper" },
    { kode: 3, wilayah: "Polanharjo" },
    { kode: 4, wilayah: "Delanggu" },
    { kode: 5, wilayah: "Wonosari" },
    { kode: 6, wilayah: "Jatinom" },
    { kode: 7, wilayah: "Tulung" },
    { kode: 8, wilayah: "Karanganom" },
    { kode: 9, wilayah: "Ngawen" },
    { kode: 10, wilayah: "Kebonarum" },
    { kode: 11, wilayah: "Wedi" },
    { kode: 12, wilayah: "Karangdowo" },
    { kode: 13, wilayah: "Pedan" },
    { kode: 14, wilayah: "Gantiwarno" },
    { kode: 15, wilayah: "Cawas" },
    { kode: 16, wilayah: "Bayat" },
    { kode: 17, wilayah: "Kota" },
    { kode: 18, wilayah: "Juwiring" },
    { kode: 19, wilayah: "Prambanan" }
  ])
}