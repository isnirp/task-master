'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Task, TaskStatus, TaskPriority, CATEGORIES } from '@/types/task'

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (task: Partial<Task>) => void
  initialTask?: Partial<Task>
  mode?: 'create' | 'edit'
}

export function TaskDialog({ open, onOpenChange, onSave, initialTask, mode = 'create' }: TaskDialogProps) {
  const [form, setForm] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    category: 'Work',
    tags: [],
    due_date: new Date().toISOString().split('T')[0],
    ...initialTask,
  })
  const [tagsInput, setTagsInput] = useState((initialTask?.tags ?? []).join(', '))

  function handleChange(key: keyof Task, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    onSave?.({ ...form, tags })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
            <Input
              id="title"
              value={form.title ?? ''}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Enter task title"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <textarea
              id="description"
              value={form.description ?? ''}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Optional description..."
              rows={3}
              className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
              <select
                id="priority"
                value={form.priority}
                onChange={e => handleChange('priority', e.target.value)}
                className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {(['low', 'medium', 'high', 'urgent'] as TaskPriority[]).map(p => (
                  <option key={p} value={p} className="capitalize">{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">Status</Label>
              <select
                id="status"
                value={form.status}
                onChange={e => handleChange('status', e.target.value)}
                className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {(['pending', 'in_progress', 'completed', 'cancelled'] as TaskStatus[]).map(s => (
                  <option key={s} value={s}>{s === 'in_progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <select
                id="category"
                value={form.category}
                onChange={e => handleChange('category', e.target.value)}
                className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="due_date" className="text-sm font-medium">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={form.due_date ? form.due_date.split('T')[0] : ''}
                onChange={e => handleChange('due_date', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="comma, separated, tags"
              className="mt-1"
            />
            <p className="text-xs text-slate-400 mt-1">Separate tags with commas</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!form.title?.trim()}>
            {mode === 'create' ? 'Create Task' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
