'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Progress } from '@/components/ui/progress'

interface CategoryData {
  category: string
  total: number
  completed: number
  rate: number
}

interface PriorityData {
  priority: string
  total: number
  completed: number
  rate: number
}

interface ProductivityReportProps {
  categoryData: CategoryData[]
  priorityData: PriorityData[]
}

const CATEGORY_COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#10b981']

const PRIORITY_COLORS_MAP: Record<string, string> = {
  low: '#94a3b8',
  medium: '#3b82f6',
  high: '#f97316',
  urgent: '#ef4444',
}

export function ProductivityReport({ categoryData, priorityData }: ProductivityReportProps) {
  return (
    <div className="space-y-8">
      {/* Category bar chart */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Completion by Category</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={categoryData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="total" name="Total" radius={[4, 4, 0, 0]} fill="#e2e8f0">
              {categoryData.map((_, i) => (
                <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length] + '33'} />
              ))}
            </Bar>
            <Bar dataKey="completed" name="Completed" radius={[4, 4, 0, 0]}>
              {categoryData.map((_, i) => (
                <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Priority breakdown table */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Stats by Priority</h3>
        <div className="space-y-3">
          {priorityData.map(item => (
            <div key={item.priority} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium capitalize text-slate-600">{item.priority}</div>
              <div className="flex-1">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>{item.completed} / {item.total} tasks</span>
                  <span className="font-semibold" style={{ color: PRIORITY_COLORS_MAP[item.priority] }}>{item.rate}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${item.rate}%`, backgroundColor: PRIORITY_COLORS_MAP[item.priority] }}
                  />
                </div>
              </div>
              <div className="w-16 text-right">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: PRIORITY_COLORS_MAP[item.priority] + '20', color: PRIORITY_COLORS_MAP[item.priority] }}
                >
                  {item.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
