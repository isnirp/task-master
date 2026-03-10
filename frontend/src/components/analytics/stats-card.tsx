import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  trend?: { value: number; label: string }
  className?: string
}

export function StatsCard({ title, value, subtitle, icon: Icon, iconColor = 'text-indigo-600', trend, className }: StatsCardProps) {
  return (
    <div className={cn('bg-white border border-slate-200 rounded-xl p-5', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          {trend && (
            <p className={cn('text-xs mt-1 font-medium', trend.value >= 0 ? 'text-green-600' : 'text-red-500')}>
              {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className={cn('p-2.5 rounded-lg bg-slate-50', iconColor.replace('text-', 'bg-').replace('-600', '-50'))}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
      </div>
    </div>
  )
}
