import {
  CheckCircle2,
  ClipboardList,
  Fingerprint,
  Globe,
  Laptop,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import React from "react";

import { siteConfig } from "~/lib/site";

type DealCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
};

function DealCard({ title, description, icon, preview }: DealCardProps) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-slate-900">
            {title}
          </h3>
          <p className="text-xs leading-snug text-slate-600">{description}</p>
        </div>
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-md bg-[#f5f3f0] ring-1 ring-black/10">
          {icon}
        </div>
      </div>

      <div className="mt-4">{preview}</div>
    </div>
  );
}

function PreviewRow({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-black/5">
      <div className="text-[11px] font-medium text-slate-800">{left}</div>
      <div className="text-[11px] font-semibold text-slate-700">{right}</div>
    </div>
  );
}

const DealsGrid = () => {
  return (
    <section aria-label={`${siteConfig.name} feature cards`} className="mt-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <DealCard
          title="Task & Project Management"
          description="Plan, assign, and track work across projects with deadlines, milestones, and real progress."
          icon={<Wallet className="h-5 w-5 text-slate-700" />}
          preview={
            <div className="space-y-3">
              <PreviewRow
                left={<span className="font-semibold">In Progress</span>}
                right={<span>14</span>}
              />
              <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">
                    Completed this week
                  </span>
                  <span className="text-slate-500">28</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[72%] rounded-full bg-emerald-400" />
                </div>
                <div className="mt-3 flex gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-50 px-2 py-2 ring-1 ring-black/5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[10px] font-semibold text-emerald-700">
                      Overdue — 3
                    </span>
                  </div>
                  <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-50 px-2 py-2 ring-1 ring-black/5">
                    <ShieldCheck className="h-3.5 w-3.5 text-slate-700" />
                    <span className="text-[10px] font-semibold text-slate-700">
                      Dependencies tracked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        <DealCard
          title="Performance Tracking"
          description="Monitor output and completion with KPIs, feedback cycles, and workload-aware insights."
          icon={<Users className="h-5 w-5 text-slate-700" />}
          preview={
            <div className="space-y-3">
              <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">
                    KPI health (this month)
                  </span>
                  <span className="text-slate-500">On track</span>
                </div>
                <div className="mt-3 grid gap-2">
                  {[
                    {
                      label: "Task completion rate",
                      color: "bg-emerald-500",
                      value: 92,
                    },
                    {
                      label: "OKR progress",
                      color: "bg-indigo-500",
                      value: 76,
                    },
                    {
                      label: "Workload balance signals",
                      color: "bg-amber-500",
                      value: 4,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-2 ring-1 ring-black/5"
                    >
                      <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
                        <span className={`size-2 rounded-full ${s.color}`} />
                        {s.label}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-600">
                        {s.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <PreviewRow
                left={<span className="font-semibold">Review cadence</span>}
                right={<span>Quarterly</span>}
              />
            </div>
          }
        />

        <DealCard
          title="Leave Management"
          description="Apply for leave in minutes, approve in real time, and keep HR records perfectly organized."
          icon={<Laptop className="h-5 w-5 text-slate-700" />}
          preview={
            <div className="space-y-3">
              <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">
                    Requests awaiting review
                  </span>
                  <span className="text-slate-500">3</span>
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { label: "Annual leave", done: true },
                    { label: "Sick leave", done: true },
                    { label: "Unpaid leave", done: false },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-2 ring-1 ring-black/5"
                    >
                      <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
                        {row.done ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Fingerprint className="h-3.5 w-3.5 text-slate-600" />
                        )}
                        {row.label}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-600">
                        {row.done ? "Approved" : "In review"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <PreviewRow
                left={<span className="font-semibold">Leave balances</span>}
                right={<span>Synced</span>}
              />
            </div>
          }
        />

        <DealCard
          title="Payroll & Payment Visibility"
          description="View salary, deductions, and payment history with transparent payslips and HR control."
          icon={<ShieldCheck className="h-5 w-5 text-slate-700" />}
          preview={
            <div className="space-y-3">
              <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">
                    Next payout
                  </span>
                  <span className="text-slate-500">May 3</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    {
                      label: "Net Pay",
                      color: "bg-emerald-500/10 text-emerald-700",
                    },
                    {
                      label: "Deductions",
                      color: "bg-red-500/10 text-red-700",
                    },
                    { label: "Taxes", color: "bg-sky-500/10 text-sky-700" },
                    {
                      label: "Reimbursements",
                      color: "bg-amber-500/10 text-amber-700",
                    },
                  ].map((b) => (
                    <span
                      key={b.label}
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold ring-1 ring-black/5 ${b.color}`}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
              <PreviewRow
                left={<span className="font-semibold">Payslips</span>}
                right={<span>6 available</span>}
              />
            </div>
          }
        />

        <DealCard
          title="Rewards & Recognition"
          description="Boost motivation with points-based recognition, automated rewards, and a leaderboard everyone can trust."
          icon={<ClipboardList className="h-5 w-5 text-slate-700" />}
          preview={
            <div className="space-y-3">
              <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">
                    Points leaderboard
                  </span>
                  <span className="text-slate-500">Live</span>
                </div>
                <div className="mt-3 grid gap-2">
                  {[
                    { label: "Points leader", dot: "bg-slate-600", value: 320 },
                    {
                      label: "Quality winner",
                      dot: "bg-indigo-500",
                      value: 275,
                    },
                    {
                      label: "Top collaborator",
                      dot: "bg-emerald-500",
                      value: 240,
                    },
                    {
                      label: "Most consistent",
                      dot: "bg-amber-500",
                      value: 210,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-2 ring-1 ring-black/5"
                    >
                      <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
                        <span className={`size-2 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-600">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <PreviewRow
                left={<span className="font-semibold">Automated rewards</span>}
                right={<span>3 issued</span>}
              />
            </div>
          }
        />

        <DealCard
          title="Team Directory & Org Chart"
          description="Search teammates by role and department, and understand reporting lines instantly."
          icon={<Globe className="h-5 w-5 text-slate-700" />}
          preview={
            <div className="space-y-3">
              <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">
                    Org chart status
                  </span>
                  <span className="text-slate-500">Synced</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-7 items-center justify-center rounded-lg bg-amber-500/15 text-[10px] font-semibold text-amber-700 ring-1 ring-black/5">
                      ENG
                    </span>
                    <span className="text-[10px] font-semibold text-slate-700">
                      Engineering
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-black/5">
                    2 org updates
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[58%] rounded-full bg-indigo-500/90" />
                </div>
              </div>
              <PreviewRow
                left={<span className="font-semibold">Directory coverage</span>}
                right={<span>Verified</span>}
              />
            </div>
          }
        />
      </div>
    </section>
  );
};

export default DealsGrid;
