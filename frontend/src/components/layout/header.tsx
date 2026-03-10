'use client'

import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Quick search..."
            className="pl-9 w-48 h-8 bg-slate-50 border-slate-200 text-sm focus:w-64 transition-all"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </Button>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarFallback className="bg-indigo-600 text-white text-xs font-semibold">PM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
