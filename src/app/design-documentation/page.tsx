import React from "react";

import { ThemeToggle } from "~/components/theme-toggle";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { siteConfig } from "~/lib/site";

const ColorSwatch = ({
  name,
  variable,
}: {
  name: string;
  variable: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="from-card/80 to-card/40 border-border/40 h-16 w-full rounded-xl border bg-linear-to-b"
        style={{ background: `var(${variable})` }}
      />
      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {name}
      </div>
      <div className="text-muted-foreground/80 text-[11px]">{variable}</div>
    </div>
  );
};

const SectionCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="bg-card/80 border-border/60 flex flex-col gap-4 rounded-2xl border p-5 shadow-sm backdrop-blur">
      <header className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
};

const DesignDocumentation = () => {
  return (
    <div className="from-background via-background to-muted/40 text-foreground min-h-screen bg-linear-to-br px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="bg-card/90 border-border/60 flex flex-col justify-between gap-4 rounded-3xl border p-6 shadow-sm backdrop-blur md:flex-row md:items-center">
          <div className="space-y-1.5">
            <p className="text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase">
              Interface Design System
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {siteConfig.name} UI Documentation
            </h1>
            <p className="text-muted-foreground max-w-xl text-sm">
              A high-level overview of the visual language used across the
              product. Use these tokens and components to build interfaces that
              feel cohesive, legible, and distinctly {siteConfig.name}.
            </p>
          </div>
          <div className="text-muted-foreground flex flex-col items-start gap-2 text-xs md:items-end">
            <div className="bg-background/60 border-border/60 inline-flex items-center gap-2 rounded-full border px-3 py-1">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.35)]" />
              <span className="text-foreground font-medium">Light-first</span>
              <span className="text-muted-foreground text-[11px]">
                Tokens mirrored to dark mode
              </span>
            </div>
            <ThemeToggle />
            <div className="mt-1 flex gap-3">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-[11px]">
                  Base radius
                </span>
                <span className="text-xs font-medium">12 px</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-[11px]">Grid</span>
                <span className="text-xs font-medium">8 px spacing</span>
              </div>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <SectionCard
              title="Core Surfaces"
              subtitle="Base layers that every screen is built on top of."
            >
              <div className="grid grid-cols-2 gap-3">
                <ColorSwatch name="Background" variable="--background" />
                <ColorSwatch name="Foreground" variable="--foreground" />
                <ColorSwatch name="Card" variable="--card" />
                <ColorSwatch name="Muted" variable="--muted" />
                <ColorSwatch name="Popover" variable="--popover" />
                <ColorSwatch name="Border" variable="--border" />
                <ColorSwatch name="Input" variable="--input" />
                <ColorSwatch name="Ring" variable="--ring" />
              </div>
            </SectionCard>

            <SectionCard
              title="Brand & Accent"
              subtitle="Primary actions and high-emphasis highlights."
            >
              <div className="grid grid-cols-2 gap-3">
                <ColorSwatch name="Primary" variable="--primary" />
                <ColorSwatch
                  name="Primary FG"
                  variable="--primary-foreground"
                />
                <ColorSwatch name="Accent" variable="--accent" />
                <ColorSwatch name="Accent FG" variable="--accent-foreground" />
                <ColorSwatch name="Sidebar" variable="--sidebar" />
                <ColorSwatch
                  name="Sidebar Primary"
                  variable="--sidebar-primary"
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Status"
              subtitle="Communicate health, alerts, and destructive actions."
            >
              <div className="grid grid-cols-2 gap-3">
                <ColorSwatch name="Success" variable="--success" />
                <ColorSwatch name="Warning" variable="--warning" />
                <ColorSwatch name="Danger" variable="--danger" />
                <ColorSwatch name="Destructive" variable="--destructive" />
              </div>
            </SectionCard>

            <SectionCard
              title="Data Visualization"
              subtitle="Sequential palette for charts and complex widgets."
            >
              <div className="grid grid-cols-3 gap-3">
                <ColorSwatch name="Chart 1" variable="--chart-1" />
                <ColorSwatch name="Chart 2" variable="--chart-2" />
                <ColorSwatch name="Chart 3" variable="--chart-3" />
                <ColorSwatch name="Chart 4" variable="--chart-4" />
                <ColorSwatch name="Chart 5" variable="--chart-5" />
              </div>
            </SectionCard>
          </div>

          <div className="flex flex-col gap-4">
            <SectionCard
              title="Typography"
              subtitle="Two-type system with strong hierarchy and legible numerics."
            >
              <div className="space-y-5">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    Display / Page Titles
                  </p>
                  <p className="text-2xl font-semibold tracking-tight md:text-3xl">
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Used for top-level views, hero sections, and major metrics.
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    Body / Interface
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {siteConfig.name} uses a geometric sans as the primary UI
                    face with a comfortable 1.4 line-height. Body sizes range
                    from 12–16 px depending on density.
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    Mono / Data
                  </p>
                  <p className="font-mono text-sm">
                    1,125.00 · 98.24% · 00:24:18
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Mono is reserved for code, identifiers, and tabular numbers
                    where alignment matters.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Inputs & Controls"
              subtitle="Buttons and fields share the same radius, focus, and spacing rules."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    Buttons
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="default">
                      Primary
                    </Button>
                    <Button size="sm" variant="secondary">
                      Secondary
                    </Button>
                    <Button size="sm" variant="outline">
                      Outline
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Icon button"
                    >
                      {/* Icon placeholder */}
                      <span className="bg-muted inline-flex size-3.5 items-center justify-center rounded-full" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    All buttons use an 8 px grid horizontally with 12–16 px
                    vertical padding and share the same focus ring.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    Text Inputs
                  </p>
                  <div className="space-y-2">
                    <label className="flex flex-col gap-1 text-xs">
                      <span className="text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase">
                        Label
                      </span>
                      <input
                        className="bg-background/80 border-input focus-visible:ring-ring focus-visible:ring-offset-background text-foreground placeholder:text-muted-foreground/70 w-full rounded-xl border px-3 py-2 text-sm shadow-sm ring-offset-2 outline-none focus-visible:ring-2"
                        placeholder="Input placeholder"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs">
                      <span className="text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase">
                        Label (error)
                      </span>
                      <input
                        className="bg-background/80 border-destructive/60 focus-visible:ring-destructive/40 ring-offset-background text-foreground placeholder:text-muted-foreground/70 w-full rounded-xl border px-3 py-2 text-sm ring-offset-2 outline-none focus-visible:ring-2"
                        defaultValue="Invalid value"
                        aria-invalid="true"
                      />
                      <span className="text-destructive text-[11px]">
                        Explain clearly how to resolve the error.
                      </span>
                    </label>
                  </div>
                  <div className="border-border/40 mt-4 space-y-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="settings-sync"
                        className="cursor-pointer text-xs font-medium"
                      >
                        Sync settings
                      </label>
                      <Switch id="settings-sync" defaultChecked />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="terms" defaultChecked />
                      <label
                        htmlFor="terms"
                        className="cursor-pointer text-xs font-medium"
                      >
                        Accept terms & conditions
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase">
                        Volume
                      </label>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className="py-2"
                      />
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 text-xs">
                    Inputs align to an 8 px vertical rhythm and never touch card
                    edges directly—always pad with at least 16 px.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Component Gallery"
              subtitle="Snapshot of the most common shadcn-inspired primitives in this project."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    Essential primitives
                  </p>
                  <div className="grid gap-2">
                    <div className="bg-background/60 border-border/70 flex items-center justify-between gap-3 rounded-xl border px-3 py-2">
                      <div className="space-y-0.5">
                        <p className="text-foreground text-xs font-medium">
                          Button
                        </p>
                        <p className="text-muted-foreground text-[11px]">
                          Primary, secondary, outline, ghost, and icon variants.
                        </p>
                      </div>
                      <Button size="xs">Action</Button>
                    </div>

                    <div className="bg-background/60 border-border/70 flex items-center justify-between gap-3 rounded-xl border px-3 py-2">
                      <div className="space-y-0.5">
                        <p className="text-foreground text-xs font-medium">
                          Input
                        </p>
                        <p className="text-muted-foreground text-[11px]">
                          Form-aligned text input with shared focus ring.
                        </p>
                      </div>
                      <div className="bg-background/80 border-input text-muted-foreground w-32 rounded-lg border px-2 py-1.5 text-[11px]">
                        Placeholder
                      </div>
                    </div>

                    <div className="bg-background/60 border-border/70 flex items-center justify-between gap-3 rounded-xl border px-3 py-2">
                      <div className="space-y-0.5">
                        <p className="text-foreground text-xs font-medium">
                          Badge
                        </p>
                        <p className="text-muted-foreground text-[11px]">
                          Small status chips for metadata and filters.
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="default" className="h-5 text-[10px]">
                          Live
                        </Badge>
                        <Badge variant="secondary" className="h-5 text-[10px]">
                          Draft
                        </Badge>
                        <Badge variant="outline" className="h-5 text-[10px]">
                          Archived
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    Layout & data components
                  </p>
                  <div className="grid gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="bg-background/60 hover:bg-muted/50 border-border/70 flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2 transition-colors">
                          <div className="pointer-events-none space-y-0.5">
                            <p className="text-foreground text-xs font-medium">
                              Dialog
                            </p>
                            <p className="text-muted-foreground text-[11px]">
                              Click to open a modal window.
                            </p>
                          </div>
                          <span className="bg-muted text-muted-foreground pointer-events-none rounded-full px-2 py-0.5 text-[10px]">
                            Interactive
                          </span>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Interactive Dialog</DialogTitle>
                          <DialogDescription>
                            This is a live example of the shadcn Dialog
                            component integrated into the dark-first theme
                            interface.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-muted-foreground text-sm">
                            Content goes here...
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="bg-background/60 border-border/70 flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left">
                      <div className="space-y-0.5">
                        <p className="text-foreground text-xs font-medium">
                          Tooltip
                        </p>
                        <p className="text-muted-foreground text-[11px]">
                          Hover to reveal additional information.
                        </p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-muted h-6 w-6 rounded-full"
                            >
                              <span className="font-serif text-xs font-bold italic">
                                i
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="text-xs">
                            <p>Here is some extra context!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="bg-background/80 border-border/70 space-y-2 rounded-2xl border p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium">Card</p>
                        <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px]">
                          Container
                        </span>
                      </div>
                      <p className="text-muted-foreground text-[11px]">
                        Base building block for panels, dashboard tiles, and
                        dialogs.
                      </p>
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-[11px]">
                            Metric
                          </p>
                          <p className="text-lg font-semibold">1,125</p>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                          ▲ 4.3%
                        </span>
                      </div>
                    </div>

                    <div className="bg-background/80 border-border/70 space-y-4 rounded-2xl border p-4">
                      <p className="text-xs font-medium">Tabs</p>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="bg-muted/60 grid w-full grid-cols-3 p-1">
                          <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-background rounded-full text-[11px] data-[state=active]:shadow-sm"
                          >
                            Overview
                          </TabsTrigger>
                          <TabsTrigger
                            value="details"
                            className="rounded-full text-[11px]"
                          >
                            Details
                          </TabsTrigger>
                          <TabsTrigger
                            value="activity"
                            className="rounded-full text-[11px]"
                          >
                            Activity
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent
                          value="overview"
                          className="text-muted-foreground px-1 pt-3 text-[11px]"
                        >
                          Overview panel content displaying high level metrics.
                        </TabsContent>
                        <TabsContent
                          value="details"
                          className="text-muted-foreground px-1 pt-3 text-[11px]"
                        >
                          Detailed breakdown of specific records.
                        </TabsContent>
                        <TabsContent
                          value="activity"
                          className="text-muted-foreground px-1 pt-3 text-[11px]"
                        >
                          Recent history and audit logs.
                        </TabsContent>
                      </Tabs>
                      <p className="text-muted-foreground mt-2 text-[11px]">
                        Used to organize content by mode without leaving the
                        current surface.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Iconography"
              subtitle="Icon sizing and containment for dense dashboards."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    16 px
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted/40 border-border/70 flex size-8 items-center justify-center rounded-lg border">
                      <div className="border-muted-foreground/40 size-4 rounded-[4px] border" />
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Used inside compact buttons and tight navigation.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    20 px
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted/40 border-border/70 flex size-9 items-center justify-center rounded-lg border">
                      <div className="border-muted-foreground/40 size-5 rounded-[5px] border" />
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Default size for toolbar, list items, and badges.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
                    24 px
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted/40 border-border/70 flex size-10 items-center justify-center rounded-lg border">
                      <div className="border-muted-foreground/40 size-6 rounded-[6px] border" />
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Reserved for empty states, hero cards, and key metrics.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Radius & Motion"
              subtitle="Soft corners and subtle movement keep the UI calm but alive."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/80 size-10 rounded-lg" />
                      <div className="bg-primary/80 size-10 rounded-2xl" />
                      <div className="bg-primary/80 size-10 rounded-[24px]" />
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Base radius: 12 px{" "}
                      <span className="block text-[11px]">
                        Cards: 20–24 px, pills: full.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-primary animate-shine h-16 w-20 rounded-xl bg-size-[200%_100%]" />
                  <div className="bg-primary/80 animate-fade-in h-16 w-20 rounded-xl" />
                  <div className="bg-primary/80 animate-scale-in h-16 w-20 rounded-xl" />
                  <div className="bg-primary/80 animate-slide-in-right h-16 w-20 rounded-xl" />
                </div>
              </div>
              <p className="text-muted-foreground text-xs">
                Animation is used sparingly to reinforce change in state—hover,
                selection, and page transitions—rather than constant motion.
              </p>
            </SectionCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DesignDocumentation;
