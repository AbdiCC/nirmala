import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function useSyncUser() {
  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!userId || !user) return;

    fetch("/api/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkId: userId,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      }),
    }).catch(console.error);
  }, [userId, user]);
}