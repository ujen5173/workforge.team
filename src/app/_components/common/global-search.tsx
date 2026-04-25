"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRight01Icon,
  CalendarRemove01Icon,
  ChartIncreaseIcon,
  CreditCardPosIcon,
  DashboardSquare01Icon,
  DocumentAttachmentIcon,
  Pdf01Icon,
  Search01Icon,
  SearchingIcon,
  Settings01Icon,
  TaskDaily02Icon,
  UserGroup03Icon,
} from "hugeicons-react";
import { KanbanIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ComponentType } from "react";
import { buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useKeyPress } from "~/hooks/use-key-press";
import { SEARCH_TAGS } from "~/lib/search";
import { cn } from "~/lib/utils";

type PageKey = keyof typeof SEARCH_TAGS;

const PAGE_META: Record<
  PageKey,
  { label: string; icon: ComponentType<{ className?: string }>; route: string }
> = {
  dashboard: { label: "Dashboard", icon: DashboardSquare01Icon, route: "/app" },
  projects: {
    label: "Projects",
    icon: KanbanIcon,
    route: "/app/projects",
  },
  about: { label: "About", icon: DocumentAttachmentIcon, route: "/app/about" },
  leaveManagement: {
    label: "Leave Management",
    icon: CalendarRemove01Icon,
    route: "/app/leave-management",
  },
  taskManagement: {
    label: "Task Management",
    icon: TaskDaily02Icon,
    route: "/app/task-management-board",
  },
  teams: { label: "Teams", icon: UserGroup03Icon, route: "/app/teams" },
  performance: {
    label: "Performance",
    icon: ChartIncreaseIcon,
    route: "/app/performance",
  },
  finance: { label: "Finance", icon: CreditCardPosIcon, route: "/app/finance" },
  documents: { label: "Documents", icon: Pdf01Icon, route: "/app/documents" },
  settings: { label: "Settings", icon: Settings01Icon, route: "/app/settings" },
};

const HighlightedChip = ({ text, query }: { text: string; query: string }) => {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);

  if (idx === -1 || !query) {
    return (
      <span className="bg-muted text-muted-foreground inline-flex items-center rounded-md px-2 py-0.5 text-xs">
        {text}
      </span>
    );
  }

  return (
    <span className="bg-primary/10 text-primary ring-primary/20 inline-flex items-center rounded-md px-2 py-0.5 text-xs whitespace-pre ring-1 ring-inset">
      {text.slice(0, idx)}
      <span className="decoration-primary/50 font-semibold underline underline-offset-2">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </span>
  );
};

const GlobalSearch = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [list, setList] = useState<
    { page: string; matches: string[]; score: number }[]
  >([]);

  useKeyPress(
    {
      key: "k",
      ctrl: true,
    },
    {
      onMatch: () => {
        setOpen(true);
      },
    },
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const q = raw.toLowerCase().trim();
    setQuery(raw);

    if (!q) {
      setList([]);
      return;
    }

    const res = Object.entries(SEARCH_TAGS)
      .map(([page, values]) => {
        const matches = values.filter((val) => val.toLowerCase().includes(q));
        return { page, matches, score: matches.length };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    setList(res);
  };

  const handleNavigate = (route: string) => {
    setOpen(false);
    setQuery("");
    setList([]);
    router.push(route);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
      >
        <Search01Icon />
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-xl! gap-0 overflow-hidden p-0"
      >
        <DialogHeader className="border-border/60 border-b px-4 pt-4 pb-3">
          <Input
            icon={Search01Icon}
            iconStyle="size-4"
            placeholder="Search smartly... eg: Paycheck"
            value={query}
            onChange={handleSearch}
            autoFocus
            className="border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
          />
        </DialogHeader>

        <div
          className={cn(
            "transition-all duration-200",
            list.length > 0 || query
              ? "max-h-[380px] opacity-100"
              : "overflow-hidden",
          )}
        >
          {list.length > 0 && (
            <div className="max-h-[380px] overflow-y-auto">
              <div className="px-4 pt-3 pb-1">
                <Label className="text-muted-foreground/70 text-[11px] font-medium tracking-wider uppercase">
                  Pages — {list.length} result{list.length !== 1 ? "s" : ""}
                </Label>
              </div>
              <ul className="px-2 pb-2">
                {list.map(({ page, matches }) => {
                  const meta = PAGE_META[page as PageKey];
                  if (!meta) return null;
                  const Icon = meta.icon;

                  return (
                    <li key={page}>
                      <button
                        onClick={() => handleNavigate(meta.route)}
                        className="group hover:bg-accent focus-visible:bg-accent flex w-full flex-col gap-2 rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:outline-none"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="border-border/60 bg-background text-muted-foreground group-hover:border-primary/30 group-hover:text-primary flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors">
                            <Icon className="size-3.5" />
                          </span>
                          <span className="text-foreground flex-1 text-sm font-medium">
                            {meta.label}
                          </span>
                          <ArrowRight01Icon className="text-muted-foreground/40 size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </div>

                        {matches.length > 0 && (
                          <div className="flex flex-wrap gap-1 pl-9">
                            {matches.slice(0, 6).map((tag) => (
                              <HighlightedChip
                                key={tag}
                                text={tag}
                                query={query.trim()}
                              />
                            ))}
                            {matches.length > 6 && (
                              <span className="bg-muted text-muted-foreground inline-flex items-center rounded-md px-2 py-0.5 text-xs">
                                +{matches.length - 6} more
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {!query.trim() && list.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <div className="border-border/60 bg-muted/40 flex size-10 items-center justify-center rounded-xl border border-dashed">
                <Search01Icon className="text-muted-foreground/40 size-4" />
              </div>
              <p className="text-muted-foreground text-sm">
                Start typing to search
              </p>
              <p className="text-muted-foreground/50 text-xs">
                Dashboards, projects, settings & more
              </p>
            </div>
          )}

          {list.length === 0 && query.trim() && (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <SearchingIcon className="text-muted-foreground/30 size-8" />
              <p className="text-muted-foreground text-sm">
                No results for{" "}
                <span className="text-foreground font-medium">
                  &ldquo;{query}&rdquo;
                </span>
              </p>
              <p className="text-muted-foreground/60 text-xs">
                Try a different keyword
              </p>
            </div>
          )}
        </div>

        <div className="border-border/60 flex items-center justify-end gap-3 border-t px-4 py-2">
          <span className="text-muted-foreground/50 flex items-center gap-1 text-[11px]">
            <kbd className="border-border/60 bg-muted rounded border px-1 py-0.5 font-mono text-[10px]">
              Esc
            </kbd>
            to close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
