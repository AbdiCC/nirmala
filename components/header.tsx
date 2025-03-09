import React from 'react'
import { Modetoggle } from './mode-toggle'
import { SidebarTrigger } from './ui/sidebar'
import { Droplets } from 'lucide-react'

export const Header = () => {
  return (
    <header className='sticky top-0 px-3 py-2 flex justify-between items-center bg-background'>
      <a href='/'>
      <div className='flex items-center md:gap-2'>
        <Droplets className='h-4 w-4 font-semibold' />
        <h1 className='font-semibold text-sm'>Nirmala</h1>
      </div>
      </a>
      <div className='flex items-center gap-2'>
        <Modetoggle />
        <SidebarTrigger />
      </div>
    </header>
  )
}
