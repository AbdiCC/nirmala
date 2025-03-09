"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export const Modetoggle = () => {
    const { setTheme, theme } = useTheme()

    const handleMode = () => {
      if(theme === 'dark') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    }

    return (
        <Button variant="outline" size="icon" onClick={handleMode}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-300" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-300" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
