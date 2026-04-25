<div align="center">

<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/logo-dark.svg">
  <img alt="Workforge" src="./public/logo-light.svg" height="40">
</picture>

<br />
<br />

**The All-in-One Company Operating System**

One platform for hiring, communicating, managing, and growing your team —
from day one to day done.

<br />

[![Status](https://img.shields.io/badge/status-in%20development-f59e0b?style=flat-square&labelColor=1a1a1a)](https://workforge.team)
[![License](https://img.shields.io/badge/license-MIT-3b82f6?style=flat-square&labelColor=1a1a1a)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-22c55e?style=flat-square&labelColor=1a1a1a)](./CONTRIBUTING.md)
[![Built with Next.js](https://img.shields.io/badge/built%20with-Next.js%2015-000000?style=flat-square&labelColor=1a1a1a)](https://nextjs.org)

<br />

[Website](https://workforge.team) · [Documentation](https://docs.workforge.team) · [Report a Bug](https://github.com/ujen5173/workforge.team/issues) · [Request a Feature](https://github.com/ujen5173/workforge.team/discussions)

<br />

</div>

---

## Overview

**Workforge** eliminates the need for 10+ fragmented workplace tools by bringing everything a company needs into a single, cohesive system — communication, HR, task management, performance tracking, payroll, recruitment, and more.

Built for teams that want clarity over chaos.

**Who is it for?**

| Audience               | What they get                                    |
| ---------------------- | ------------------------------------------------ |
| Companies of all sizes | A unified operating system from 5 to 500+ people |
| HR teams               | Full employee lifecycle management in one place  |
| Managers               | Real-time visibility without micromanagement     |
| Employees              | Clarity on their work, growth, and culture       |

---

## Table of Contents

- [Core Features](#core-features)
  - [Company & Employee Onboarding](#1-company--employee-onboarding)
  - [Communication Suite](#2-communication-suite)
  - [Task & Project Management](#3-task--project-management)
  - [Workload Intelligence](#4-workload-intelligence)
  - [Performance Tracking](#5-performance-tracking)
  - [Company Culture Hub](#6-company-culture-hub)
  - [Calendar & Leave Management](#7-calendar--leave-management)
  - [HR & Payroll](#8-hr--payroll)
  - [Document & Knowledge Base](#9-document--knowledge-base)
  - [Recruitment Pipeline](#10-recruitment-pipeline)
  - [Security & Compliance](#11-security--compliance)
  - [AI Layer](#12-ai-layer)
  - [Email Extraction](#13-email-extraction)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Core Features

### 1. Company & Employee Onboarding

- Company registration with org profile, branding, industry tags, and team size
- Custom onboarding flows per role and department — forms, documents, and e-signatures
- Employee self-onboarding portal with step-by-step guided setup
- Invite system via email, shareable link, or bulk CSV import
- Role-based access control — Admin, Manager, Employee, Contractor, Intern
- Auto-generated interactive org chart from team structure
- Employee directory with profiles, skills, contact info, and work history
- Multi-workspace support for companies with subsidiaries or multiple departments

---

### 2. Communication Suite

**Messenger**

- Direct messages, group chats, threaded replies, reactions, and @mentions
- Pinned messages, bookmarks, and message search
- Async voice and video messages
- Message translation for multilingual teams

**Channels**

- Organized by team, project, or topic
- Public, private, and read-only broadcast channels

**Video & Audio Conferencing**

- 1:1 and group calls with screen sharing and virtual backgrounds
- Session recording with auto-generated transcripts
- Scheduled and instant meeting support

**Presence & Status**

- Status indicators — Online, Busy, Away, In a meeting, Focus mode
- Do Not Disturb scheduling

**Announcements**

- Company-wide broadcasts from leadership with read receipts

---

### 3. Task & Project Management

- Task creation with title, description, priority, deadline, attachments, and multiple assignees
- Subtasks, checklists, and task dependencies
- Multiple views — Kanban board, List, Timeline (Gantt), and Calendar
- Project-level dashboards with milestones and progress tracking
- Task templates for recurring and standardized workflows
- Time tracking per task — manual entry and built-in timer
- Comment threads and activity history directly on tasks
- Workload view — see every team member's current assignments and capacity in real time
- Custom fields, labels, and filters per workspace

---

### 4. Workload Intelligence

- **Overload detection** — flags employees exceeding their set capacity thresholds
- **Idle detection** — surfaces underutilized employees available for task redistribution
- **Smart assignment engine** — suggests the best person for a task based on current load, skills, and availability
- Capacity planning by sprint, week, or month
- Work distribution reports across teams and individuals
- **Burnout risk scoring** — early warning alerts sent to managers before problems escalate
- Historical workload trends per employee and team

---

### 5. Performance Tracking

- KPI definition and tracking per employee, team, and department
- Customizable performance review cycles — quarterly, bi-annual, or annual
- OKR and SMART goal frameworks built in
- Performance scorecards with historical trend graphs and period comparisons
- Manager notes and one-on-one meeting logs with action items
- Recognition system — public shoutouts, achievement badges, and leaderboards
- Private improvement plans (PIP) managed within the platform
- AI-assisted review drafts for managers based on logged data

---

### 6. Company Culture Hub

- **Culture board** — showcase company values, mission, team milestones, and photos
- **Employee spotlight** — rotating features to highlight team members
- Polls and surveys — pulse checks, engagement scores, and anonymous feedback
- Virtual watercooler — casual non-work channels for interests, clubs, and hobbies
- **Mood check-ins** — optional daily emotional pulse with aggregated HR insights
- Celebration board — birthdays, work anniversaries, and promotions
- Learning & development section — share resources, courses, reading lists, and internal workshops
- Community spaces for ERGs (Employee Resource Groups)

---

### 7. Calendar & Leave Management

- Shared team and company-wide calendars
- **Leave management** — apply, approve, and reject requests with real-time balance tracking
- Leave types — paid, unpaid, sick, parental, casual, and compensatory
- Public holiday calendar auto-populated by country and region
- Meeting scheduler with cross-team availability detection
- Recurring events, reminders, and deadline syncing with tasks
- Two-way sync with Google Calendar and Microsoft Outlook

---

### 8. HR & Payroll

- Employee contracts, offer letters, and legal document storage with version history
- Payslip generation, download, and history for employees
- Expense claims — submit receipts, track approvals, and manage reimbursements

---

### 9. Document & Knowledge Base

- Internal wiki and knowledge base per team, project, or company-wide
- Rich document editor — text, tables, embeds, code blocks, and images
- File storage with version history and change tracking
- Pre-built document templates — policies, SOPs, meeting notes, and offer letters
- Global search across all content — messages, tasks, documents, and files
- Document access controls and sharing permissions

---

### 10. Recruitment Pipeline

- **Job Board** — HR creates and publishes listings to an internal board (for referrals) and a public-facing board (for external candidates), with rich job descriptions, requirements, and application forms — all hosted on your Workforge subdomain (e.g., `careers.acme.workforge.team`)
- **One-Click Apply** — candidates apply directly through the public listing; submissions land instantly in the ATS with no manual import
- **Applicant Tracking (ATS)** — visual pipeline with drag-and-drop stage management: `Applied → Screened → Interviewed → Offered → Hired`
- **In-Platform Screening** — HR conducts async video or written screening rounds directly inside the platform; no need for external tools
- **Interview Scheduling** — schedule live interview rounds linked to the built-in calendar; candidates receive an invite link, HR sees it on their dashboard
- **In-Platform Interviews** — conduct video and audio interviews natively with live note-taking alongside the call, powered by the built-in conferencing layer
- **Collaborative Hiring** — share scorecards, structured feedback, and hiring decisions across the hiring team; each member sees only what their role permits
- **Candidate Profiles** — full communication history, resume, screening responses, interview notes, and scores in one place
- **Offer Management** — generate and send offer letters directly from the platform; candidates accept or negotiate in the same thread
- **Onboarding Handoff** — once hired, candidate data converts to an employee profile with zero duplicate data entry

---

### 11. Security & Compliance

- SSO (Single Sign-On) with Google
- Two-factor authentication (2FA) and device management
- Full audit logs — who did what, when, and from where
- IP allowlist and session timeout controls

---

### 12. AI Layer

- **Meeting summaries** — auto-generated notes and action items after every call
- **Task suggestions** — creates tasks automatically from meeting notes or messages
- Writing assistant in messenger, documents, and performance reviews
- AI-generated performance review drafts for managers, pre-filled from logged data
- Contextual AI guidance across every module — everything is connected, so suggestions are always informed by the full picture

---

### 13. Email Extractions

- **Inboxes** — fetch user inbox and display the emails from inbox in the platform itself

---

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Frontend     | Next.js 15, Tailwind CSS, shadcn/ui |
| Backend      | Node.js, tRPC                       |
| Database     | PostgreSQL, Drizzle ORM             |
| Cache        | Redis                               |
| Real-time    | WebSockets                          |
| File Storage | S3-compatible                       |
| Auth         | NextAuth.js                         |
| Payments     | Stripe                              |
| Email        | Resend                              |
| Deployment   | Vercel, Docker                      |
| Analytics    | PostHog                             |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ujen5173/workforge.team.git
cd workforge.team

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm db:migrate

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

> See the [Notes.md](./notes.md).

---

## Contributing

Contributions, issues, and feature requests are welcome.
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit your changes using conventional commits
git commit -m "feat: describe your change"

# Push and open a pull request
git push origin feature/your-feature-name
```

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

<br />

Built by [Ujen Basi](https://ujenbasi.vercel.app)

[@ujen5173](https://github.com/ujen5173) · [workforge.team](https://workforge.team)

<br />

</div>
