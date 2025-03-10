import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { getCurrentUser } from "@/lib/atuh";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ShieldAlert } from "lucide-react";

export default async function Home() {
  const user = await getCurrentUser()
  const status = user!.isVerified

  if(status === "unverified"){

    return (
      <div>
        <Alert>
          <ShieldAlert className='h-4 w-4' />
          <div className='flex justify-between items-center'>
            <AlertTitle className="text-destructive-foreground">Akun Belum Terverifikasi</AlertTitle>
            <Badge variant='secondary'>Proses</Badge>
          </div>
          <AlertDescription>Tunggu akun kamu diverifikasi oleh admin.</AlertDescription>
        </Alert>
        <UserButton />
      </div>
    );
  }
  return(
    <div>Selamat {user?.name},  Akun kamu telah terverifikasi</div>
  )
}
