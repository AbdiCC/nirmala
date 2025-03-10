import { db } from '@/db';
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { ClientSyncUser } from './client-sync-user';

export const ClerkDBProvider = async({children}:{children: React.ReactNode}) => {
  const clerkUser = await currentUser()
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerkId, clerkUser!.id),
  })

  if(user?.clerkId === clerkUser?.id) {
    return (
      <ClerkProvider>{children}</ClerkProvider>
    )
  }
  else return <ClerkProvider><ClientSyncUser />{children}</ClerkProvider>
}
