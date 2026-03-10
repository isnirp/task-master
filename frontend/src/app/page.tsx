'use client'

import { useState } from 'react'
import { CheckCircle2, Clock, AlertTriangle, TrendingUp, Plus, Flame, ListTodo } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { TaskCard } from '@/components/tasks/task-card'
import { TaskDialog } from '@/components/tasks/task-dialog'
import { Button } from '@/components/ui/button'
import { getTaskStats, getRecentTasks, getCompletionTrend, getCurrentStreak } from '@/lib/sample-data'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { format, parseISO } from 'date-fns'

const stats = getTaskStats()
const recentTasks = getRecentTasks(5)
const trendData = getCompletionTrend(14)
const streak = getCurrentStreak()

const statCards = [
  {
    title: 'Total Tasks',
    value: stats.total,
    subtitle: `${stats.inProgress} in progress`,
    icon: ListTodo,
    color: 'indigo',
  },
  {
    title: 'Completed Today',
    value: stats.completedToday,
    subtitle: `${stats.completed} total completed`,
    icon: CheckCircle2,
    color: 'green',
  },
  {
    title: 'Overdue',
    value: stats.overdue,
    subtitle: stats.overdue > 0 ? 'Needs attention' : 'All on track',
    icon: AlertTriangle,
    color: stats.overdue > 0 ? 'red' : 'slate',
  },
  {
    title: 'Completion Rate',
    value: `${stats.completionRate}%`,
    subtitle: 'excl. cancelled',
    icon: TrendingUp,
    color: 'purple',
  },
]

const iconColorMap: Record<string, string> = {
  indigo: 'text-indigo-600',
  green: 'text-green-600',
  red: 'text-red-500',
  slate: 'text-slate-500',
  purple: 'text-purple-600',
}
const bgColorMap: Record<string, string> = {
  indigo: 'bg-indigo-50',
  green: 'bg-green-50',
  red: 'bg-red-50',
  slate: 'bg-slate-100',
  purple: 'bg-purple-50',
}

export default function DashboardPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Dashboard"
        subtitle={`Today is ${format(new Date('2026-03-10'), 'EEEE, MMMM d, yyyy')}`}
      />

      <div className="flex-1 p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(card => {
            const Icon = card.icon
            return (
              <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{card.title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{card.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
                  </div>
                  <div className={`p-2.5 rounded-lg ${bgColorMap[card.color]}`}>
                    <Icon className={`w-5 h-5 ${iconColorMap[card.color]}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent tasks */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-800">Recent Tasks</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDialogOpen(true)}
                className="gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Task
              </Button>
            </div>
            {recentTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            {/* Streak */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-semibold text-slate-700">Daily Streak</h3>
              </div>
              <p className="text-4xl font-bold text-slate-900">{streak}</p>
              <p className="text-xs text-slate-500 mt-1">days completing tasks</p>
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 7 }).map((_, i) => {
                  const active = i < Math.min(streak, 7)
                  return (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full ${active ? 'bg-orange-400' : 'bg-slate-100'}`}
                    />
                  )
                })}
              </div>
            </div>

            {/* Completion trend sparkline */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-semibold text-slate-700">14-Day Trend</h3>
              </div>
              <p className="text-xs text-slate-400 mb-3">Tasks completed per day</p>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={trendData}>
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid #e2e8f0', padding: '4px 8px' }}
                    labelFormatter={v => format(parseISO(v as string), 'MMM d')}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Quick stats */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Quick Stats</h3>
              {[
                { label: 'Pending', value: stats.pending, color: 'bg-yellow-400' },
                { label: 'In Progress', value: stats.inProgress, color: 'bg-blue-500' },
                { label: 'Completed', value: stats.completed, color: 'bg-green-500' },
                { label: 'Cancelled', value: stats.cancelled, color: 'bg-slate-300' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-xs text-slate-600">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${(item.value / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 w-5 text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={(task) => {
          console.log('New task:', task)
          setDialogOpen(false)
        }}
        mode="create"
      />
    </div>
  )
}
