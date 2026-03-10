import Link from 'next/link'
import { Calendar, Tag, FolderOpen } from 'lucide-react'
import { Task } from '@/types/task'
import { TaskStatusBadge, TaskPriorityBadge } from './task-status-badge'
import { cn } from '@/lib/utils'
import { format, isPast, isToday } from 'date-fns'

interface TaskCardProps {
  task: Task
  className?: string
}

export function TaskCard({ task, className }: TaskCardProps) {
  const dueDate = new Date(task.due_date)
  const isOverdue = isPast(dueDate) && task.status !== 'completed' && task.status !== 'cancelled'
  const isDueToday = isToday(dueDate)

  return (
    <Link href={`/tasks/${task.id}`}>
      <div
        className={cn(
          'group bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer',
          task.status === 'completed' && 'opacity-75',
          className
        )}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className={cn(
              'text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-700 transition-colors',
              task.status === 'completed' && 'line-through text-slate-500'
            )}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            <TaskPriorityBadge priority={task.priority} />
            <TaskStatusBadge status={task.status} />
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{task.description}</p>
        )}

        {/* Footer row */}
        <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
          {/* Category */}
          <span className="flex items-center gap-1">
            <FolderOpen className="w-3 h-3" />
            {task.category}
          </span>

          {/* Due date */}
          <span
            className={cn(
              'flex items-center gap-1',
              isOverdue && 'text-red-600 font-medium',
              isDueToday && !isOverdue && 'text-orange-600 font-medium'
            )}
          >
            <Calendar className="w-3 h-3" />
            {isOverdue ? 'Overdue · ' : isDueToday ? 'Due today · ' : ''}
            {format(dueDate, 'MMM d, yyyy')}
          </span>

          {/* Tags */}
          {task.tags.slice(0, 2).map(tag => (
            <span key={tag} className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded-full">
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span className="text-slate-400">+{task.tags.length - 2}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
