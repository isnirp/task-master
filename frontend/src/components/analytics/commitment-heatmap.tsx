'use client'

import { cn } from '@/lib/utils'

interface CommitmentHeatmapProps {
  data: number[][] // [7 days][24 hours]
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 24 }, (_, i) => {
  if (i === 0) return '12am'
  if (i === 12) return '12pm'
  if (i < 12) return `${i}am`
  return `${i - 12}pm`
})

function getIntensity(value: number, max: number): string {
  if (max === 0 || value === 0) return 'bg-slate-100'
  const ratio = value / max
  if (ratio < 0.25) return 'bg-indigo-200'
  if (ratio < 0.5) return 'bg-indigo-400'
  if (ratio < 0.75) return 'bg-indigo-600'
  return 'bg-indigo-800'
}

export function CommitmentHeatmap({ data }: CommitmentHeatmapProps) {
  const max = Math.max(...data.flat())

  // Show only business hours (6am-11pm) for readability
  const visibleHours = Array.from({ length: 18 }, (_, i) => i + 6)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {/* Hour labels */}
        <div className="flex items-center mb-1 ml-10">
          {visibleHours.map((h, i) => (
            <div key={h} className="w-7 text-center text-[9px] text-slate-400">
              {i % 3 === 0 ? HOURS[h] : ''}
            </div>
          ))}
        </div>

        {/* Grid */}
        {data.map((dayData, dayIdx) => (
          <div key={dayIdx} className="flex items-center mb-1">
            <span className="w-8 text-xs text-slate-500 text-right mr-2">{DAYS[dayIdx]}</span>
            {visibleHours.map(h => {
              const val = dayData[h]
              return (
                <div
                  key={h}
                  title={`${DAYS[dayIdx]} ${HOURS[h]}: ${val} task${val !== 1 ? 's' : ''}`}
                  className={cn('w-7 h-6 rounded mx-px cursor-default transition-opacity hover:opacity-80', getIntensity(val, max))}
                />
              )
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3 ml-10">
          <span className="text-xs text-slate-400 mr-1">Less</span>
          {['bg-slate-100', 'bg-indigo-200', 'bg-indigo-400', 'bg-indigo-600', 'bg-indigo-800'].map(cls => (
            <div key={cls} className={cn('w-5 h-5 rounded', cls)} />
          ))}
          <span className="text-xs text-slate-400 ml-1">More</span>
        </div>
      </div>
    </div>
  )
}
