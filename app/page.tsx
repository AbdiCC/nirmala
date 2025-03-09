import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function Home() {
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
      <h1></h1>
    </div>
  );
}
