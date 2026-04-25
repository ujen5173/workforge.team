"use client";

import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import {
  Cancel01Icon,
  Crown02Icon,
  ImageUploadIcon,
  Mail01Icon,
  SparklesIcon,
  UserAdd01Icon,
  UserGroupIcon,
  UserIcon,
  UserSettings01Icon,
} from "hugeicons-react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type TeamInvite = {
  id: string;
  email: string;
  role: string;
};

const INDUSTRIES = [
  "Technology & Software",
  "Finance & Banking",
  "Healthcare & Biotech",
  "E-commerce & Retail",
  "Education & EdTech",
  "Manufacturing",
  "Media & Entertainment",
  "Legal & Compliance",
  "Logistics & Supply Chain",
  "Consulting & Professional Services",
  "Real Estate",
  "Other",
] as const;

const TEAM_SIZES = [
  { label: "1–10", value: "1-10" },
  { label: "11–25", value: "11-25" },
  { label: "26–50", value: "26-50" },
  { label: "50+", value: "50+" },
] as const;

const ROLES = [
  {
    value: "ceo",
    label: "CEO / Founder",
    description: "Full access across the entire workspace",
    Icon: Crown02Icon,
  },
  {
    value: "hr",
    label: "HR Manager",
    description: "Manage people, payroll & leave",
    Icon: UserSettings01Icon,
  },
] as const;

const INVITE_ROLE_OPTIONS = [
  { value: "hr", label: "HR Manager" },
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
] as const;

const STEPS = [
  { id: 1, label: "Identity" },
  { id: 2, label: "Details" },
  { id: 3, label: "Your Role" },
  { id: 4, label: "Team" },
] as const;

const slugSchema = z
  .string()
  .min(2, "Slug must be at least 2 characters.")
  .max(32, "Slug must be at most 32 characters.")
  .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens.")
  .regex(/^[a-z0-9]/, "Must start with a letter or number.")
  .regex(/[a-z0-9]$/, "Must end with a letter or number.");

const step1Schema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters.")
    .max(64, "Company name must be at most 64 characters."),
  slug: slugSchema,
  tagline: z.string().max(80, "Tagline must be at most 80 characters."),
});

const step2Schema = z.object({
  industry: z.string().min(1, "Please select an industry."),
  teamSize: z.string().min(1, "Please select a team size."),
  website: z
    .string()
    .url("Please enter a valid URL including https://.")
    .max(256, "URL is too long.")
    .or(z.literal("")),
  description: z
    .string()
    .max(280, "Description must be at most 280 characters.")
    .or(z.literal("")),
});

const step3Schema = z.object({
  yourRole: z.string().min(1, "Please select your role."),
  jobTitle: z
    .string()
    .min(1, "Please enter your job title.")
    .max(64, "Job title must be at most 64 characters."),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);

const StepIndicator = ({ current }: { current: number }) => (
  <div className="mb-8 flex items-center gap-1.5">
    {STEPS.map((step, i) => {
      const done = current > step.id;
      const active = current === step.id;
      return (
        <div key={step.id} className="flex items-center gap-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 ${
                done
                  ? "bg-primary text-primary-foreground scale-95"
                  : active
                    ? "border-primary text-primary border-2"
                    : "border-border text-muted-foreground border-2"
              }`}
            >
              {done ? "✓" : step.id}
            </div>
            <span
              className={`hidden text-sm font-medium sm:inline ${
                active
                  ? "text-slate-800"
                  : done
                    ? "text-slate-500"
                    : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-px w-6 flex-shrink-0 transition-colors duration-300 sm:w-10 ${
                done ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

const LogoUploader = ({
  preview,
  companyName,
  onChange,
}: {
  preview: string | null;
  companyName: string;
  onChange: (dataUrl: string | null) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const initials = companyName
    ? companyName
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "WF";

  return (
    <div className="flex items-center gap-4">
      {/* Avatar preview */}
      <div
        className="bg-primary/10 border-border relative flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 transition-all hover:opacity-80"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Company logo"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-primary text-lg font-bold tracking-tight select-none">
            {initials}
          </span>
        )}
      </div>

      {/* Drop zone */}
      <div
        className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 py-3 text-center transition-all ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-slate-50"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        <ImageUploadIcon className="text-muted-foreground h-5 w-5" />
        <p className="text-muted-foreground text-xs">
          <span className="text-primary font-medium">Click to upload</span> or
          drag & drop
        </p>
        <p className="text-muted-foreground text-[11px]">PNG, JPG · max 2 MB</p>
      </div>

      {/* Remove button */}
      {preview && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-muted-foreground hover:text-destructive flex-shrink-0 transition-colors"
          aria-label="Remove logo"
        >
          <Cancel01Icon className="h-4 w-4" />
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
};

const TeamSizePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="grid grid-cols-4 gap-2">
    {TEAM_SIZES.map((size) => (
      <button
        key={size.value}
        type="button"
        onClick={() => onChange(size.value)}
        className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
          value === size.value
            ? "border-primary bg-primary/5 text-primary"
            : "border-border text-foreground hover:border-primary/50"
        }`}
      >
        {size.label}
      </button>
    ))}
  </div>
);

const RoleCard = ({
  role,
  selected,
  onSelect,
}: {
  role: (typeof ROLES)[number];
  selected: boolean;
  onSelect: () => void;
}) => {
  const { Icon, label, description } = role;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150 ${
        selected
          ? "border-primary bg-primary/5 ring-primary/20 ring-2"
          : "border-border hover:border-primary/40 hover:bg-slate-50"
      }`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold ${selected ? "text-primary" : "text-slate-800"}`}
        >
          {label}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-snug">
          {description}
        </p>
      </div>
    </button>
  );
};

const InviteRow = ({
  invite,
  onRemove,
}: {
  invite: TeamInvite;
  onRemove: () => void;
}) => {
  const roleLabel =
    INVITE_ROLE_OPTIONS.find((r) => r.value === invite.role)?.label ??
    invite.role;
  return (
    <div className="border-border flex items-center gap-3 rounded-lg border px-3 py-2">
      <div className="bg-primary/10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
        <UserIcon className="text-primary h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-800">
          {invite.email}
        </p>
        <p className="text-muted-foreground text-xs">{roleLabel}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive flex-shrink-0 transition-colors"
        aria-label={`Remove ${invite.email}`}
      >
        <Cancel01Icon className="h-4 w-4" />
      </button>
    </div>
  );
};

const CompanyOnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [slugEdited, setSlugEdited] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Step 4 state — kept outside TanStack Form since it's dynamic
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("employee");
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [inviteError, setInviteError] = useState("");

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      companyName: "",
      slug: "",
      tagline: "",
      industry: "",
      teamSize: "",
      website: "",
      description: "",
      yourRole: "",
      jobTitle: "",
    },
    onSubmit: async ({ value }) => {
      const parsed = fullSchema.safeParse(value);
      if (!parsed.success) {
        toast.error("Please fix the errors before submitting.");
        return;
      }
      toast.success("Workspace created! Welcome to WorkForge 🎉");
      // router.push(`/dashboard`);
    },
  });

  const slugValue = useStore(form.store, (s) => s.values.slug);
  const companyNameValue = useStore(form.store, (s) => s.values.companyName);
  const taglineValue = useStore(form.store, (s) => s.values.tagline);
  const descriptionValue = useStore(form.store, (s) => s.values.description);
  const yourRoleValue = useStore(form.store, (s) => s.values.yourRole);

  const validateStep = (n: number) => {
    const values = form.state.values;
    if (n === 1) {
      const result = step1Schema.safeParse(values);
      if (!result.success) {
        toast.error(
          result.error.issues[0]?.message ??
            "Please complete all required fields.",
        );
        return false;
      }
    }
    if (n === 2) {
      const result = step2Schema.safeParse(values);
      if (!result.success) {
        toast.error(
          result.error.issues[0]?.message ??
            "Please complete all required fields.",
        );
        return false;
      }
    }
    if (n === 3) {
      const result = step3Schema.safeParse(values);
      if (!result.success) {
        toast.error(
          result.error.issues[0]?.message ??
            "Please select your role and job title.",
        );
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateStep(step)) return;
    setStep((s) => s + 1);
  };

  const handleAddInvite = () => {
    setInviteError("");
    const parsed = z.string().email().safeParse(inviteEmail.trim());
    if (!parsed.success) {
      setInviteError("Please enter a valid email address.");
      return;
    }
    if (invites.some((i) => i.email === inviteEmail.trim())) {
      setInviteError("This email has already been added.");
      return;
    }
    setInvites((prev) => [
      ...prev,
      { id: crypto.randomUUID(), email: inviteEmail.trim(), role: inviteRole },
    ]);
    setInviteEmail("");
    setInviteRole("employee");
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result;
      if (typeof text !== "string") return;

      const lines = text.split("\n").filter((line) => line.trim() !== "");

      const newInvites: TeamInvite[] = [];
      let addedCount = 0;
      let errorCount = 0;

      const startIdx = lines[0]?.toLowerCase().includes("email") ? 1 : 0;

      for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        const parts = line.split(",");

        const emailRaw = (parts[0] ?? "").trim().replace(/^"|"$/g, "");

        const roleRaw = (parts[1] ?? "")
          .trim()
          .replace(/^"|"$/g, "")
          .toLowerCase();

        const parsed = z.string().email().safeParse(emailRaw);

        if (parsed.success) {
          const isDuplicate =
            invites.some((inv) => inv.email === emailRaw) ||
            newInvites.some((inv) => inv.email === emailRaw);

          if (!isDuplicate) {
            const validRole =
              INVITE_ROLE_OPTIONS.find((r) => r.value === roleRaw)?.value ??
              "employee";

            newInvites.push({
              id: crypto.randomUUID(),
              email: emailRaw,
              role: validRole,
            });

            addedCount++;
          }
        } else {
          errorCount++;
        }
      }

      if (newInvites.length > 0) {
        setInvites((prev) => [...prev, ...newInvites]);

        toast.success(
          `Added ${addedCount} team members${
            errorCount > 0 ? ` (${errorCount} invalid rows skipped)` : ""
          }`,
        );
      } else if (errorCount > 0) {
        toast.error(
          `Could not parse ${errorCount} rows. Make sure the format is: email,role`,
        );
      } else {
        toast.error("No valid emails found in the file.");
      }
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  const stepHeader = [
    {
      title: "Set up your company profile",
      subtitle: "This is how your workspace will appear to your team.",
    },
    {
      title: "Tell us about your company",
      subtitle: "A few details to personalise your WorkForge workspace.",
    },
    {
      title: "Define your role",
      subtitle: "How you're set up determines your access and dashboard.",
    },
    {
      title: "Invite your team",
      subtitle:
        "Start building your team. You can always add more people later.",
    },
  ][step - 1]!;

  return (
    <main className="flex w-full flex-1 items-center justify-center py-10">
      <div className="mx-auto w-full max-w-lg">
        {/* Back navigation */}
        <div className="mb-4">
          <Button
            type="button"
            onClick={() => (step === 1 ? router.back() : setStep((s) => s - 1))}
            icon={ChevronLeft}
            variant="link"
            className="px-0"
          >
            {step === 1 ? "Back" : "Previous step"}
          </Button>
        </div>

        <StepIndicator current={step} />

        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-1.5 text-2xl font-semibold text-slate-800">
            {stepHeader.title}
          </h1>
          <p className="text-muted-foreground text-sm">{stepHeader.subtitle}</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 4) {
              handleContinue();
            } else {
              void form.handleSubmit();
            }
          }}
          className="space-y-4"
        >
          {/* ─── Step 1: Identity ──────────────────────────────────── */}
          {step === 1 && (
            <>
              {/* Logo */}
              <FieldGroup>
                <Field>
                  <FieldLabel>Company Logo</FieldLabel>
                  <LogoUploader
                    preview={logoPreview}
                    companyName={companyNameValue}
                    onChange={setLogoPreview}
                  />
                  <FieldDescription className="italic">
                    PNG or JPG · max 2 MB
                  </FieldDescription>
                </Field>
              </FieldGroup>

              {/* Company Name */}
              <FieldGroup>
                <form.Field name="companyName">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Company Name
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                            if (!slugEdited) {
                              form.setFieldValue(
                                "slug",
                                toSlug(e.target.value),
                              );
                            }
                          }}
                          aria-invalid={isInvalid}
                          placeholder="Acme Corporation"
                          autoComplete="organization"
                          className="tracking-wide"
                        />
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              {/* Workspace Slug */}
              <FieldGroup>
                <form.Field
                  name="slug"
                  validators={{
                    onChange: ({ value }) => {
                      const result = slugSchema.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Workspace URL
                        </FieldLabel>
                        <div className="flex items-center">
                          <Input
                            id={field.name}
                            name={field.name}
                            type="text"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              setSlugEdited(true);
                              field.handleChange(e.target.value);
                            }}
                            aria-invalid={isInvalid}
                            placeholder="acme"
                            className="rounded-r-none tracking-wide"
                          />
                          <span className="border-border bg-muted text-muted-foreground flex h-10 items-center rounded-r-md border border-l-0 px-3 text-sm select-none">
                            .workforge.team
                          </span>
                        </div>
                        <FieldDescription className="italic">
                          Your team logs in at{" "}
                          <span className="text-primary font-medium not-italic">
                            {slugValue ?? "your-company"}.workforge.team
                          </span>
                        </FieldDescription>
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              {/* Tagline */}
              <FieldGroup>
                <form.Field name="tagline">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    const charCount = field.state.value.length;
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex items-center justify-between">
                          <FieldLabel htmlFor={field.name}>
                            <SparklesIcon className="mr-1.5 mb-0.5 inline h-4 w-4" />
                            Tagline / Spirit{" "}
                            <span className="text-muted-foreground font-normal">
                              (optional)
                            </span>
                          </FieldLabel>
                          <span
                            className={`text-xs tabular-nums ${
                              charCount > 72
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }`}
                          >
                            {charCount}/80
                          </span>
                        </div>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Build fast, ship often, stay human."
                          className="italic"
                        />
                        <FieldDescription className="italic">
                          A short motto that captures your company&apos;s
                          spirit.
                        </FieldDescription>
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              <div className="mt-6 mb-3">
                <Button className="w-full" type="submit">
                  Continue
                </Button>
              </div>
            </>
          )}

          {/* ─── Step 2: Details ───────────────────────────────────── */}
          {step === 2 && (
            <>
              {/* Industry */}
              <FieldGroup>
                <form.Field name="industry">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Industry</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => field.handleChange(value)}
                        >
                          <SelectTrigger
                            className={`w-full ${!field.state.value ? "text-muted-foreground" : ""}`}
                            id={field.name}
                            aria-invalid={isInvalid}
                          >
                            <SelectValue placeholder="Select your industry…" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDUSTRIES.map((ind) => (
                              <SelectItem key={ind} value={ind}>
                                {ind}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              {/* Team Size */}
              <FieldGroup>
                <form.Field name="teamSize">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Team size</FieldLabel>
                        <TeamSizePicker
                          value={field.state.value}
                          onChange={field.handleChange}
                        />
                        <FieldDescription className="italic">
                          WorkForge is optimised for small teams under 50
                          people.
                        </FieldDescription>
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              {/* Website */}
              <FieldGroup>
                <form.Field
                  name="website"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return undefined;
                      const result = z.string().url().safeParse(value);
                      return result.success
                        ? undefined
                        : "Please enter a valid URL including https://.";
                    },
                  }}
                >
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Company Website{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="https://acme.com"
                          iconPlacement="left"
                          className="tracking-wide"
                        />
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              <FieldGroup>
                <form.Field name="description">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    const charCount = field.state.value.length;
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex items-center justify-between">
                          <FieldLabel htmlFor={field.name}>
                            Short Description{" "}
                            <span className="text-muted-foreground font-normal">
                              (optional)
                            </span>
                          </FieldLabel>
                          <span
                            className={`text-xs tabular-nums ${
                              charCount > 260
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }`}
                          >
                            {charCount}/280
                          </span>
                        </div>
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          rows={3}
                          placeholder="A one-liner about what your company does…"
                          className={`border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-1 ${
                            isInvalid ? "border-destructive" : ""
                          }`}
                        />
                        <FieldDescription className="italic">
                          Shown on your company profile and team invitations.
                        </FieldDescription>
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              <div className="mt-6 mb-3">
                <Button className="w-full" type="submit">
                  Continue
                </Button>
              </div>
            </>
          )}

          {/* ─── Step 3: Your Role ─────────────────────────────────── */}
          {step === 3 && (
            <>
              {/* Role picker */}
              <FieldGroup>
                <form.Field name="yourRole">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>
                          <UserSettings01Icon className="mr-1.5 mb-0.5 inline h-4 w-4" />
                          What&apos;s your role?
                        </FieldLabel>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {ROLES.map((role) => (
                            <RoleCard
                              key={role.value}
                              role={role}
                              selected={field.state.value === role.value}
                              onSelect={() => field.handleChange(role.value)}
                            />
                          ))}
                        </div>
                        <FieldDescription className="italic">
                          This determines your dashboard view and access level.
                        </FieldDescription>
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              {/* Job Title */}
              <FieldGroup>
                <form.Field
                  name="jobTitle"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return "Please enter your job title.";
                      if (value.length > 64)
                        return "Job title must be at most 64 characters.";
                      return undefined;
                    },
                  }}
                >
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Your Job Title
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder={
                            yourRoleValue === "ceo"
                              ? "CEO, Founder, Director…"
                              : yourRoleValue === "hr"
                                ? "HR Manager, People Ops…"
                                : yourRoleValue === "manager"
                                  ? "Engineering Manager, Team Lead…"
                                  : "Software Engineer, Designer…"
                          }
                          iconPlacement="left"
                        />
                        <FieldDescription className="italic">
                          Shown on your profile and visible to your team.
                        </FieldDescription>
                        {/* {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )} */}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              <div className="mt-6 mb-3">
                <Button className="w-full" type="submit">
                  Continue
                </Button>
              </div>
            </>
          )}

          {/* ─── Step 4: Invite Team ───────────────────────────────── */}
          {step === 4 && (
            <>
              {/* Email + role input row */}
              <FieldGroup>
                <Field>
                  <FieldLabel>
                    <div className="flex w-full items-center justify-between">
                      <span className="flex items-center">
                        <Mail01Icon className="mr-1.5 mb-0.5 inline h-4 w-4" />
                        Invite by email
                      </span>
                      <label className="text-primary flex cursor-pointer items-center text-xs hover:underline">
                        Bulk Invite (CSV)
                        <input
                          type="file"
                          accept=".csv"
                          className="sr-only"
                          onChange={handleBulkUpload}
                        />
                      </label>
                    </div>
                  </FieldLabel>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail01Icon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => {
                          setInviteEmail(e.target.value);
                          setInviteError("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddInvite();
                          }
                        }}
                        placeholder="colleague@company.com"
                      />
                    </div>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger className="h-9 w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {INVITE_ROLE_OPTIONS.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddInvite}
                      className="flex-shrink-0"
                      icon={UserAdd01Icon}
                    >
                      Add
                    </Button>
                  </div>
                  {inviteError && (
                    <p className="text-destructive mt-1 text-xs">
                      {inviteError}
                    </p>
                  )}
                  <FieldDescription className="italic">
                    Invites are sent once your workspace is created.
                  </FieldDescription>
                </Field>
              </FieldGroup>

              {/* Invite list */}
              {invites.length > 0 && (
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Pending invites · {invites.length}
                  </p>
                  <div className="space-y-1.5">
                    {invites.map((invite) => (
                      <InviteRow
                        key={invite.id}
                        invite={invite}
                        onRemove={() =>
                          setInvites((prev) =>
                            prev.filter((i) => i.id !== invite.id),
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {invites.length === 0 && (
                <div className="border-border rounded-xl border border-dashed px-6 py-8 text-center">
                  <UserGroupIcon className="text-muted-foreground/50 mx-auto mb-2 h-8 w-8" />
                  <p className="text-muted-foreground text-sm">
                    No team members added yet
                  </p>
                  <p className="text-muted-foreground/70 mt-0.5 text-xs">
                    Enter an email above to invite someone
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-6 space-y-2">
                <Button className="w-full" type="submit">
                  {invites.length > 0
                    ? `Create workspace & send ${invites.length} invite${invites.length > 1 ? "s" : ""}`
                    : "Create workspace"}
                </Button>
                {invites.length === 0 && (
                  <Button
                    type="submit"
                    variant="ghost"
                    className="text-muted-foreground w-full text-sm"
                  >
                    Skip for now, I&apos;ll invite my team later
                  </Button>
                )}
              </div>

              <p className="text-foreground/70 mt-2 text-xs italic">
                You can manage team members anytime from{" "}
                <Link href="/settings/team" className="text-primary underline">
                  Team Settings
                </Link>
                .
              </p>
            </>
          )}
        </form>
      </div>
    </main>
  );
};

export default CompanyOnboardingPage;
