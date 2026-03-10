'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CATEGORIES, TaskStatus, TaskPriority } from '@/types/task'

export interface FilterState {
  search: string
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
  category: string
  sortBy: 'due_date' | 'priority' | 'created_at' | 'title'
}

interface TaskFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

const statusOptions: Array<{ value: FilterState['status']; label: string }> = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const priorityOptions: Array<{ value: FilterState['priority']; label: string }> = [
  { value: 'all', label: 'All Priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

const sortOptions: Array<{ value: FilterState['sortBy']; label: string }> = [
  { value: 'due_date', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'created_at', label: 'Created' },
  { value: 'title', label: 'Title' },
]

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== '' ||
    filters.search !== ''

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onChange({ ...filters, [key]: value })
  }

  function reset() {
    onChange({ search: '', status: 'all', priority: 'all', category: '', sortBy: 'due_date' })
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={e => update('search', e.target.value)}
          className="pl-9 bg-slate-50 border-slate-200"
        />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Status */}
        <select
          value={filters.status}
          onChange={e => update('status', e.target.value as FilterState['status'])}
          className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
        >
          {statusOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Priority */}
        <select
          value={filters.priority}
          onChange={e => update('priority', e.target.value as FilterState['priority'])}
          className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
        >
          {priorityOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={e => update('category', e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Sort */}
        <span className="text-xs text-slate-500">Sort:</span>
        <select
          value={filters.sortBy}
          onChange={e => update('sortBy', e.target.value as FilterState['sortBy'])}
          className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
        >
          {sortOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={reset} className="text-slate-500 hover:text-slate-700 ml-auto">
            <X className="w-3.5 h-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
