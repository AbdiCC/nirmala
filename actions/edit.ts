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