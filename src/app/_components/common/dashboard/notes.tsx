"use client";

import { CheckmarkCircle02Icon, Delete02Icon, NoteIcon } from "hugeicons-react";
import { useEffect, useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

import NewNoteDialog from "./new-note-dialog";

type Priority = "urgent" | "moderate" | "low";

interface Note {
  id: string;
  title: string;
  description: string;
  priority?: Priority;
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

const NOTES_KEY = "notes";

const Notes = () => {
  const [notesDOpen, setNotesDOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(NOTES_KEY) ?? "[]";
      const parsed = JSON.parse(raw) as Note[];
      setNotes(parsed.map((n) => ({ ...n })));
    } catch {
      setNotes([]);
    }
  }, []);

  const toggleNote = (id: string) => {
    setNotes((prev) => {
      const next = prev.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note,
      );
      localStorage.setItem(NOTES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => {
      const next = prev.filter((note) => note.id !== id);
      localStorage.setItem(NOTES_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="border-border flex h-full w-full max-w-sm flex-col rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <NoteIcon size={15} />
          </div>
          <p className="text-sm font-semibold text-slate-800">Notes</p>
        </div>
        <NewNoteDialog
          open={notesDOpen}
          setOpen={setNotesDOpen}
          setNotes={setNotes}
          notesKey={NOTES_KEY}
        />
      </div>

      <Separator className="my-3" />

      <div className="flex-1">
        {notes.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-1.5 py-6 text-center">
            <CheckmarkCircle02Icon size={28} className="text-slate-300" />
            <p className="text-sm font-medium text-slate-400">All clear!</p>
            <p className="text-xs text-slate-300">No notes remaining.</p>
          </div>
        )}
        <ScrollArea className="h-full max-h-60 w-full flex-1">
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
                    "text-xs leading-snug line-clamp-2",
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
                    {note.priority && (
                      <Badge
                        variant={PRIORITY_CONFIG[note.priority].variant}
                        className="px-1.5 py-0 text-[10px] font-medium"
                      >
                        {PRIORITY_CONFIG[note.priority].label}
                      </Badge>
                    )}
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default Notes;
