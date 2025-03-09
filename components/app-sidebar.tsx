import { Calendar, Home, Settings, ShoppingBag, UserRoundCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    group: 'Application',
    lists: [
      {
        title: "Beranda",
        url: "/",
        icon: Home,
      },
      {
        title: "Order",
        url: '/order',
        icon: ShoppingBag
      }
    ]
  },
  {
    group: 'Admin',
    lists: [
      {
        title: "Laporan",
        url: '/laporan',
        icon: Calendar
      },
      {
        title: "Verifikasi",
        url: '/verifikasi',
        icon: UserRoundCheck
      },
      {
        title: "Pengaturan",
        url: '#',
        icon: Settings
      }
    ]
  }
]

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {items.map((item) => (
          <SidebarGroup key={item.group}>
            <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.lists.map((list) => (
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
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
