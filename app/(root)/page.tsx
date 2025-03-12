import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { ShieldAlert } from "lucide-react";

export default async function Home() {
  const user = await getCurrentUser()
  if(!user){
    return null
  }
  const status = user.isVerified

  if(status === "verified"){
    return(
      <div>
        <h1 className='font-bold'>Riwayat Order</h1>
        
      </div>
    )
  }
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
    </div>
  );
}
