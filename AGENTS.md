# Project: WorkForge.team

## Stack

Base: Next.js 15, T3, tRPC, React Query, Drizzle ORM, PostgreSQL, shadcn/ui, Tailwind CSS
View package.json file to get the dependencies and it's version the codebase is using.

Note: Read Readme.md file to get project idea.

## Do not

- No dark mode variants
- Use hugeicons over lucide-react
- Don't add comments in the codebase unless very necessary like particular code explaination.
- Don't explain what have you dont unless very necessary.

## Must do

- View components like Button, Input, etc as they are customized of shadcn
- You must analyze the pages and components to be aware of design patterns and design flow.
- Code must be scalable and maintainable.
- When adding new shadcn components, and when they ask for updating the exisiting components like buttons, reject them as it requires to customize it and it will deviate from the design system.

## Conventions

- TypeScript strict mode — no `any`, no type assertions without reason
- Zod for all input validation (tRPC inputs, forms)
- No inline styles — Tailwind only
- Light mode only — no `dark:` variants ever
- Hugeicons over lucide-react for all icons
- No comments unless explaining non-obvious logic
- Use react-hook-form for forms and with proper validations
- When adding a `select` tag, use shadcn/ui's select component.
