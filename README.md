# Task-Master

A web application for managing todo tasks with built-in performance analytics to help you understand and improve your commitment to task completion.

## Features

### Task Management
- Create, read, update, and delete tasks
- Organize tasks with priorities, due dates, and categories
- Tag tasks for flexible cross-category filtering
- Mark tasks as complete or in-progress; soft-cancel to preserve history

### Analytics & Insights
- Track completion rates over time (7d / 30d / 90d periods)
- Visualize commitment patterns — tasks created vs. completed by day/hour
- Identify overdue and repeatedly deferred tasks
- Productivity heatmaps and streak tracking
- Per-category and per-priority breakdown reports

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | [FastAPI](https://fastapi.tiangolo.com/) (Python) |
| Frontend | [Next.js](https://nextjs.org/) (App Router, TypeScript) |
| Database | PostgreSQL |
| ORM / Migrations | SQLAlchemy 2.x (async) + Alembic |
| Auth | JWT (stateless) |
| Task Queue | Celery + Redis |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Server State | TanStack Query (React Query) |
| API Types | openapi-typescript + openapi-fetch |
| Dev Environment | Docker Compose |

## Project Structure

```
task-master/
├── backend/           # FastAPI application
│   ├── app/
│   │   ├── models/        # SQLAlchemy ORM models
│   │   ├── schemas/       # Pydantic request/response schemas
│   │   ├── api/v1/        # Route handlers
│   │   ├── services/      # Business logic
│   │   ├── repositories/  # Data access layer (all SQL here)
│   │   └── workers/       # Celery tasks (daily analytics snapshots)
│   ├── migrations/    # Alembic migrations
│   └── tests/
├── frontend/          # Next.js application
│   └── src/
│       ├── app/           # App Router pages
│       ├── components/    # UI components (tasks + analytics)
│       ├── hooks/         # TanStack Query hooks
│       └── lib/api/       # Typed API client (auto-generated from OpenAPI)
├── docker-compose.yml
├── Makefile
└── .env.example
```

## Getting Started

### Prerequisites
- Docker & Docker Compose

### Run locally

```bash
cp .env.example .env
docker-compose up
```

- Backend API + Swagger docs: http://localhost:8000/docs
- Frontend: http://localhost:3000

### Common commands

```bash
make dev              # Start all services
make migrate          # Run Alembic migrations
make test             # Run backend tests
make generate-types   # Regenerate TypeScript types from FastAPI OpenAPI spec
```

## API Overview

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/tasks              # List with filter/sort/pagination
POST   /api/v1/tasks
PATCH  /api/v1/tasks/{id}
POST   /api/v1/tasks/{id}/complete
GET    /api/v1/analytics/summary
GET    /api/v1/analytics/completion-trend
GET    /api/v1/analytics/commitment-patterns
GET    /api/v1/analytics/productivity-report
```

Full interactive docs available at `/docs` when running locally.

## Contributing

Contribution guidelines will be added as the project develops.

## License

MIT
