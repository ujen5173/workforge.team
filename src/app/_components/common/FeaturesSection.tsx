import {
  BarChart3,
  Bell,
  CalendarDays,
  ClipboardList,
  History,
  MessageSquare,
  Receipt,
  Trophy,
  Users,
} from "lucide-react";
import React from "react";

import { Masonry, MasonryItem } from "@/components/ui/masonry";
import { siteConfig } from "~/lib/site";

type Status = "good" | "warning" | "overdue";

function StatusDot({ status }: { status: Status }) {
  const color =
    status === "good"
      ? "bg-emerald-500"
      : status === "warning"
        ? "bg-amber-500"
        : "bg-red-500";

  return <span className={`h-2 w-2 rounded-full ${color}`} aria-hidden />;
}

type Row = {
  label: string;
  value: React.ReactNode;
  status?: Status;
  hasDividerTop?: boolean;
};

function FeatureRow({ row }: { row: Row }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 ${
        row.hasDividerTop ? "mt-2 border-t border-neutral-100 pt-2" : ""
      }`}
    >
      <div className="text-xs text-neutral-600">{row.label}</div>
      <div className="flex items-center gap-2 text-xs font-medium text-neutral-900">
        {row.status ? <StatusDot status={row.status} /> : null}
        {row.value}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  subtitle,
  rows,
  visual,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  rows: Row[];
  visual?: React.ReactNode;
}) {
  return (
    <div className="hover:border-primary/50 hover:from-primary/5 hover:to-primary/10 rounded-lg border border-neutral-100 bg-white p-5 shadow-sm transition duration-300 hover:bg-gradient-to-br">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] leading-5 font-semibold tracking-tight whitespace-nowrap text-neutral-900">
            {title}
          </div>
          <div className="mt-0.5 truncate text-[11px] leading-4 whitespace-nowrap text-neutral-500">
            {subtitle}
          </div>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-50 ring-1 ring-neutral-200">
          <span className="flex items-center justify-center text-neutral-400">
            {icon}
          </span>
        </div>
      </div>

      {visual ? <div className="mt-2">{visual}</div> : null}

      <div className="mt-3">
        {rows.map((row, idx) => (
          <FeatureRow
            key={row.label}
            row={{ ...row, hasDividerTop: idx !== 0 }}
          />
        ))}
      </div>
    </div>
  );
}

function MiniBar({
  value,
  max = 100,
  colorClass,
}: {
  value: number;
  max?: number;
  colorClass: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="w-20">
      <div className="h-1.5 rounded-full bg-neutral-100">
        <div
          className={`h-1.5 rounded-full ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="px-4 py-14 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div>
          <h2 className="text-[28px] leading-[1.1] font-bold tracking-tight text-neutral-700 md:text-[42px]">
            What {siteConfig.name} provides to your business
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 md:text-[15px]">
            {siteConfig.name} brings tasks, performance, leaves, payroll,
            rewards, and activity into one fast, multi-tenant system.
          </p>
        </div>

        <div className="mt-8">
          <Masonry
            linear={true}
            defaultWidth={1280}
            defaultHeight={900}
            gap={16}
          >
            <MasonryItem>
              <FeatureCard
                icon={<ClipboardList className="h-4 w-4 text-neutral-400" />}
                title="Task & Project Management"
                subtitle="Plan, assign, and track delivery across teams."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-600">Delivery health</span>
                      <span className="font-medium text-neutral-900">78%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-neutral-100">
                      <div
                        className="h-2 rounded-full bg-emerald-400"
                        style={{ width: "78%" }}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-500/20">
                        <span
                          className="h-2 w-2 rounded-full bg-emerald-400"
                          aria-hidden
                        />
                        Velocity +12%
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-700 ring-1 ring-amber-500/20">
                        <span
                          className="h-2 w-2 rounded-full bg-amber-400"
                          aria-hidden
                        />
                        Due today: 12
                      </span>
                    </div>
                  </div>
                }
                rows={[
                  {
                    label: "Active projects",
                    status: "good",
                    value: (
                      <div className="flex items-center gap-2">
                        6
                        <MiniBar value={65} colorClass="bg-emerald-400" />
                      </div>
                    ),
                  },
                  {
                    label: "Tasks due today",
                    status: "warning",
                    value: "12 due",
                  },
                  {
                    label: "Overdue tasks",
                    status: "overdue",
                    value: "3 overdue",
                  },
                  {
                    label: "Completed this week",
                    status: "good",
                    value: "28 completed",
                  },
                  {
                    label: "Avg. completion time",
                    status: "warning",
                    value: "2.4 days avg",
                  },
                ]}
              />
            </MasonryItem>

            <MasonryItem>
              <FeatureCard
                icon={<BarChart3 className="h-4 w-4 text-neutral-400" />}
                title="Performance Tracking"
                subtitle="Measure output with KPIs and workload-aware insights."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-[11px] text-neutral-600">
                          Workload signal
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          On balance
                        </div>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-neutral-200">
                        <span
                          className="h-2 w-2 rounded-full bg-emerald-500"
                          aria-hidden
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <div className="flex-1 rounded-lg bg-white p-2 ring-1 ring-neutral-200">
                        <div className="text-[10px] text-neutral-600">
                          Completion
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          92%
                        </div>
                      </div>
                      <div className="flex-1 rounded-lg bg-white p-2 ring-1 ring-neutral-200">
                        <div className="text-[10px] text-neutral-600">OKRs</div>
                        <div className="text-sm font-semibold text-neutral-900">
                          76%
                        </div>
                      </div>
                    </div>
                  </div>
                }
                rows={[
                  {
                    label: "Top performer this month",
                    status: "good",
                    value: "Aarav • 1,240 pts",
                  },
                  {
                    label: "Avg. task completion rate",
                    status: "good",
                    value: (
                      <div className="flex items-center gap-2">
                        92%
                        <MiniBar
                          value={92}
                          max={100}
                          colorClass="bg-emerald-400"
                        />
                      </div>
                    ),
                  },
                  {
                    label: "Employees on track",
                    status: "good",
                    value: "17 people",
                  },
                  {
                    label: "Flagged for review",
                    status: "overdue",
                    value: "4 flagged",
                  },
                ]}
              />
            </MasonryItem>

            <MasonryItem>
              <FeatureCard
                icon={<CalendarDays className="h-4 w-4 text-neutral-400" />}
                title="Leave Management"
                subtitle="Apply, approve, and keep every leave record audit-ready."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-neutral-400 ring-1 ring-neutral-200">
                        <span
                          className="h-2 w-2 rounded-full bg-amber-400"
                          aria-hidden
                        />
                      </span>
                      <div>
                        <div className="text-[11px] text-neutral-600">
                          Pending review
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          5 requests
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-500/20">
                        Sick: 2
                      </span>
                      <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-700 ring-1 ring-amber-500/20">
                        Casual: 9
                      </span>
                      <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-700 ring-1 ring-red-500/20">
                        Unpaid: 1
                      </span>
                    </div>
                  </div>
                }
                rows={[
                  {
                    label: "Pending approvals",
                    status: "warning",
                    value: "5 requests",
                  },
                  {
                    label: "Approved this month",
                    status: "good",
                    value: "23 approved",
                  },
                  {
                    label: "Sick leaves",
                    status: "overdue",
                    value: "2 logged",
                  },
                  { label: "Casual leaves", status: "good", value: "9 used" },
                  { label: "Leave balance (avg.)", value: "11.4 days avg" },
                ]}
              />
            </MasonryItem>

            <MasonryItem>
              <FeatureCard
                icon={<Receipt className="h-4 w-4 text-neutral-400" />}
                title="Payroll & Payment Visibility"
                subtitle="Transparent payouts, clear deductions, and full history."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-[11px] text-neutral-600">
                          Next payout
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          May 3
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-500/20">
                        98% on-time
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                      <div className="rounded-lg bg-white p-2 ring-1 ring-neutral-200">
                        <div className="text-[10px] text-neutral-600">
                          Net Pay
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          $3,240
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-2 ring-1 ring-neutral-200">
                        <div className="text-[10px] text-neutral-600">
                          Deductions
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          $680
                        </div>
                      </div>
                    </div>
                  </div>
                }
                rows={[
                  {
                    label: "Next payroll date",
                    status: "warning",
                    value: "May 3",
                  },
                  {
                    label: "Monthly payroll total",
                    value: "$48,250.30",
                  },
                  {
                    label: "Disbursed on time",
                    status: "good",
                    value: (
                      <div className="flex items-center gap-2">
                        98%
                        <MiniBar
                          value={98}
                          max={100}
                          colorClass="bg-emerald-400"
                        />
                      </div>
                    ),
                  },
                  {
                    label: "Pending adjustments",
                    status: "warning",
                    value: "7 items",
                  },
                ]}
              />
            </MasonryItem>

            <MasonryItem>
              <FeatureCard
                icon={<Trophy className="h-4 w-4 text-neutral-400" />}
                title="Rewards & Recognition"
                subtitle="Point-based motivation with automated rewards."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-[11px] text-neutral-600">
                          Next milestone
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          1,000 pts
                        </div>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-neutral-400 ring-1 ring-neutral-200">
                        <span
                          className="h-2 w-2 rounded-full bg-amber-400"
                          aria-hidden
                        />
                      </div>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-neutral-100">
                      <div
                        className="h-2 rounded-full bg-amber-400"
                        style={{ width: "62%" }}
                      />
                    </div>
                  </div>
                }
                rows={[
                  {
                    label: "Top 3 employees on leaderboard",
                    status: "good",
                    value: (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full bg-amber-400"
                            aria-hidden
                          />
                          Priya • 1,340
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full bg-emerald-400"
                            aria-hidden
                          />
                          Aarav • 1,240
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full bg-neutral-300"
                            aria-hidden
                          />
                          Mina • 1,105
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: "Rewards issued this month",
                    status: "good",
                    value: "12 rewards",
                  },
                  {
                    label: "Next milestone",
                    status: "warning",
                    value: "1,000 pts",
                  },
                ]}
              />
            </MasonryItem>

            <MasonryItem>
              <FeatureCard
                icon={<Users className="h-4 w-4 text-neutral-400" />}
                title="Team Directory"
                subtitle="Roles, departments, and reporting lines at a glance."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-[11px] text-neutral-600">
                          Org coverage
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          Verified
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {["A", "P", "M", "S"].map((c) => (
                          <span
                            key={c}
                            className="inline-flex size-7 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-neutral-700 ring-1 ring-neutral-200"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                }
                rows={[
                  { label: "Total employees", value: "42 employees" },
                  { label: "Departments", value: "6 departments" },
                  {
                    label: "New hires this month",
                    status: "good",
                    value: "5 new hires",
                  },
                  {
                    label: "Remote employees",
                    status: "warning",
                    value: "18 remote",
                  },
                ]}
              />
            </MasonryItem>

            <MasonryItem>
              <FeatureCard
                icon={<Bell className="h-4 w-4 text-neutral-400" />}
                title="Real-time Notifications"
                subtitle="Never miss updates across approvals, tasks, and payroll."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-[11px] text-neutral-600">
                          Unread avg.
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          3.2
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-700 ring-1 ring-amber-500/20">
                        Today: 84
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-[10px] font-medium text-neutral-800 ring-1 ring-neutral-200">
                        <span
                          className="h-2 w-2 rounded-full bg-emerald-400"
                          aria-hidden
                        />
                        Approvals
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-[10px] font-medium text-neutral-800 ring-1 ring-neutral-200">
                        <span
                          className="h-2 w-2 rounded-full bg-indigo-400"
                          aria-hidden
                        />
                        Tasks
                      </span>
                    </div>
                  </div>
                }
                rows={[
                  {
                    label: "Unread notifications (avg.)",
                    status: "warning",
                    value: "3.2 unread",
                  },
                  { label: "Most active channel", value: "Announcements" },
                  { label: "Notifications sent today", value: "84 sent" },
                ]}
              />
            </MasonryItem>

            <MasonryItem>
              <FeatureCard
                icon={<MessageSquare className="h-4 w-4 text-neutral-400" />}
                title="In-app Messaging"
                subtitle="Team chat, mentions, and updates that stay searchable."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-semibold text-neutral-500 ring-1 ring-neutral-200">
                          HR
                        </span>
                        <div className="min-w-0 flex-1 rounded-md bg-white p-2 ring-1 ring-neutral-200">
                          <div className="truncate text-[10px] text-neutral-600">
                            Leave policy update approved
                          </div>
                          <div className="mt-0.5 text-[10px] font-medium text-neutral-900">
                            2 mins ago
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-semibold text-neutral-500 ring-1 ring-neutral-200">
                        You
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-[10px] font-medium text-neutral-800 ring-1 ring-neutral-200">
                        <span
                          className="h-2 w-2 rounded-full bg-emerald-400"
                          aria-hidden
                        />
                        Mentions
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-[10px] font-medium text-neutral-800 ring-1 ring-neutral-200">
                        <span
                          className="h-2 w-2 rounded-full bg-indigo-400"
                          aria-hidden
                        />
                        Approvals
                      </span>
                    </div>
                  </div>
                }
                rows={[
                  { label: "Active conversations", value: "27 active" },
                  { label: "Messages today", value: "1,240 messages" },
                  {
                    label: "Mentions unread",
                    status: "overdue",
                    value: "6 mentions",
                  },
                ]}
              />
            </MasonryItem>

            <MasonryItem>
              <FeatureCard
                icon={<History className="h-4 w-4 text-neutral-400" />}
                title="Audit Log & Activity Feed"
                subtitle="Full traceability for decisions, updates, and compliance."
                visual={
                  <div className="rounded-lg border border-slate-200 bg-neutral-50 p-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-[11px] text-neutral-600">
                          Most active
                        </div>
                        <div className="text-sm font-semibold text-neutral-900">
                          Priya S.
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-700 ring-1 ring-red-500/20">
                        Retention: 24 mo
                      </span>
                    </div>
                  </div>
                }
                rows={[
                  { label: "Events logged today", value: "412 events" },
                  {
                    label: "Last action",
                    status: "good",
                    value: "Payroll run approved",
                  },
                  { label: "Most active user", value: "Priya S." },
                  {
                    label: "Retention period",
                    status: "warning",
                    value: "24 months",
                  },
                ]}
              />
            </MasonryItem>
          </Masonry>
        </div>
      </div>
    </section>
  );
}
