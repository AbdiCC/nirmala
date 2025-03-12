import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";

export async function getCurrentUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerkId, clerkUser.id),
  });

  return user;
}