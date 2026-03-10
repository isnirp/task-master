'use client'

import { Header } from '@/components/layout/header'
import { CompletionTrendChart } from '@/components/analytics/completion-trend-chart'
import { CommitmentHeatmap } from '@/components/analytics/commitment-heatmap'
import { ProductivityReport } from '@/components/analytics/productivity-report'
import {
  getTaskStats,
  getCompletionTrend,
  getCategoryStats,
  getPriorityStats,
  getWeekdayHourHeatmap,
  getCurrentStreak,
} from '@/lib/sample-data'
import {
  CheckCircle2,
  Flame,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Clock,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const stats = getTaskStats()
const trend30 = getCompletionTrend(30)
const trend7 = getCompletionTrend(7)
const categoryStats = getCategoryStats()
const priorityStats = getPriorityStats()
const heatmap = getWeekdayHourHeatmap()
const streak = getCurrentStreak()

const completed7d = trend7.reduce((s, d) => s + d.completed, 0)
const created7d = trend7.reduce((s, d) => s + d.created, 0)
const rate7d = created7d > 0 ? Math.round((completed7d / created7d) * 100) : 0

export default function AnalyticsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Analytics" subtitle="Track your productivity and completion patterns" />

      <div className="flex-1 p-6 space-y-6">
        {/* Overview metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: CheckCircle2,
              label: 'Completion Rate',
              value: `${stats.completionRate}%`,
              sub: 'All time',
              color: 'text-green-600',
              bg: 'bg-green-50',
            },
            {
              icon: Flame,
              label: 'Current Streak',
              value: `${streak}d`,
              sub: 'Days in a row',
              color: 'text-orange-600',
              bg: 'bg-orange-50',
            },
            {
              icon: AlertTriangle,
              label: 'Overdue',
              value: stats.overdue,
              sub: 'Active tasks past due',
              color: stats.overdue > 0 ? 'text-red-500' : 'text-slate-400',
              bg: stats.overdue > 0 ? 'bg-red-50' : 'bg-slate-50',
            },
            {
              icon: TrendingUp,
              label: '7-Day Rate',
              value: `${rate7d}%`,
              sub: `${completed7d} completed this week`,
              color: 'text-indigo-600',
              bg: 'bg-indigo-50',
            },
          ].map(card => {
            const Icon = card.icon
            return (
              <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{card.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{card.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{card.sub}</p>
                  </div>
                  <div className={`p-2.5 rounded-lg ${card.bg}`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Completion trend chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <h2 className="text-sm font-semibold text-slate-800">Completion Trend (30 days)</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">Tasks created vs completed over the past month</p>
            <CompletionTrendChart data={trend30} />
          </div>

          {/* Category breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <h2 className="text-sm font-semibold text-slate-800">Category Completion</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">Completion rate per category</p>
            <div className="space-y-3.5">
              {categoryStats
                .sort((a, b) => b.total - a.total)
                .map(cat => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-700">{cat.category}</span>
                      <span className="text-slate-500">
                        {cat.completed}/{cat.total} &bull; <span className="font-semibold text-slate-700">{cat.rate}%</span>
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-500 transition-all"
                        style={{ width: `${cat.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-purple-500" />
            <h2 className="text-sm font-semibold text-slate-800">Commitment Patterns</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">Activity by day of week and hour (6am – 11pm)</p>
          <CommitmentHeatmap data={heatmap} />
        </div>

        {/* Productivity report */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-slate-800">Productivity Report</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">Breakdown by category and priority</p>
          <ProductivityReport categoryData={categoryStats} priorityData={priorityStats} />
        </div>
      </div>
    </div>
  )
}
