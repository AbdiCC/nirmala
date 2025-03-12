import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async({children}:{children : React.ReactNode}) => {
  const user = await getCurrentUser()

  if(user?.isVerified === "pending"){
    redirect('/onboarding')
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        <Header />
        <div className='p-3 pt-6 container'>
          {children}
        </div>
      </SidebarInset>
      <AppSidebar userRole={user?.role || "subagen"} side='right' />
    </SidebarProvider>
  )
}

export default Layout