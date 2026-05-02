# Contributing to WorkForge

Thank you for your interest in contributing to **WorkForge** — a multi-tenant team management platform built for small teams. This document outlines everything you need to get started, stay consistent, and ship with confidence.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Project Overview](#project-overview)
3. [Getting Started](#getting-started)
4. [AI Prompting Guidelines](#ai-prompting-guidelines)
5. [Branch Strategy](#branch-strategy)
6. [Commit Conventions](#commit-conventions)
7. [Pull Request Process](#pull-request-process)
8. [Architecture & Structure](#architecture--structure)
9. [Role & Access Model](#role--access-model)
10. [Feature Modules](#feature-modules)
11. [Coding Standards](#coding-standards)
12. [Testing](#testing)
13. [Multi-Tenancy Guidelines](#multi-tenancy-guidelines)
14. [Reporting Issues](#reporting-issues)

---

## Code of Conduct

All contributors are expected to be respectful, constructive, and professional. Harassment, gatekeeping, or dismissive behavior of any kind will not be tolerated. We're building something together — act like it.

---

## Project Overview

WorkForge is a SaaS platform targeting small teams (under 50 members). It is fully multi-tenant and feature rich.

| Role                    | Scope                             |
| ----------------------- | --------------------------------- |
| **CEO / Higher**        | Full platform access              |
| **HR**                  | People management & payroll layer |
| **Manager / Team Lead** | Team-scoped access                |
| **Employee**            | Self-scoped access                |

Feature modules are prioritized in this order:

1. Task & Project Management
2. Performance Tracking
3. Leave Management
4. Payroll & Payment Visibility
5. Rewards & Recognition
6. Team Directory
7. Email Directory

Collaboration features (notifications, chat, comments/mentions, activity feed, video/audio, email integration) are built alongside the above.

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- pnpm >= 8.x
- Git
- Energy, drive and motivation to build something.

### AI Conventions

View [AGENTS.md](./AGENTS.md) file to get AI conventions. This is a must to follow.

### Setup

```bash
# Clone the repo
git clone https://github.com/ujen5173/workforge.git
cd workforge

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
pnpm dev
```

Refer to `.env.example` for required environment variables. Never commit `.env.local` or any secrets.

---

## Branch Strategy

We follow a **trunk-based development** model with short-lived feature branches.

| Branch           | Purpose                             |
| ---------------- | ----------------------------------- |
| `main`           | Production-ready code               |
| `dev`            | Integration branch for staging      |
| `feature/<name>` | New features                        |
| `fix/<name>`     | Bug fixes                           |
| `chore/<name>`   | Tooling, config, dependency updates |
| `docs/<name>`    | Documentation changes only          |

Branch off `dev` for all new work. Merges to `main` are release-gated.

```bash
git checkout dev
git pull origin dev
git checkout -b feature/leave-management-calendar
```

---

## Commit Conventions

We use **Conventional Commits**. Every commit message must follow this format:

```
<type>(<scope>): <short summary>
```

### Types

| Type       | When to use                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature                                           |
| `fix`      | A bug fix                                               |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`     | Performance improvement                                 |
| `test`     | Adding or updating tests                                |
| `docs`     | Documentation only                                      |
| `chore`    | Build process, tooling, dependencies                    |
| `ui`       | Formatting, missing semicolons — no logic change        |

### Examples

```
feat(tasks): add multi-assignee support to task editor
fix(finance): correct net pay calculation for partial month
refactor(dashboard): consolidate role-based view routing
chore: upgrade to Node 20 LTS
docs: update contributing guide with branch strategy
```

---

## Pull Request Process

1. **Branch from `dev`**, not `main`.
2. Keep PRs **small and focused** — one concern per PR.
3. Fill out the PR template fully (description, type of change, testing steps, screenshots if UI).
4. Self-review your diff before requesting review.
5. All PRs require at least **one approving review** before merging.
6. Resolve all review comments before merging — don't dismiss without addressing.
7. Squash commits on merge unless history is meaningful.
8. Delete the branch after merging.

### PR Title Format

Follow the same Conventional Commits format:

```
feat(rewards): implement points-based leaderboard with automated triggers
```

---

### Role Definitions

| Role       | Key Permissions                                            |
| ---------- | ---------------------------------------------------------- |
| `ceo`      | All modules, all teams, all tenants' org data              |
| `hr`       | People management, payroll, leave approvals, performance   |
| `manager`  | Team-scoped tasks, performance, leave for their reports    |
| `employee` | Own tasks, own leave, own payroll summary, own performance |

---

## Feature Modules

When contributing to a specific module, follow these guidelines:

### 1. Task & Project Management

The most complex module. Supports Projects → Tasks → Subtasks hierarchy, multi-assignee, time tracking, file attachments, custom fields, and a calendar view. Changes here require thorough testing given the dependency surface.

### 2. Performance Tracking

Linked to Rewards. Any metric changes here may trigger automated reward logic — coordinate with the Rewards module owner.

### 3. Leave Management

Involves approval workflows. Ensure role-based approval chains are respected. Do not break existing leave balance calculations.

### 4. Payroll & Payment Visibility

Read-heavy for employees, write-heavy for HR. Never expose another employee's payroll data. All payroll endpoints are tenant- and role-scoped.

### 5. Rewards & Recognition

Points are metric-driven and partially automated. Manual overrides are CEO/HR only. Leaderboard is visible to all roles (read-only for employees).

### 6. Team Directory

Tenant-scoped. Searchable and filterable. Avatar/profile changes go through this module.

### 7. Email Directory

## Access company inbox emails from here directly without opening external sites or platforms.

## Coding Standards

- **TypeScript** is required — no `any` unless absolutely necessary and commented.
- Use **named exports** for components; default exports for pages/routes only.
- Co-locate component styles, tests, and types where practical.
- Avoid prop drilling beyond 2 levels — use context or a store.
- All API responses must be typed. Use shared types from `/types`.
- Error boundaries around all major module views.
- Accessibility: interactive elements must be keyboard-navigable and have appropriate ARIA labels.

---

## Multi-Tenancy Guidelines

WorkForge is **fully multi-tenant**. Every data model has a `tenantId`. When writing queries or mutations:

- Always scope to the current tenant. Never query without a `tenantId` filter on tenant-owned resources.
- Tenant resolution happens in middleware — use the provided context/helper, don't derive it yourself.
- When seeding or writing tests, use isolated test tenants.
- Never use shared state (in-memory caches, global variables) that could leak across tenants.

---

## Reporting Issues

- Use the GitHub Issues tracker.
- Include: what you expected, what happened, steps to reproduce, environment details.
- For security vulnerabilities, **do not open a public issue** — email `security@workforge.team` directly.
- Tag issues with the relevant module label (`module: tasks`, `module: payroll`, etc.) and role label if applicable.

---

_Built with care for small teams. Every contribution matters._
