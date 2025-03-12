import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  // Jika tidak ada user, kembalikan null (atau status lain yang kamu inginkan)
  if (!user) {
    return new Response(JSON.stringify({ verification: null }), { status: 200 });
  }
  return new Response(JSON.stringify({ verification: user.isVerified }), { status: 200 });
}