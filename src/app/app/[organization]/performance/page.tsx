"use client";

import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  Calendar03Icon,
  ChartIncreaseIcon,
  CheckListIcon,
  CheckmarkCircle01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Edit01Icon,
  FolderLibraryIcon,
  PlusSignIcon,
  SparklesIcon,
  Target01Icon,
  UserGroupIcon
} from "hugeicons-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Period = "month" | "quarter" | "year";

interface ScoreMetric {
  name: string;
  weight: number;
  value: string;
  numeric: number;
  delta: string;
  trend: "up" | "down" | "flat";
  icon: React.ElementType;
}

interface RecentTask {
  id: string;
  title: string;
  project: string;
  completedDate: string;
}

interface Project {
  id: string;
  name: string;
  progress: number;
  milestonesHit: number;
  milestones: number;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  status: "on-track" | "at-risk" | "completed" | "overdue";
  targetDate: string;
  note?: string;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────────

const periodData: Record<
  Period,
  { score: number; delta: number; label: string; insight: string }
> = {
  month: {
    score: 84,
    delta: 6,
    label: "Good",
    insight: "Your on-time delivery improved significantly this month.",
  },
  quarter: {
    score: 78,
    delta: 3,
    label: "Good",
    insight: "Steady progress across all metrics this quarter.",
  },
  year: {
    score: 71,
    delta: -2,
    label: "Needs Improvement",
    insight: "Goal completion rate dipped — worth reviewing your targets.",
  },
};

const scoreMetrics: ScoreMetric[] = [
  {
    name: "Task Completion",
    weight: 35,
    value: "87%",
    numeric: 87,
    delta: "+4%",
    trend: "up",
    icon: CheckListIcon,
  },
  {
    name: "On-Time Delivery",
    weight: 25,
    value: "91%",
    numeric: 91,
    delta: "+9%",
    trend: "up",
    icon: Clock01Icon,
  },
  {
    name: "Goal Progress",
    weight: 20,
    value: "73%",
    numeric: 73,
    delta: "-2%",
    trend: "down",
    icon: Target01Icon,
  },
  {
    name: "Attendance",
    weight: 10,
    value: "96%",
    numeric: 96,
    delta: "0%",
    trend: "flat",
    icon: Calendar03Icon,
  },
  {
    name: "Peer Feedback",
    weight: 10,
    value: "4.2 / 5",
    numeric: 84,
    delta: "+0.3",
    trend: "up",
    icon: UserGroupIcon,
  },
];

const recentTasks: RecentTask[] = [
  {
    id: "1",
    title: "Redesign onboarding flow wireframes",
    project: "ElevenHype",
    completedDate: "Apr 20, 2026",
  },
  {
    id: "2",
    title: "Set up CI/CD pipeline for staging env",
    project: "Trinity CMS",
    completedDate: "Apr 18, 2026",
  },
  {
    id: "3",
    title: "Write Q2 product specification doc",
    project: "Internal",
    completedDate: "Apr 15, 2026",
  },
];

const activeProjects: Project[] = [
  {
    id: "1",
    name: "ElevenHype — Redesign",
    progress: 68,
    milestonesHit: 5,
    milestones: 8,
  },
  {
    id: "2",
    name: "Trinity CMS Integration",
    progress: 42,
    milestonesHit: 2,
    milestones: 6,
  },
  {
    id: "3",
    name: "Q2 Hiring Dashboard",
    progress: 90,
    milestonesHit: 4,
    milestones: 4,
  },
];

const generateHeatmap = () => {
  const days: { date: string; count: number }[] = [];
  const today = new Date(2026, 3, 22);
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const count = isWeekend
      ? Math.random() < 0.25
        ? Math.floor(Math.random() * 3)
        : 0
      : Math.floor(Math.random() * 9);
    days.push({ date: d.toISOString().split("T")[0]!, count });
  }
  return days;
};
const heatmapData = generateHeatmap();

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Complete AWS Solutions Architect certification",
    progress: 65,
    status: "on-track",
    targetDate: "Jun 30, 2026",
    note: "Finished 3 of 6 practice exams. Scheduling mock exam next week.",
  },
  {
    id: "2",
    title: "Mentor two junior engineers this quarter",
    progress: 50,
    status: "on-track",
    targetDate: "Jun 30, 2026",
  },
  {
    id: "3",
    title: "Ship v2 of internal component library",
    progress: 20,
    status: "at-risk",
    targetDate: "May 15, 2026",
  },
  {
    id: "4",
    title: "Lead bi-weekly design reviews",
    progress: 100,
    status: "completed",
    targetDate: "Mar 31, 2026",
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────

function getScoreColor(score: number) {
  if (score >= 90) return "text-emerald-600";
  if (score >= 75) return "text-primary";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
}

function getScoreBadge(label: string) {
  const map: Record<string, string> = {
    Exceptional: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Good: "bg-primary/5 text-primary border-primary/20",
    "Needs Improvement": "bg-amber-50 text-amber-700 border-amber-200",
    "At Risk": "bg-red-50 text-red-700 border-red-200",
  };
  return map[label] ?? "bg-neutral-100 text-slate-600 border-neutral-200";
}

function getTrendBarColor(numeric: number) {
  if (numeric >= 80) return "bg-primary";
  if (numeric >= 60) return "bg-amber-500";
  return "bg-red-400";
}

function getStatusStyle(status: Goal["status"]) {
  const map: Record<Goal["status"], string> = {
    "on-track":
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "at-risk": "bg-amber-50 text-amber-700 border border-amber-200",
    completed: "bg-primary/5 text-primary border border-primary/20",
    overdue: "bg-red-50 text-red-700 border border-red-200",
  };
  return map[status];
}

function getStatusLabel(status: Goal["status"]) {
  const map: Record<Goal["status"], string> = {
    "on-track": "On Track",
    "at-risk": "At Risk",
    completed: "Completed",
    overdue: "Overdue",
  };
  return map[status];
}

function getHeatCell(count: number) {
  if (count === 0) return "bg-neutral-100";
  if (count <= 2) return "bg-primary/20";
  if (count <= 4) return "bg-primary/40";
  if (count <= 6) return "bg-primary/70";
  return "bg-primary";
}

// ─── Score Arc ──────────────────────────────────────────────────────────────────

function ScoreArc({ score }: { score: number }) {
  const r = 52;
  const cx = 64;
  const cy = 64;
  const circumference = 2 * Math.PI * r;
  const strokeDash = (score / 100) * circumference;
  const color =
    score >= 90
      ? "#10b981"
      : score >= 75
        ? "var(--primary)"
        : score >= 60
          ? "#f59e0b"
          : "#ef4444";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 128, height: 128 }}>
      <svg width={128} height={128} className="-rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={9} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-3xl font-black leading-none", getScoreColor(score))}>
          {score}
        </span>
        <span className="text-[11px] text-muted-foreground">/&nbsp;100</span>
      </div>
    </div>
  );
}

// ─── Heatmap ────────────────────────────────────────────────────────────────────

function Heatmap({ data }: { data: { date: string; count: number }[] }) {
  const firstDate = new Date(data[0]!.date);
  const startDow = firstDate.getDay();
  const padded: ({ date: string; count: number } | null)[] = [
    ...Array<null>(startDow).fill(null),
    ...data,
  ];
  const weeks: (typeof padded[0])[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, wi) => {
    const first = week.find(Boolean);
    if (first) {
      const d = new Date(first.date);
      if (d.getDate() <= 7) {
        monthLabels.push({
          label: d.toLocaleString("default", { month: "short" }),
          col: wi,
        });
      }
    }
  });

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex gap-2">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] pt-[22px]">
          {dayLabels.map((d, i) => (
            <div
              key={i}
              className="flex h-[12px] items-center text-[9px] text-muted-foreground"
            >
              {i % 2 === 1 ? d : ""}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-1 overflow-x-auto">
          {/* Month labels */}
          <div className="relative flex h-[18px] gap-[3px]">
            {weeks.map((_, wi) => {
              const lbl = monthLabels.find((m) => m.col === wi);
              return (
                <div key={wi} className="relative w-[12px]">
                  {lbl && (
                    <span className="absolute left-0 whitespace-nowrap text-[9px] text-muted-foreground">
                      {lbl.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cells */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week[di] ?? null;
                  return (
                    <Tooltip key={di}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "h-[12px] w-[12px] rounded-[2px] transition-opacity",
                            day ? getHeatCell(day.count) : "bg-transparent",
                          )}
                        />
                      </TooltipTrigger>
                      {day && (
                        <TooltipContent side="top">
                          <span className="font-medium">{day.date}</span>
                          <span className="ml-1 text-muted-foreground">
                            — {day.count}{" "}
                            {day.count === 1 ? "activity" : "activities"}
                          </span>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="text-[10px] text-muted-foreground">Less</span>
        {[
          "bg-neutral-100",
          "bg-primary/20",
          "bg-primary/40",
          "bg-primary/70",
          "bg-primary",
        ].map((c, i) => (
          <div key={i} className={cn("h-[12px] w-[12px] rounded-[2px]", c)} />
        ))}
        <span className="text-[10px] text-muted-foreground">More</span>
      </div>
    </TooltipProvider>
  );
}

// ─── Donut ──────────────────────────────────────────────────────────────────────

function Donut({
  completed,
  overdue,
  pending,
}: {
  completed: number;
  overdue: number;
  pending: number;
}) {
  const total = completed + overdue + pending;
  const r = 36;
  const cx = 44;
  const cy = 44;
  const circum = 2 * Math.PI * r;

  const segs = [
    { val: completed, color: "var(--primary)" },
    { val: overdue, color: "#ef4444" },
    { val: pending, color: "#e2e8f0" },
  ];

  let acc = 0;
  return (
    <div className="relative shrink-0" style={{ width: 88, height: 88 }}>
      <svg viewBox="0 0 88 88" width={88} height={88}>
        {segs.map((s, i) => {
          const dash = (s.val / total) * circum;
          const el = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={10}
              strokeDasharray={`${dash} ${circum - dash}`}
              strokeDashoffset={-acc}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          );
          acc += dash;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-black text-slate-800">{completed}</span>
        <span className="text-[9px] text-muted-foreground">done</span>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function PerformancePage() {
  const [period, setPeriod] = useState<Period>("quarter");
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [collapseDone, setCollapseDone] = useState(true);
  const [addGoalOpen, setAddGoalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const { score, delta, label, insight } = periodData[period];
  const activeGoals = goals.filter((g) => g.status !== "completed");
  const doneGoals = goals.filter((g) => g.status === "completed");
  const taskStats = { assigned: 47, completed: 41, overdue: 3, pending: 3 };

  function addGoal() {
    if (!newTitle.trim()) return;
    setGoals((prev) => [
      {
        id: Date.now().toString(),
        title: newTitle,
        progress: 0,
        status: "on-track",
        targetDate: newDate || "TBD",
      },
      ...prev,
    ]);
    setNewTitle("");
    setNewDate("");
    setAddGoalOpen(false);
  }

  function markDone(id: string) {
    setGoals((p) =>
      p.map((g) =>
        g.id === id ? { ...g, status: "completed", progress: 100 } : g,
      ),
    );
  }

  function saveNote(id: string) {
    setGoals((p) =>
      p.map((g) => (g.id === id ? { ...g, note: noteDraft } : g)),
    );
    setEditNoteId(null);
  }

  return (
    <main className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <header className="border-border flex flex-wrap items-center justify-between gap-3 border-b-2 pb-4">
          <div className="flex items-center gap-4">
            <div className="border-primary/40 bg-primary/5 rounded-full border p-3">
              <ChartIncreaseIcon className="text-primary size-6" />
            </div>
            <div>
              <h5 className="text-slate-700">My Performance</h5>
              <p className="text-sm text-muted-foreground">
                System-calculated from tasks, goals, attendance, and peer
                feedback.
              </p>
            </div>
          </div>

          {/* Period toggle */}
          <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/40 p-0.5">
            {(["month", "quarter", "year"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "rounded-md px-3.5 py-1.5 text-sm font-medium transition-all duration-150",
                  period === p
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-muted-foreground hover:text-slate-700",
                )}
              >
                {p === "month"
                  ? "This Month"
                  : p === "quarter"
                    ? "This Quarter"
                    : "This Year"}
              </button>
            ))}
          </div>
        </header>

        {/* ── Score Hero ───────────────────────────────────────────────────── */}
        <section className="grid gap-4 md:grid-cols-[auto_1fr]">
          {/* Left: arc + label */}
          <Card className="flex flex-col items-center justify-center gap-3 px-8 py-6">
            <ScoreArc score={score} />
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Badge
                className={cn(
                  "border text-[11px] font-semibold",
                  getScoreBadge(label),
                )}
              >
                {label}
              </Badge>
              <span
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  delta >= 0 ? "text-emerald-600" : "text-red-500",
                )}
              >
                {delta >= 0 ? (
                  <ArrowUp01Icon size={13} />
                ) : (
                  <ArrowDown01Icon size={13} />
                )}
                {delta >= 0 ? "+" : ""}
                {delta} pts vs prev. period
              </span>
            </div>
          </Card>

          {/* Right: insight + metric mini-list */}
          <div className="flex flex-col gap-4">
            <Card className="gap-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
                    <SparklesIcon size={14} />
                  </div>
                  System Insight
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-3">
                <p className="text-sm text-slate-600">{insight}</p>
              </CardContent>
            </Card>

            <Card className="gap-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Score breakdown
                </CardTitle>
                <CardDescription>
                  Five metrics weighted to produce your overall score
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {scoreMetrics.map((m) => (
                  <div key={m.name} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase truncate">
                        {m.name}
                      </p>
                      <span className="text-[10px] font-semibold text-muted-foreground shrink-0">
                        {m.weight}%
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-1">
                      <p className="text-sm font-bold text-slate-800">
                        {m.value}
                      </p>
                      <span
                        className={cn(
                          "flex items-center gap-0.5 text-[11px] font-medium",
                          m.trend === "up"
                            ? "text-emerald-600"
                            : m.trend === "down"
                              ? "text-red-500"
                              : "text-muted-foreground",
                        )}
                      >
                        {m.trend === "up" ? (
                          <ArrowUp01Icon size={11} />
                        ) : m.trend === "down" ? (
                          <ArrowDown01Icon size={11} />
                        ) : (
                          <ArrowRight01Icon size={11} />
                        )}
                        {m.delta}
                      </span>
                    </div>
                    <Progress value={m.numeric} className={cn("h-1", getTrendBarColor(m.numeric))} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Activity Heatmap ─────────────────────────────────────────────── */}
        <section>
          <Card className="gap-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
                  <ChartIncreaseIcon size={14} />
                </div>
                Activity Overview
              </CardTitle>
              <CardDescription>
                Daily activity — tasks completed, goals updated, project contributions
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="overflow-x-auto pt-4">
              <Heatmap data={heatmapData} />
            </CardContent>
          </Card>
        </section>

        {/* ── Tasks + Projects ─────────────────────────────────────────────── */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Tasks */}
          <Card className="gap-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
                  <CheckListIcon size={14} />
                </div>
                Tasks
              </CardTitle>
              <CardDescription>
                Task completion and delivery statistics
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-4">
              {/* Stat pills */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  {
                    label: "Assigned",
                    val: taskStats.assigned,
                    color: "text-slate-800",
                  },
                  {
                    label: "Completed",
                    val: taskStats.completed,
                    color: "text-primary",
                  },
                  {
                    label: "Overdue",
                    val: taskStats.overdue,
                    color: "text-red-500",
                  },
                  {
                    label: "On-Time %",
                    val: `${Math.round(((taskStats.completed - taskStats.overdue) / taskStats.assigned) * 100)}%`,
                    color: "text-emerald-600",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="border-border flex flex-col items-center rounded-lg border bg-muted/30 py-3"
                  >
                    <span className={cn("text-lg font-black", s.color)}>
                      {s.val}
                    </span>
                    <span className="mt-0.5 text-[10px] text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Donut + legend */}
              <div className="flex items-center gap-5">
                <Donut
                  completed={taskStats.completed}
                  overdue={taskStats.overdue}
                  pending={taskStats.pending}
                />
                <div className="space-y-2">
                  {[
                    {
                      color: "bg-primary",
                      label: "Completed",
                      val: taskStats.completed,
                    },
                    {
                      color: "bg-red-400",
                      label: "Overdue",
                      val: taskStats.overdue,
                    },
                    {
                      color: "bg-slate-200",
                      label: "Pending",
                      val: taskStats.pending,
                    },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 shrink-0 rounded-full",
                          l.color,
                        )}
                      />
                      <span className="text-xs text-muted-foreground">
                        {l.label}
                      </span>
                      <span className="ml-auto text-xs font-semibold text-slate-700">
                        {l.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Recent tasks */}
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Recently Completed
                </p>
                <div className="space-y-1.5">
                  {recentTasks.map((t) => (
                    <div
                      key={t.id}
                      className="border-border flex items-start gap-2.5 rounded-lg border px-3 py-2.5"
                    >
                      <CheckmarkCircle01Icon
                        size={15}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-700">
                          {t.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {t.project} · {t.completedDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="gap-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
                  <FolderLibraryIcon size={14} />
                </div>
                Projects
              </CardTitle>
              <CardDescription>
                Active project progress and milestone tracking
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Active", val: 3, color: "text-primary" },
                  { label: "Completed", val: 2, color: "text-emerald-600" },
                  {
                    label: "Milestones",
                    val: "11 / 18",
                    color: "text-slate-800",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="border-border flex flex-col items-center rounded-lg border bg-muted/30 py-3"
                  >
                    <span className={cn("text-lg font-black", s.color)}>
                      {s.val}
                    </span>
                    <span className="mt-0.5 text-[10px] text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Project rows */}
              <div className="space-y-3.5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Active Projects
                </p>
                {activeProjects.map((p) => (
                  <div key={p.id} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-slate-700">
                        {p.name}
                      </p>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-[11px] text-muted-foreground">
                          {p.milestonesHit}/{p.milestones} milestones
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {p.progress}%
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={p.progress}
                      className={cn(
                        "h-1.5",
                        p.progress >= 75
                          ? "bg-primary"
                          : p.progress >= 40
                            ? "bg-amber-500"
                            : "bg-red-400",
                      )}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Goals ────────────────────────────────────────────────────────── */}
        <section>
          <Card className="gap-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
                      <Target01Icon size={14} />
                    </div>
                    My Goals
                  </CardTitle>
                  <CardDescription className="ml-9">
                    Personal growth targets — you set and update these
                  </CardDescription>
                </div>

                <Dialog open={addGoalOpen} onOpenChange={setAddGoalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" icon={PlusSignIcon}>
                      Add Goal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add new goal</DialogTitle>
                      <DialogDescription>
                        Set a personal growth target. You can update progress
                        anytime.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">
                          Goal title *
                        </label>
                        <input
                          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                          placeholder="e.g. Complete React certification"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">
                          Target date
                        </label>
                        <input
                          type="date"
                          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setAddGoalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={addGoal}>Save Goal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <Separator />

            <CardContent className="pt-4 space-y-3">
              {/* Active goals */}
              {activeGoals.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No active goals. Add one to start tracking your growth.
                </p>
              )}

              {activeGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="border-border space-y-3 rounded-lg border p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-700">
                        {goal.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Target: {goal.targetDate}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <Badge
                        className={cn(
                          "text-[10px] font-semibold",
                          getStatusStyle(goal.status),
                        )}
                      >
                        {getStatusLabel(goal.status)}
                      </Badge>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        title="Mark complete"
                        onClick={() => markDone(goal.id)}
                      >
                        <CheckmarkCircle02Icon size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-slate-700">
                        {goal.progress}%
                      </span>
                    </div>
                    <Progress
                      value={goal.progress}
                      className={cn(
                        "h-1.5",
                        goal.status === "at-risk" || goal.status === "overdue"
                          ? "bg-amber-500"
                          : "bg-primary",
                      )}
                    />
                  </div>

                  {/* Note */}
                  {editNoteId === goal.id ? (
                    <div className="space-y-2">
                      <textarea
                        autoFocus
                        rows={2}
                        className="border-input bg-background w-full resize-none rounded-md border px-3 py-2 text-xs outline-none focus-visible:ring-2"
                        placeholder="Add a note..."
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                      />
                      <div className="flex gap-1.5">
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => setEditNoteId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="xs"
                          onClick={() => saveNote(goal.id)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      {goal.note ? (
                        <p className="flex-1 text-[11px] italic text-muted-foreground">
                          &ldquo;{goal.note}&rdquo;
                        </p>
                      ) : null}
                      <button
                        onClick={() => {
                          setEditNoteId(goal.id);
                          setNoteDraft(goal.note ?? "");
                        }}
                        className="shrink-0 text-[11px] font-medium text-primary transition-colors hover:underline"
                      >
                        {goal.note ? (
                          <span className="flex items-center gap-1">
                            <Edit01Icon size={11} /> Edit note
                          </span>
                        ) : (
                          <span>+ Add note</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Completed goals collapsible */}
              {doneGoals.length > 0 && (
                <>
                  <Separator />
                  <button
                    onClick={() => setCollapseDone((p) => !p)}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-slate-700"
                  >
                    <ArrowRight01Icon
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        !collapseDone && "rotate-90",
                      )}
                    />
                    Completed Goals ({doneGoals.length})
                  </button>

                  {!collapseDone && (
                    <div className="space-y-2">
                      {doneGoals.map((goal) => (
                        <div
                          key={goal.id}
                          className="border-border flex items-center gap-2.5 rounded-lg border bg-muted/30 px-3 py-2.5 opacity-60"
                        >
                          <CheckmarkCircle01Icon
                            size={14}
                            className="text-primary shrink-0"
                          />
                          <span className="flex-1 text-sm text-slate-500 line-through">
                            {goal.title}
                          </span>
                          <Badge className="text-[10px] bg-primary/5 text-primary border-primary/20 border font-medium shrink-0">
                            Done
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </section>

        <div className="h-2" />
      </div>
    </main>
  );
}
