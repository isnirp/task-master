'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, FolderOpen, Tag, Clock, Pencil, Trash2, CheckCircle, XCircle, PlayCircle } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { TaskStatusBadge, TaskPriorityBadge } from '@/components/tasks/task-status-badge'
import { TaskDialog } from '@/components/tasks/task-dialog'
import { Button } from '@/components/ui/button'
import { getTaskById, SAMPLE_TASKS } from '@/lib/sample-data'
import { Task, TaskStatus } from '@/types/task'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')

  const [task, setTask] = useState<Task | undefined>(() => getTaskById(id))
  const [editOpen, setEditOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)

  if (deleted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-600">Task deleted.</p>
        <Button onClick={() => router.push('/tasks')} variant="outline">Back to Tasks</Button>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="flex-1 flex flex-col">
        <Header title="Task Not Found" />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-slate-500">Task #{id} was not found.</p>
          <Button onClick={() => router.push('/tasks')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>
        </div>
      </div>
    )
  }

  function handleStatusChange(newStatus: TaskStatus) {
    if (!task) return
    setTask({ ...task, status: newStatus, updated_at: new Date().toISOString() })
  }

  function handleDelete() {
    setDeleted(true)
  }

  function handleEdit(updated: Partial<Task>) {
    if (!task) return
    setTask({ ...task, ...updated, updated_at: new Date().toISOString() })
  }

  const statusActions: Array<{ status: TaskStatus; label: string; icon: React.ElementType; colorClass: string }> = [
    { status: 'pending', label: 'Mark Pending', icon: Clock, colorClass: 'text-yellow-600 border-yellow-200 hover:bg-yellow-50' },
    { status: 'in_progress', label: 'Start', icon: PlayCircle, colorClass: 'text-blue-600 border-blue-200 hover:bg-blue-50' },
    { status: 'completed', label: 'Complete', icon: CheckCircle, colorClass: 'text-green-600 border-green-200 hover:bg-green-50' },
    { status: 'cancelled', label: 'Cancel', icon: XCircle, colorClass: 'text-slate-500 border-slate-200 hover:bg-slate-50' },
  ]

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Task Detail" subtitle={`#${task.id}`} />

      <div className="flex-1 p-6 max-w-3xl">
        {/* Back button */}
        <button
          onClick={() => router.push('/tasks')}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </button>

        {/* Main card */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className={cn(
                  'text-xl font-bold text-slate-900 mb-2',
                  task.status === 'completed' && 'line-through text-slate-400'
                )}>
                  {task.title}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <TaskStatusBadge status={task.status} />
                  <TaskPriorityBadge priority={task.priority} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditOpen(true)}
                  className="gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Description */}
            {task.description && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Description</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{task.description}</p>
              </div>
            )}

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Category</p>
                <div className="flex items-center gap-1.5 text-sm text-slate-700">
                  <FolderOpen className="w-3.5 h-3.5 text-slate-400" />
                  {task.category}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Due Date</p>
                <div className="flex items-center gap-1.5 text-sm text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {format(new Date(task.due_date), 'MMM d, yyyy')}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Created</p>
                <div className="flex items-center gap-1.5 text-sm text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {format(new Date(task.created_at), 'MMM d, yyyy')}
                </div>
              </div>
              {task.completed_at && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Completed</p>
                  <div className="flex items-center gap-1.5 text-sm text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    {format(new Date(task.completed_at), 'MMM d, yyyy')}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-400 mb-1">Last Updated</p>
                <div className="flex items-center gap-1.5 text-sm text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {format(new Date(task.updated_at), 'MMM d, yyyy')}
                </div>
              </div>
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {task.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Status actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">Change Status</p>
            <div className="flex flex-wrap gap-2">
              {statusActions.map(({ status, label, icon: Icon, colorClass }) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={task.status === status}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
                    colorClass
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TaskDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={handleEdit}
        initialTask={task}
        mode="edit"
      />
    </div>
  )
}
