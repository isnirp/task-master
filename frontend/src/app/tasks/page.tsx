'use client'

import { useState, useMemo } from 'react'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { TaskCard } from '@/components/tasks/task-card'
import { TaskFilters, FilterState } from '@/components/tasks/task-filters'
import { TaskDialog } from '@/components/tasks/task-dialog'
import { Button } from '@/components/ui/button'
import { SAMPLE_TASKS } from '@/lib/sample-data'
import { Task, TaskPriority } from '@/types/task'

const PAGE_SIZE = 8

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3,
}

export default function TasksPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    priority: 'all',
    category: '',
    sortBy: 'due_date',
  })
  const [page, setPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = useMemo(() => {
    let tasks = [...SAMPLE_TASKS]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      tasks = tasks.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.toLowerCase().includes(q))
      )
    }
    if (filters.status !== 'all') tasks = tasks.filter(t => t.status === filters.status)
    if (filters.priority !== 'all') tasks = tasks.filter(t => t.priority === filters.priority)
    if (filters.category) tasks = tasks.filter(t => t.category === filters.category)

    tasks.sort((a, b) => {
      switch (filters.sortBy) {
        case 'due_date':
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        case 'priority':
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
        case 'created_at':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return tasks
  }, [filters])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleFilterChange(newFilters: FilterState) {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Tasks"
        subtitle={`${filtered.length} task${filtered.length !== 1 ? 's' : ''} found`}
      />

      <div className="flex-1 p-6 space-y-4">
        {/* Filters */}
        <TaskFilters filters={filters} onChange={handleFilterChange} />

        {/* Header row */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {paginated.length} of {filtered.length} tasks
            {filters.status !== 'all' || filters.priority !== 'all' || filters.category || filters.search
              ? ' (filtered)'
              : ''}
          </p>
          <Button onClick={() => setDialogOpen(true)} className="gap-1.5">
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {/* Task list */}
        {paginated.length > 0 ? (
          <div className="space-y-2">
            {paginated.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">No tasks found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or create a new task</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    page === i + 1
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={task => console.log('Task created:', task)}
        mode="create"
      />
    </div>
  )
}
