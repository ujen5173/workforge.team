"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Add01Icon, Calendar01Icon } from "hugeicons-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  tags: z.string().array(),
  priority: z.enum(["urgent", "moderate", "low"]),
  dueDate: z.date({ required_error: "Due date is required." }),
  completed: z.boolean(),
});

type Priority = "urgent" | "moderate" | "low";

interface Note {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priority?: Priority;
  dueDate: Date;
  completed: boolean;
}

interface NewNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  notesKey: string;
}

const TagsInput = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
}) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setTagInput("");
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Add tag and press Enter"
          autoComplete="off"
        />
        <Button type="button" variant="outline" onClick={addTag}>
          Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {value.map((tag) => (
            <span
              key={tag}
              className="bg-muted inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
            >
              {tag}
              <button
                type="button"
                className="hover:text-destructive"
                onClick={() => onChange(value.filter((t) => t !== tag))}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

const NewNoteDialog = ({
  open,
  setOpen,
  setNotes,
  notesKey,
}: NewNoteDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      priority: "moderate",
      dueDate: new Date(),
      completed: false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const newNote: Note = {
      ...data,
      id: crypto.randomUUID(),
    };
    setNotes((prev) => {
      const next = [newNote, ...prev];
      localStorage.setItem(notesKey, JSON.stringify(next));
      return next;
    });
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        icon={Add01Icon}
        variant="outline"
        size="xs"
      >
        Add Note
      </Button>
      <DialogContent className="max-w-xl!">
        <DialogHeader className="border-border border-b pb-4">
          <DialogTitle>New Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup className="bg-white!">
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <div className="flex items-center gap-2">
              <Controller
                name="priority"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Priority</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-white!">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">🔴 Urgent</SelectItem>
                        <SelectItem value="moderate">🟡 Moderate</SelectItem>
                        <SelectItem value="low">🟢 Low</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="dueDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-duedate">
                      Due Date
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                        >
                          <Calendar01Icon />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Due Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tags</FieldLabel>
                  <TagsInput value={field.value} onChange={field.onChange} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewNoteDialog;
