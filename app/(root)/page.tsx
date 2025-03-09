import { ClientSyncUser } from "@/components/client-sync-user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useSyncUser } from "@/lib/syncUser";
import { UserButton } from "@clerk/nextjs";
import { ShieldAlert } from "lucide-react";

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
      <UserButton />
    </div>
  );
}
