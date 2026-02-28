# Workforge

The all-in-one platform to manage your company — employees, tasks, payroll, performance, and AI insights in one place.

---

## What is Workforge?

Most companies run on 5–6 disconnected tools. Workforge replaces all of them. It's built for teams of 10–500 people who want the power of enterprise software without the complexity or cost.

---

## Features

- **Employee Management** — Profiles, documents, onboarding, offboarding
- **Attendance & Leave** — Clock in/out, leave requests, approvals, team calendar
- **Task Management** — Projects, tasks, Kanban boards, deadlines, time tracking
- **Payroll** — Salary structures, payslips, tax deductions, bank exports
- **Performance** — OKRs, review cycles, 360 feedback, continuous recognition
- **AI Assistant** — Ask questions, get insights, auto-generate reports
- **Analytics** — Dashboards and reports for HR, managers, and leadership

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| API | tRPC |
| Database | PostgreSQL via Supabase |
| ORM | Drizzle |
| Auth | better-auth |
| Realtime | Supabase Realtime |
| AI | OpenRouter + Vercel AI SDK |
| Background Jobs | Trigger.dev |
| Email | Resend |
| Payments | Stripe |
| Styling | Tailwind CSS + shadcn/ui |

---

## Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/Workforge.git
cd Workforge
```

**2. Install dependencies**
```bash
pnpm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in your keys for Supabase, better-auth, OpenRouter, Resend, and Stripe.

**4. Set up the database**
```bash
pnpm db:push
```

**5. Start the dev server**
```bash
pnpm dev
```

App runs at `http://localhost:3000`

---
