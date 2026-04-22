"use client";

import {
  Add01Icon,
  Calendar01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  NoteIcon,
} from "hugeicons-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

type Priority = "urgent" | "moderate" | "low";
type Tag = string;

interface Note {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  priority?: Priority;
  dueDate: string;
  completed: boolean;
}

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; variant: "destructive" | "secondary" | "outline" }
> = {
  urgent: { label: "Urgent", variant: "destructive" },
  moderate: { label: "Moderate", variant: "secondary" },
  low: { label: "Low", variant: "outline" },
};

const INITIAL_NOTES: Note[] = [
  {
    id: "1",
    title: "Text Inputs for Design System",
    description: "Finalize all text input variants and states.",
    tags: ["Today"],
    priority: "low",
    dueDate: "Aug 15",
    completed: false,
  },
  {
    id: "2",
    title: "Meeting with Arthur Taylor",
    description: "Sync on Q3 roadmap and resource allocation.",
    tags: ["Bug fixes"],
    priority: "moderate",
    dueDate: "Aug 18",
    completed: false,
  },
  {
    id: "3",
    title: "Check neutral and state colors",
    description: "Review color tokens across dark and light themes.",
    tags: [],
    priority: "urgent",
    dueDate: "Aug 20",
    completed: true,
  },
];

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

  const toggleNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note,
      ),
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const NOTES_PRIOITY = {
    urgent: 1,
    moderate: 2,
    low: 3,
  } as Record<Priority, number>;

  return (
    <div className="border-border h-full w-full max-w-sm rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <NoteIcon size={15} />
          </div>
          <p className="text-sm font-semibold text-slate-800">Notes</p>
        </div>
        <Button icon={Add01Icon} variant="outline" size="xs">
          Add Note
        </Button>
      </div>

      <Separator className="my-3" />

      <div className="h-full">
        {notes.length === 0 && (
          <div className="flex flex-col items-center gap-1.5 py-6 text-center">
            <CheckmarkCircle02Icon size={28} className="text-slate-300" />
            <p className="text-sm font-medium text-slate-400">All clear!</p>
            <p className="text-xs text-slate-300">No notes remaining.</p>
          </div>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            className={cn(
              "group relative flex items-start gap-3 rounded-lg py-2.5 transition-colors duration-150",
              note.completed
                ? "bg-slate-50/70"
                : "cursor-pointer hover:bg-slate-50",
            )}
            onClick={() => toggleNote(note.id)}
          >
            <Checkbox
              id={note.id}
              checked={note.completed}
              onCheckedChange={() => toggleNote(note.id)}
              onClick={(e) => e.stopPropagation()}
              className="mt-0.5 shrink-0"
            />

            <div className="min-w-0 flex-1 space-y-1 select-none">
              <p
                className={cn(
                  "text-sm leading-tight font-medium transition-colors",
                  note.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-700",
                )}
              >
                {note.title}
              </p>
              <p
                className={cn(
                  "text-xs leading-snug",
                  note.completed ? "text-slate-300" : "text-slate-400",
                )}
              >
                {note.description}
              </p>

              <div
                className={cn(
                  "flex items-center justify-between gap-2 pt-0.5 transition-opacity",
                  note.completed && "opacity-40",
                )}
              >
                <div className="flex flex-wrap items-center gap-1">
                  {note.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="px-1.5 py-0 text-[10px] font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {note.priority && (
                    <Badge
                      variant={PRIORITY_CONFIG[note.priority].variant}
                      className="px-1.5 py-0 text-[10px] font-medium"
                    >
                      {PRIORITY_CONFIG[note.priority].label}
                    </Badge>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1 text-[11px] text-slate-400">
                  <Calendar01Icon size={12} />
                  <span>{note.dueDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
              className="absolute top-2 right-2 rounded-md p-1 text-slate-600 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-400"
              aria-label="Delete note"
            >
              <Delete02Icon size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
