import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const Layout = ({children}:{children : React.ReactNode}) => {
  return (
    <SidebarProvider>
      <SidebarInset>
        <Header />
        <div className='p-3 pt-6'>
          {children}
        </div>
      </SidebarInset>
      <AppSidebar side='right' />
    </SidebarProvider>
  )
}

export default Layout