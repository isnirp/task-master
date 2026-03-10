import { Task } from '@/types/task'

export const CATEGORIES = ['Work', 'Personal', 'Health', 'Learning', 'Finance', 'Home']

// Helper to build ISO date strings relative to today (2026-03-10)
function daysAgo(n: number): string {
  const d = new Date('2026-03-10')
  d.setDate(d.getDate() - n)
  return d.toISOString()
}
function daysFromNow(n: number): string {
  const d = new Date('2026-03-10')
  d.setDate(d.getDate() + n)
  return d.toISOString()
}

export const SAMPLE_TASKS: Task[] = [
  // --- COMPLETED ---
  {
    id: '1',
    title: 'Complete Q1 financial report',
    description: 'Compile revenue, expenses, and profit/loss statements for Q1 2026. Send to CFO by end of week.',
    status: 'completed',
    priority: 'urgent',
    category: 'Finance',
    tags: ['report', 'quarterly', 'finance'],
    due_date: daysAgo(5),
    created_at: daysAgo(15),
    completed_at: daysAgo(6),
    updated_at: daysAgo(6),
  },
  {
    id: '2',
    title: 'Schedule annual health checkup',
    description: 'Book appointment with GP for annual physical examination and blood work.',
    status: 'completed',
    priority: 'medium',
    category: 'Health',
    tags: ['health', 'medical'],
    due_date: daysAgo(8),
    created_at: daysAgo(20),
    completed_at: daysAgo(9),
    updated_at: daysAgo(9),
  },
  {
    id: '3',
    title: 'Read "Atomic Habits" chapters 1-5',
    description: 'Work through the first five chapters and take notes on the key habit formation concepts.',
    status: 'completed',
    priority: 'low',
    category: 'Learning',
    tags: ['reading', 'self-improvement', 'books'],
    due_date: daysAgo(10),
    created_at: daysAgo(25),
    completed_at: daysAgo(12),
    updated_at: daysAgo(12),
  },
  {
    id: '4',
    title: 'Fix login page bug',
    description: 'Users are being redirected incorrectly after OAuth login. Investigate and fix the redirect_uri issue.',
    status: 'completed',
    priority: 'urgent',
    category: 'Work',
    tags: ['bug', 'auth', 'frontend'],
    due_date: daysAgo(14),
    created_at: daysAgo(16),
    completed_at: daysAgo(14),
    updated_at: daysAgo(14),
  },
  {
    id: '5',
    title: 'Grocery shopping',
    description: 'Weekly grocery run. Get fruits, vegetables, protein sources, and household essentials.',
    status: 'completed',
    priority: 'medium',
    category: 'Personal',
    tags: ['shopping', 'errands'],
    due_date: daysAgo(3),
    created_at: daysAgo(5),
    completed_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: '6',
    title: 'Deep clean kitchen',
    description: 'Clean oven, fridge, countertops, and organize pantry shelves.',
    status: 'completed',
    priority: 'low',
    category: 'Home',
    tags: ['cleaning', 'home'],
    due_date: daysAgo(7),
    created_at: daysAgo(10),
    completed_at: daysAgo(7),
    updated_at: daysAgo(7),
  },
  {
    id: '7',
    title: 'Deploy new API version',
    description: 'Roll out v2.3.1 of the backend API including performance improvements and the new webhook system.',
    status: 'completed',
    priority: 'high',
    category: 'Work',
    tags: ['deployment', 'backend', 'api'],
    due_date: daysAgo(18),
    created_at: daysAgo(22),
    completed_at: daysAgo(18),
    updated_at: daysAgo(18),
  },
  {
    id: '8',
    title: 'Set up automatic savings transfer',
    description: 'Configure monthly automatic transfer of $500 to high-yield savings account.',
    status: 'completed',
    priority: 'medium',
    category: 'Finance',
    tags: ['savings', 'automation'],
    due_date: daysAgo(20),
    created_at: daysAgo(28),
    completed_at: daysAgo(21),
    updated_at: daysAgo(21),
  },
  {
    id: '9',
    title: 'Complete React advanced course module 3',
    description: 'Finish the performance optimization module covering memoization, code splitting, and lazy loading.',
    status: 'completed',
    priority: 'medium',
    category: 'Learning',
    tags: ['react', 'course', 'frontend'],
    due_date: daysAgo(12),
    created_at: daysAgo(30),
    completed_at: daysAgo(11),
    updated_at: daysAgo(11),
  },
  {
    id: '10',
    title: '30-minute morning run',
    description: 'Daily morning run along the river trail. Target 5km in under 30 minutes.',
    status: 'completed',
    priority: 'high',
    category: 'Health',
    tags: ['running', 'fitness', 'daily'],
    due_date: daysAgo(1),
    created_at: daysAgo(2),
    completed_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: '11',
    title: 'Prepare sprint retrospective slides',
    description: 'Create presentation for the Q1 sprint retrospective covering velocity, blockers, and improvements.',
    status: 'completed',
    priority: 'high',
    category: 'Work',
    tags: ['agile', 'presentation', 'planning'],
    due_date: daysAgo(30),
    created_at: daysAgo(35),
    completed_at: daysAgo(30),
    updated_at: daysAgo(30),
  },
  {
    id: '12',
    title: 'Fix leaky faucet in bathroom',
    description: 'Replace the worn washer in the bathroom tap to fix the constant drip.',
    status: 'completed',
    priority: 'medium',
    category: 'Home',
    tags: ['repair', 'plumbing'],
    due_date: daysAgo(25),
    created_at: daysAgo(30),
    completed_at: daysAgo(26),
    updated_at: daysAgo(26),
  },
  {
    id: '13',
    title: 'Review and rebalance investment portfolio',
    description: 'Check asset allocation, rebalance to target 70/30 stocks/bonds ratio, review individual positions.',
    status: 'completed',
    priority: 'high',
    category: 'Finance',
    tags: ['investing', 'portfolio'],
    due_date: daysAgo(40),
    created_at: daysAgo(45),
    completed_at: daysAgo(40),
    updated_at: daysAgo(40),
  },
  {
    id: '14',
    title: 'Complete TypeScript generics workshop',
    description: 'Work through the advanced TypeScript generics exercises on TypeScript Playground.',
    status: 'completed',
    priority: 'low',
    category: 'Learning',
    tags: ['typescript', 'workshop'],
    due_date: daysAgo(35),
    created_at: daysAgo(42),
    completed_at: daysAgo(36),
    updated_at: daysAgo(36),
  },
  {
    id: '15',
    title: 'Plan team offsite agenda',
    description: 'Draft agenda and logistics for the Q2 team offsite including team-building activities and strategy sessions.',
    status: 'completed',
    priority: 'medium',
    category: 'Work',
    tags: ['planning', 'team', 'event'],
    due_date: daysAgo(45),
    created_at: daysAgo(50),
    completed_at: daysAgo(46),
    updated_at: daysAgo(46),
  },

  // --- IN PROGRESS ---
  {
    id: '16',
    title: 'Build dashboard analytics feature',
    description: 'Implement real-time analytics dashboard with charts for user engagement, revenue trends, and funnel analysis.',
    status: 'in_progress',
    priority: 'high',
    category: 'Work',
    tags: ['frontend', 'analytics', 'dashboard'],
    due_date: daysFromNow(5),
    created_at: daysAgo(7),
    updated_at: daysAgo(1),
  },
  {
    id: '17',
    title: 'Write unit tests for payment module',
    description: 'Achieve 90% coverage for the payment processing module. Focus on edge cases and error handling.',
    status: 'in_progress',
    priority: 'high',
    category: 'Work',
    tags: ['testing', 'payments', 'backend'],
    due_date: daysFromNow(3),
    created_at: daysAgo(5),
    updated_at: daysAgo(1),
  },
  {
    id: '18',
    title: 'Learn Spanish - Duolingo streak',
    description: 'Complete daily Duolingo Spanish lesson. Currently on a 45-day streak.',
    status: 'in_progress',
    priority: 'medium',
    category: 'Learning',
    tags: ['language', 'spanish', 'daily'],
    due_date: daysFromNow(90),
    created_at: daysAgo(45),
    updated_at: daysAgo(0),
  },
  {
    id: '19',
    title: 'Renovate home office',
    description: 'Paint walls, add better lighting, organize cable management, and set up second monitor.',
    status: 'in_progress',
    priority: 'medium',
    category: 'Home',
    tags: ['renovation', 'workspace'],
    due_date: daysFromNow(14),
    created_at: daysAgo(10),
    updated_at: daysAgo(2),
  },
  {
    id: '20',
    title: 'Train for 10k race',
    description: 'Follow the 8-week training program for the city 10k race. Currently in week 3.',
    status: 'in_progress',
    priority: 'high',
    category: 'Health',
    tags: ['running', 'race', 'training'],
    due_date: daysFromNow(35),
    created_at: daysAgo(21),
    updated_at: daysAgo(1),
  },

  // --- PENDING ---
  {
    id: '21',
    title: 'Refactor authentication service',
    description: 'Migrate from session-based to JWT authentication. Update all API endpoints to use the new token validation.',
    status: 'pending',
    priority: 'urgent',
    category: 'Work',
    tags: ['backend', 'security', 'refactor'],
    due_date: daysFromNow(7),
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
  },
  {
    id: '22',
    title: 'File quarterly taxes',
    description: 'Gather all income documents, deductible expenses, and file Q1 2026 estimated taxes.',
    status: 'pending',
    priority: 'urgent',
    category: 'Finance',
    tags: ['taxes', 'quarterly', 'deadline'],
    due_date: daysFromNow(10),
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: '23',
    title: 'Schedule dentist appointment',
    description: '6-month checkup and cleaning. Contact downtown dental clinic.',
    status: 'pending',
    priority: 'medium',
    category: 'Health',
    tags: ['health', 'dental', 'appointment'],
    due_date: daysFromNow(20),
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: '24',
    title: 'Read "Clean Code" book',
    description: 'Work through Robert C. Martin\'s Clean Code for better software craftsmanship.',
    status: 'pending',
    priority: 'low',
    category: 'Learning',
    tags: ['reading', 'programming', 'books'],
    due_date: daysFromNow(30),
    created_at: daysAgo(4),
    updated_at: daysAgo(4),
  },
  {
    id: '25',
    title: 'Organize garage',
    description: 'Sort through stored items, donate unused items, install shelving system for better organization.',
    status: 'pending',
    priority: 'low',
    category: 'Home',
    tags: ['organization', 'home'],
    due_date: daysFromNow(25),
    created_at: daysAgo(6),
    updated_at: daysAgo(6),
  },
  {
    id: '26',
    title: 'Plan vacation to Japan',
    description: 'Research flights, accommodations, and itinerary for 2-week Japan trip in May.',
    status: 'pending',
    priority: 'medium',
    category: 'Personal',
    tags: ['travel', 'vacation', 'planning'],
    due_date: daysFromNow(45),
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
  },
  {
    id: '27',
    title: 'Update resume and LinkedIn',
    description: 'Add recent projects and skills to resume. Update LinkedIn with current role and achievements.',
    status: 'pending',
    priority: 'medium',
    category: 'Personal',
    tags: ['career', 'professional'],
    due_date: daysFromNow(15),
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
  },
  {
    id: '28',
    title: 'Implement dark mode for app',
    description: 'Add comprehensive dark mode support using CSS variables and system preference detection.',
    status: 'pending',
    priority: 'medium',
    category: 'Work',
    tags: ['frontend', 'ux', 'accessibility'],
    due_date: daysFromNow(12),
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: '29',
    title: 'Meal prep for the week',
    description: 'Cook batch meals: grilled chicken, roasted vegetables, and overnight oats for the week ahead.',
    status: 'pending',
    priority: 'high',
    category: 'Health',
    tags: ['nutrition', 'meal-prep', 'weekly'],
    due_date: daysFromNow(2),
    created_at: daysAgo(0),
    updated_at: daysAgo(0),
  },
  {
    id: '30',
    title: 'Review and cancel unused subscriptions',
    description: 'Audit all monthly subscriptions, cancel services not used in the past 3 months.',
    status: 'pending',
    priority: 'low',
    category: 'Finance',
    tags: ['savings', 'audit', 'subscriptions'],
    due_date: daysFromNow(8),
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },

  // --- CANCELLED ---
  {
    id: '31',
    title: 'Migrate database to PostgreSQL',
    description: 'Migrate from MySQL to PostgreSQL for better JSON support and performance.',
    status: 'cancelled',
    priority: 'high',
    category: 'Work',
    tags: ['database', 'migration', 'backend'],
    due_date: daysAgo(15),
    created_at: daysAgo(30),
    updated_at: daysAgo(20),
  },
  {
    id: '32',
    title: 'Join yoga class',
    description: 'Sign up for Tuesday/Thursday evening yoga class at the community center.',
    status: 'cancelled',
    priority: 'low',
    category: 'Health',
    tags: ['yoga', 'fitness', 'wellness'],
    due_date: daysAgo(20),
    created_at: daysAgo(35),
    updated_at: daysAgo(25),
  },
  {
    id: '33',
    title: 'Build personal portfolio website',
    description: 'Create a personal portfolio website using Next.js to showcase projects and blog posts.',
    status: 'cancelled',
    priority: 'medium',
    category: 'Personal',
    tags: ['portfolio', 'website', 'frontend'],
    due_date: daysAgo(60),
    created_at: daysAgo(75),
    updated_at: daysAgo(65),
  },
]

// ---- Derived helpers used across the app ----

export function getTaskById(id: string): Task | undefined {
  return SAMPLE_TASKS.find(t => t.id === id)
}

export function getTaskStats() {
  const today = new Date('2026-03-10')
  const todayStr = today.toISOString().split('T')[0]

  const total = SAMPLE_TASKS.length
  const completed = SAMPLE_TASKS.filter(t => t.status === 'completed').length
  const pending = SAMPLE_TASKS.filter(t => t.status === 'pending').length
  const inProgress = SAMPLE_TASKS.filter(t => t.status === 'in_progress').length
  const cancelled = SAMPLE_TASKS.filter(t => t.status === 'cancelled').length

  const completedToday = SAMPLE_TASKS.filter(t => {
    if (!t.completed_at) return false
    return t.completed_at.split('T')[0] === todayStr
  }).length

  const overdue = SAMPLE_TASKS.filter(t => {
    if (t.status === 'completed' || t.status === 'cancelled') return false
    return new Date(t.due_date) < today
  }).length

  const completionRate = total > 0 ? Math.round((completed / (total - cancelled)) * 100) : 0

  return { total, completed, pending, inProgress, cancelled, completedToday, overdue, completionRate }
}

export function getRecentTasks(limit = 5): Task[] {
  return [...SAMPLE_TASKS]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, limit)
}

export function getCompletionTrend(days = 30): Array<{ date: string; created: number; completed: number }> {
  const result: Array<{ date: string; created: number; completed: number }> = []
  const base = new Date('2026-03-10')

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(base)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]

    const created = SAMPLE_TASKS.filter(t => t.created_at.split('T')[0] === dateStr).length
    const completed = SAMPLE_TASKS.filter(t => t.completed_at && t.completed_at.split('T')[0] === dateStr).length

    result.push({ date: dateStr, created, completed })
  }

  return result
}

export function getCategoryStats(): Array<{ category: string; total: number; completed: number; rate: number }> {
  return CATEGORIES.map(cat => {
    const tasks = SAMPLE_TASKS.filter(t => t.category === cat)
    const completed = tasks.filter(t => t.status === 'completed').length
    const total = tasks.length
    return {
      category: cat,
      total,
      completed,
      rate: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  })
}

export function getPriorityStats(): Array<{ priority: string; total: number; completed: number; rate: number }> {
  const priorities = ['low', 'medium', 'high', 'urgent'] as const
  return priorities.map(p => {
    const tasks = SAMPLE_TASKS.filter(t => t.priority === p)
    const completed = tasks.filter(t => t.status === 'completed').length
    const total = tasks.length
    return {
      priority: p,
      total,
      completed,
      rate: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  })
}

export function getWeekdayHourHeatmap(): number[][] {
  // 7 rows (days 0=Sun..6=Sat) x 24 cols (hours)
  const matrix: number[][] = Array.from({ length: 7 }, () => new Array(24).fill(0))
  SAMPLE_TASKS.forEach(t => {
    const d = new Date(t.created_at)
    matrix[d.getDay()][d.getHours()]++
    if (t.completed_at) {
      const c = new Date(t.completed_at)
      matrix[c.getDay()][c.getHours()]++
    }
  })
  return matrix
}

export function getCurrentStreak(): number {
  const base = new Date('2026-03-10')
  let streak = 0
  for (let i = 0; i < 60; i++) {
    const d = new Date(base)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const completedOnDay = SAMPLE_TASKS.some(t => t.completed_at && t.completed_at.split('T')[0] === dateStr)
    if (completedOnDay) {
      streak++
    } else if (i > 0) {
      break
    }
  }
  return streak
}
