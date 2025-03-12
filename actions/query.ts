"use server"

import { db } from "@/db"

export const getAskVerify = async() =>{
  return await db.query.users.findMany({
    where: (users, { eq }) => eq(users.isVerified, "unverified"),
    with: {
      subagen: true
    }
  })
}