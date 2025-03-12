"use client"
import { Calendar, Home, LogOut, Settings, ShoppingBag, UserRoundCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useClerk } from "@clerk/nextjs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

const items = [
  {
    group: 'Application',
    lists: [
      {
        title: "Beranda",
        url: "/",
        icon: Home,
        roles: ["subagen", "agen"], // Bisa diakses oleh user dan admin
      },
      {
        title: "Order",
        url: '/order',
        icon: ShoppingBag,
        roles: ["subagen", "agen"],
      }
    ]
  },
  {
    group: 'Admin',
    lists: [
      {
        title: "Laporan",
        url: '/laporan',
        icon: Calendar,
        roles: ["agen"], // Hanya admin yang bisa akses
      },
      {
        title: "Verifikasi",
        url: '/verifikasi',
        icon: UserRoundCheck,
        roles: ["agen"],
      },
      {
        title: "Pengaturan",
        url: '#',
        icon: Settings,
        roles: ["agen"],
      }
    ]
  }
]

export function AppSidebar({ userRole, ...props }: { userRole: string } & React.ComponentProps<typeof Sidebar>) {
  const { signOut } = useClerk()
  const handleLogout = () => {
    signOut()
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {items.map((item) => {
          // Filter menu berdasarkan role user
          const filteredLists = item.lists.filter(list => list.roles.includes(userRole));

          if (filteredLists.length === 0) return null; // Jangan tampilkan grup jika kosong

          return (
            <SidebarGroup key={item.group}>
              <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredLists.map((list) => (
                    <SidebarMenuItem key={list.title}>
                      <SidebarMenuButton asChild>
                        <a href={list.url}>
                          <list.icon />
                          <span>{list.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <SidebarMenuButton>
                    <div className="flex items-center gap-2 text-destructive-foreground">
                      <LogOut className='w-4 h-4' />
                      <p>Keluar</p>
                    </div>
                  </SidebarMenuButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Yakin mau keluar?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Yakin</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}