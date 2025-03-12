"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const verifyUser = async({id, name, subagenId, whatsapp}: {id: string, name: string,subagenId: string, whatsapp: string}) => {
  await db.update(users)
    .set({
      isVerified: "unverified",
      name,
      subagenId,
      whatsapp
    })
    .where(eq(users.id, id))
}

export const accVerify = async(id: string) => {
  await db.update(users).set({
    isVerified: "verified"
  }).where(eq(users.id, id))
}

export const rejectVerify = async(id: string) => {
  await db.update(users).set({
    isVerified: "pending"
  }).where(eq(users.id, id))
}