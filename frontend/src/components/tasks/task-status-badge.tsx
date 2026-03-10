import { TaskStatus, TaskPriority, STATUS_COLORS, PRIORITY_COLORS, STATUS_LABELS, PRIORITY_LABELS } from '@/types/task'
import { cn } from '@/lib/utils'

interface TaskStatusBadgeProps {
  status: TaskStatus
  className?: string
}

export function TaskStatusBadge({ status, className }: TaskStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        STATUS_COLORS[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}

interface TaskPriorityBadgeProps {
  priority: TaskPriority
  className?: string
}

export function TaskPriorityBadge({ priority, className }: TaskPriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        PRIORITY_COLORS[priority],
        className
      )}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  )
}
