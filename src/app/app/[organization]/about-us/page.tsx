"use client";

import {
  Building02Icon,
  FolderExportIcon,
  Notification01Icon,
  PlusSignIcon,
} from "hugeicons-react";
import {
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  CalendarDaysIcon,
  CircleCheckBigIcon,
  GlobeIcon,
  HeartHandshakeIcon,
  LandmarkIcon,
  LightbulbIcon,
  Link2Icon,
  MapPinIcon,
  MessageSquareIcon,
  MilestoneIcon,
  NewspaperIcon,
  PlusCircleIcon,
  Share2Icon,
  ShieldCheckIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import GlobalSearch from "~/app/_components/common/global-search";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const quickFacts = [
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "Kathmandu, Nepal (remote-friendly)" },
  { label: "Current team", value: "11 full-time + 4 active collaborators" },
  { label: "Stage", value: "Early-stage product with seed momentum" },
];

const milestoneTimeline = [
  {
    year: "Q2 2024",
    title: "Workforge thesis formed",
    description:
      "Founders aligned on building one unified company operating system instead of fragmented point tools.",
  },
  {
    year: "Q4 2024",
    title: "Private alpha with pilot teams",
    description:
      "First pilot companies validated onboarding, collaboration, and workload visibility workflows.",
  },
  {
    year: "Q2 2025",
    title: "Core modules stabilized",
    description:
      "Communication, project/task management, and people operations modules reached production-ready quality.",
  },
  {
    year: "2026 Roadmap",
    title: "Scale and compliance phase",
    description:
      "Focused on multi-tenant hardening, reliability, deeper analytics, and stronger compliance controls.",
  },
];

const values = [
  {
    title: "Clarity over noise",
    description:
      "We explain decisions, context, and priorities so everyone can execute confidently.",
    icon: LightbulbIcon,
  },
  {
    title: "Ownership with support",
    description: "People own outcomes, and leaders remove blockers quickly.",
    icon: TargetIcon,
  },
  {
    title: "Respect in every interaction",
    description:
      "We debate ideas strongly but treat people with care and professionalism.",
    icon: HeartHandshakeIcon,
  },
  {
    title: "Progress through learning",
    description:
      "Feedback is continuous and mistakes are used to improve systems, not blame people.",
    icon: UsersIcon,
  },
];

const companyGoals = [
  "Ship a stable onboarding-to-operations flow so new customer teams can activate in under 48 hours.",
  "Increase product reliability with stronger QA and fewer regressions in critical team workflows.",
  "Improve hiring and internal enablement to support scale without compromising culture quality.",
  "Publish clearer internal documentation so every joiner can self-serve core company knowledge.",
];

const rulesAndPolicies = [
  "Respect-first communication in every channel, regardless of role, seniority, or function.",
  "Document decisions that affect roadmap, people, process, or customer outcomes.",
  "Security and privacy checks are mandatory for all features touching user/company data.",
  "Escalate risks early; silent blockers are treated as process failures, not personal failures.",
];

const companyNews = [
  {
    title: "Founder Memo: Why we are simplifying the HR stack",
    category: "Leadership",
    description:
      "A transparent note on product strategy, trade-offs, and where we are saying no.",
    date: "Apr 04, 2026",
  },
  {
    title: "Workforge closes strategic seed support",
    category: "Funding",
    description:
      "New backing is allocated to engineering depth, customer onboarding quality, and compliance maturity.",
    date: "Mar 16, 2026",
  },
  {
    title: "People update: Engineering and customer success hiring",
    category: "Team",
    description:
      "Hiring expanded in critical product and customer-facing roles to support active pilots.",
    date: "Feb 27, 2026",
  },
];

const hiringTracks = [
  {
    title: "Core builders",
    detail: "Engineering, product, and design roles tied to roadmap execution.",
  },
  {
    title: "Business and operations",
    detail:
      "People, finance, legal, and internal ops roles for stable scaling.",
  },
  {
    title: "Growth and customer teams",
    detail:
      "Sales, onboarding, and customer success roles tied to product adoption.",
  },
];

const openings = [
  {
    role: "Senior Frontend Engineer (Next.js)",
    team: "Engineering",
    type: "Full-time",
    location: "Remote (Nepal preferred timezone overlap)",
    status: "Open",
    referrals: 5,
  },
  {
    role: "Product Designer",
    team: "Product",
    type: "Full-time",
    location: "Hybrid - Kathmandu",
    status: "Open",
    referrals: 3,
  },
  {
    role: "Customer Success Associate",
    team: "Customer",
    type: "Full-time",
    location: "Kathmandu / Remote",
    status: "Open",
    referrals: 7,
  },
  {
    role: "People Ops Coordinator",
    team: "People",
    type: "Full-time",
    location: "Hybrid - Kathmandu",
    status: "Interviewing",
    referrals: 2,
  },
];

const culturePractices = [
  {
    title: "Weekly founder update",
    description:
      "Founders share company progress, risks, customer insights, and next-week priorities every Friday.",
  },
  {
    title: "Monday planning cadence",
    description:
      "Each team publishes focus items, dependencies, and expected outcomes before execution starts.",
  },
  {
    title: "Decision logs",
    description:
      "Product and process decisions are logged with rationale and owner to avoid context loss.",
  },
  {
    title: "Monthly retrospectives",
    description:
      "Teams review wins, misses, and system-level improvements with action owners and deadlines.",
  },
];

const joinerJourney = [
  {
    week: "Week 1",
    goal: "Context and setup",
    detail:
      "Understand mission, team structure, product modules, and complete onboarding checklist.",
  },
  {
    week: "Week 2",
    goal: "Shadow and contribute",
    detail:
      "Pair with team, take first scoped task, and join product/customer review sessions.",
  },
  {
    week: "Week 3-4",
    goal: "Own outcomes",
    detail:
      "Start owning deliverables with clear goals, feedback loops, and peer collaboration.",
  },
];

const companyResources = [
  { label: "Product Docs", value: "docs.workforge.team", icon: Link2Icon },
  {
    label: "Internal Handbook",
    value: "Notion: Workforge Handbook",
    icon: Building2Icon,
  },
  {
    label: "Design System",
    value: "Design Documentation page",
    icon: LightbulbIcon,
  },
  {
    label: "Careers Inbox",
    value: "careers@workforge.team",
    icon: MessageSquareIcon,
  },
];

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "culture" | "careers" | "policies" | "updates"
  >("overview");

  return (
    <>
      <header className="border-border p-4 flex items-center justify-between border-b-2 pb-4">
        <div className="flex items-center gap-4">
          <div className="border-primary/40 bg-primary/5 rounded-full border p-3">
            <Building02Icon className="text-primary size-6" />
          </div>
          <div className="">
            <h5 className="text-slate-700">About Workforge.team</h5>
            <p className="text-sm">
              Get to know about the company, its culture, and spirit of what
              drives the company.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GlobalSearch />
            {/* TODO: Add interactive bell icon, like silent or not */}
            <Button
              size="icon-sm"
              variant={"ghost"}
              icon={Notification01Icon}
            />
          </div>
          <div className="bg-border mx-1 h-6 w-px"></div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant={"ghost"} icon={FolderExportIcon}>
              Export
            </Button>
            <Button size="sm" variant={"outline"} icon={PlusSignIcon}>
              Invite People
            </Button>
          </div>
        </div>
      </header>
      <div className="p-4 to-muted/40 min-h-screen bg-linear-to-br">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
          <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-6 shadow-sm md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.75_0.09_200/0.18),transparent_45%)]" />
            <div className="absolute bottom-0 left-0 h-20 w-full bg-linear-to-t from-background/50 to-transparent" />
            <div className="relative z-10 grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
              <div className="space-y-4">
                <Badge className="h-6 px-3 text-[11px]" variant="secondary">
                  Workforge.team • Company Handbook
                </Badge>
                <h1 className="max-w-2xl text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
                  Build the company operating system teams actually enjoy using
                </h1>
                <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base">
                  Workforge.team helps companies run onboarding, communication,
                  project execution, culture, and people operations in one
                  connected platform. This page gives new joiners a realistic
                  view of how we work, what we value, and where we are headed.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button size="sm" icon={GlobeIcon}>
                    workforge.team
                  </Button>
                  <Button size="sm" variant="outline" icon={Share2Icon}>
                    Share company profile
                  </Button>
                </div>
              </div>

              <Card className="border border-border/60 bg-background/80 py-0">
                <CardHeader className="border-b border-border/60 py-4">
                  <CardTitle className="text-sm">Company at a glance</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2">
                  {quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-xl border border-border/60 bg-card/80 p-3"
                    >
                      <p className="text-muted-foreground text-xs">
                        {fact.label}
                      </p>
                      <p className="mt-1 text-sm font-medium">{fact.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <Card
                key={value.title}
                className="border border-border/60 bg-card/90"
              >
                <CardHeader className="gap-2">
                  <div className="bg-primary/12 text-primary inline-flex size-9 items-center justify-center rounded-xl">
                    <value.icon className="size-4" />
                  </div>
                  <CardTitle className="text-base">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border border-border/60 bg-card/90 space-y-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MilestoneIcon className="text-primary size-4" />
                  <CardTitle className="text-base">
                    Company milestones
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {milestoneTimeline.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="mt-1 flex flex-col items-center">
                      <span className="bg-primary block size-2 rounded-full" />
                      <span className="bg-border mt-1 h-full w-px" />
                    </div>
                    <div className="pb-2">
                      <p className="text-muted-foreground text-xs uppercase">
                        {item.year}
                      </p>
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card/90 space-y-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TargetIcon className="text-primary size-4" />
                  <CardTitle className="text-base">Goals this cycle</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {companyGoals.map((goal) => (
                  <div
                    key={goal}
                    className="flex items-start gap-2 rounded-xl border border-border/60 bg-background/60 p-3"
                  >
                    <CircleCheckBigIcon className="mt-0.5 size-4 text-success" />
                    <p className="text-sm leading-relaxed">{goal}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="border border-border/60 bg-card/90 space-y-2">
              <CardHeader className="border-b border-border/60">
                <CardTitle className="text-base">Company deep dive</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="border-border mb-5 flex space-x-2 overflow-x-auto border-b pb-px sm:space-x-6">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === "overview"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("culture")}
                    className={`border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === "culture"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    Culture & ways of working
                  </button>
                  <button
                    onClick={() => setActiveTab("careers")}
                    className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === "careers"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    Careers
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {openings.length}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("policies")}
                    className={`border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === "policies"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    Policies
                  </button>
                  <button
                    onClick={() => setActiveTab("updates")}
                    className={`flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === "updates"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    Updates
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {companyNews.length}
                    </span>
                  </button>
                </div>

                {activeTab === "overview" && (
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                    <Card
                      size="sm"
                      className="border border-border/60 bg-background/70"
                    >
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Founder message
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm leading-relaxed">
                        <p>
                          We started Workforge because teams were forced to run
                          critical operations across disconnected tools. That
                          made work slower, less transparent, and harder for
                          people to trust.
                        </p>
                        <p className="text-muted-foreground">
                          Our direction is simple: one platform for company
                          operations from day one to day done. New joiners
                          should feel this in every product decision we make.
                        </p>
                        <p className="text-muted-foreground">
                          We are still early, and we are honest about that. We
                          move fast, but we do not compromise on integrity, user
                          trust, and long-term product quality.
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      size="sm"
                      className="border border-border/60 bg-background/70"
                    >
                      <CardHeader>
                        <CardTitle className="text-sm">
                          New joiner journey
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {joinerJourney.map((item) => (
                          <div
                            key={item.week}
                            className="rounded-xl border border-border/60 bg-card/80 p-3"
                          >
                            <p className="text-xs font-semibold uppercase">
                              {item.week}
                            </p>
                            <p className="mt-1 text-sm font-medium">
                              {item.goal}
                            </p>
                            <p className="text-muted-foreground mt-1 text-sm">
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "culture" && (
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
                    <div className="grid gap-3">
                      {culturePractices.map((practice) => (
                        <Card
                          key={practice.title}
                          size="sm"
                          className="border border-border/60 bg-background/70"
                        >
                          <CardHeader className="pb-1">
                            <CardTitle className="text-sm">
                              {practice.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm">
                              {practice.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Card className="border border-border/60 bg-background/70">
                      <CardHeader>
                        <CardTitle className="text-sm">
                          What success means
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <CircleCheckBigIcon className="mt-0.5 size-4 text-success" />
                          Deliver measurable outcomes, not only activity.
                        </div>
                        <div className="flex items-start gap-2">
                          <CircleCheckBigIcon className="mt-0.5 size-4 text-success" />
                          Raise risks early with clear proposed solutions.
                        </div>
                        <div className="flex items-start gap-2">
                          <CircleCheckBigIcon className="mt-0.5 size-4 text-success" />
                          Make decisions with customer impact and company
                          context.
                        </div>
                        <div className="flex items-start gap-2">
                          <CircleCheckBigIcon className="mt-0.5 size-4 text-success" />
                          Support teammates and document decisions clearly.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "careers" && (
                  <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-3">
                      {hiringTracks.map((track) => (
                        <Card
                          key={track.title}
                          size="sm"
                          className="border border-border/60 bg-background/70"
                        >
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <BriefcaseBusinessIcon className="size-4 text-primary" />
                              <CardTitle className="text-sm">
                                {track.title}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm">
                              {track.detail}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="border border-border/60 bg-background/70 py-0">
                      <CardHeader className="border-b border-border/60 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <CardTitle className="text-sm">
                            Open positions
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Button
                              size="xs"
                              variant="outline"
                              icon={PlusCircleIcon}
                            >
                              Add opening
                            </Button>
                            <Button
                              size="xs"
                              variant="outline"
                              icon={Share2Icon}
                            >
                              Share all
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-3">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Role</TableHead>
                              <TableHead>Team</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Referrals</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {openings.map((opening) => (
                              <TableRow key={opening.role}>
                                <TableCell className="font-medium">
                                  {opening.role}
                                </TableCell>
                                <TableCell>{opening.team}</TableCell>
                                <TableCell>{opening.type}</TableCell>
                                <TableCell>{opening.location}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      opening.status === "Open"
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="h-5 text-[10px]"
                                  >
                                    {opening.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{opening.referrals}</TableCell>
                                <TableCell>
                                  <div className="flex justify-end gap-1.5">
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      icon={Share2Icon}
                                    >
                                      Share
                                    </Button>
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      icon={UsersIcon}
                                    >
                                      Refer
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "policies" && (
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
                    <div className="grid gap-3">
                      {rulesAndPolicies.map((rule) => (
                        <div
                          key={rule}
                          className="flex items-start gap-2 rounded-xl border border-border/60 bg-background/70 p-3"
                        >
                          <ShieldCheckIcon className="mt-0.5 size-4 text-primary" />
                          <p className="text-sm leading-relaxed">{rule}</p>
                        </div>
                      ))}
                    </div>
                    <Card className="border border-border/60 bg-background/70">
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Policy ownership
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <LandmarkIcon className="size-4 text-primary" />
                          Legal and compliance: policy review cadence.
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="size-4 text-primary" />
                          People team: conduct, leave, and grievance process.
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2Icon className="size-4 text-primary" />
                          Founders: final accountability for policy enforcement.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "updates" && (
                  <div className="grid gap-3 md:grid-cols-3">
                    {companyNews.map((news) => (
                      <Card
                        key={news.title}
                        size="sm"
                        className="border border-border/60 bg-background/70"
                      >
                        <CardHeader className="gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <Badge
                              variant="outline"
                              className="w-fit text-[11px]"
                            >
                              {news.category}
                            </Badge>
                            <span className="text-muted-foreground text-xs">
                              {news.date}
                            </span>
                          </div>
                          <CardTitle className="text-sm">
                            {news.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-muted-foreground text-sm">
                            {news.description}
                          </p>
                          <Button
                            size="xs"
                            variant="ghost"
                            icon={ArrowUpRightIcon}
                            className="px-0"
                          >
                            Read full update
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <Card className="border border-border/60 bg-card/90 space-y-2">
              <CardHeader>
                <CardTitle className="text-base">Company resources</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {companyResources.map((resource) => (
                  <div
                    key={resource.label}
                    className="group rounded-xl border border-border/60 bg-background/70 p-3 transition-colors hover:bg-background"
                  >
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <resource.icon className="size-4 text-primary" />
                      {resource.label}
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {resource.value}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card/90 space-y-2">
              <CardHeader>
                <CardTitle className="text-base">
                  Contact and operating details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="size-4 text-primary" />
                  Kathmandu, Nepal • distributed team model
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="size-4 text-primary" />
                  Weekly all-hands: Friday, 5:00 PM NPT
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquareIcon className="size-4 text-primary" />
                  Internal updates channel: #announcements
                </div>
                <div className="flex items-center gap-2">
                  <NewspaperIcon className="size-4 text-primary" />
                  Monthly strategy memo shared by founders
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}
