import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { clerkId, email, name } = await req.json();

    if (!clerkId || !email) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const userExists = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.clerkId, clerkId),
    });

    if (!userExists) {
      await db.insert(users).values({ clerkId, email, name });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}