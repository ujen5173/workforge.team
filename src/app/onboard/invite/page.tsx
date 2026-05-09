"use client";

import { useForm, useStore } from "@tanstack/react-form";
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { passwordRules } from "~/app/_components/onboaring/schema";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";

const formSchema = z
  .object({
    token: z.string().min(1, "Invitation token is missing."),
    email: z.string().email().max(254),
    role: z.string().min(1, "Role is missing."),
    position: z.string().min(1, "Position is missing."),
    invitedByName: z.string().optional(),
    invitedByRole: z.string().optional(),
    organizationName: z.string().optional(),
    password: passwordRules,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const InvitePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const defaults = useMemo(
    () => ({
      token: searchParams.get("token") ?? "",
      email: searchParams.get("email") ?? "ujen.basi@workforge.team",
      role: searchParams.get("role") ?? "Intern",
      position: searchParams.get("position") ?? "Full stack developer",
      invitedByName: searchParams.get("invitedBy") ?? "Ashwesha Shrestha",
      invitedByRole: searchParams.get("invitedByRole") ?? "CEO",
      organizationName: searchParams.get("org") ?? "Workforge",
      password: "",
      confirmPassword: "",
    }),
    [searchParams],
  );

  const form = useForm({
    defaultValues: defaults,
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      console.log("Invite acceptance payload", value);
      toast.success("Password set. Invitation accepted.");
      router.push("/onboard/login");
    },
  });

  const v = useStore(form.store, (s) => s.values);

  const inviterInitials = (v.invitedByName ?? "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const tokenMissing = !v.token;

  return (
    <div className="w-full max-w-4xl">
      <div className="flex bg-white shadow-teal-900/10 shadow-xl border border-white/60 rounded-2xl overflow-hidden">
        <aside className="relative flex flex-col gap-8 bg-slate-900 px-7 py-8 w-80 overflow-hidden shrink-0">
          <div className="top-0 -right-15 absolute bg-primary/60 blur-[80px] rounded-full w-48 h-48 pointer-events-none" />
          <div className="space-y-3">
            <div className="flex justify-center items-center bg-primary/20 p-1.5 border border-primary/25 rounded-xl w-12 h-12 font-bold text-primary text-xl">
              <Image
                src="/logo.svg"
                alt="Company Logo"
                width={200}
                height={200}
                className="size-12"
              />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest">
                You&apos;re invited to
              </p>
              <p className="mt-0.5 font-semibold text-white text-lg leading-snug">
                {v.organizationName ?? "your workspace"}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-6 border-slate-800 border-t">
            <ContextRow label="Email" value={v.email} />
            <ContextRow label="Role" value={v.role} />
            <ContextRow label="Position" value={v.position} />
          </div>

          {v.invitedByName && (
            <div className="flex items-center gap-2.5 bg-slate-800/60 mt-auto px-3 py-2.5 border border-slate-700/50 rounded-lg">
              <div className="flex justify-center items-center bg-slate-700 rounded-full w-8 h-8 font-semibold text-slate-300 text-xs shrink-0">
                {inviterInitials}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 leading-none">
                  Invited by
                </p>
                <p className="mt-0.5 font-medium text-white text-xs truncate">
                  {v.invitedByName}
                  {v.invitedByRole && (
                    <span className="ml-1 font-normal text-slate-400">
                      · {v.invitedByRole}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </aside>

        <section className="flex flex-col flex-1 px-8 py-8">
          <div className="mb-6">
            <h1 className="font-semibold text-slate-900 text-xl">
              Create your password
            </h1>
            <p className="mt-1 text-slate-500 text-sm">
              Set a secure password to activate your account and access the
              workspace.
            </p>
          </div>

          {tokenMissing && (
            <div className="bg-destructive/5 mb-5 px-4 py-3 border border-destructive/20 rounded-xl">
              <p className="font-medium text-destructive text-sm">
                Invitation token missing
              </p>
              <p className="mt-0.5 text-destructive/80 text-xs">
                Reopen the invite link from your email or ask the inviter to
                resend it.
              </p>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
            className="flex flex-col flex-1 gap-4"
          >
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>New password</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="••••••••••"
                        autoComplete="new-password"
                        className="pr-10 tracking-wider"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="right-3 absolute inset-y-0 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <ViewOffSlashIcon size={16} />
                        ) : (
                          <ViewIcon size={16} />
                        )}
                      </button>
                    </div>
                    <FieldDescription className="italic">
                      At least 10 characters — uppercase, lowercase, number, and
                      symbol.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showConfirmPassword ? "text" : "password"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="••••••••••"
                        autoComplete="new-password"
                        className="pr-10 tracking-wider"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((p) => !p)}
                        className="right-3 absolute inset-y-0 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <ViewOffSlashIcon size={16} />
                        ) : (
                          <ViewIcon size={16} />
                        )}
                      </button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <div className="space-y-2 mt-auto pt-4 border-slate-100 border-t">
              <form.Subscribe selector={(s) => s.isSubmitting}>
                {(isSubmitting) => (
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting || tokenMissing}
                  >
                    {isSubmitting
                      ? "Accepting…"
                      : "Accept invitation & join workspace"}
                  </Button>
                )}
              </form.Subscribe>
              <p className="text-slate-400 text-xs">
                By continuing, you agree to create an account and join this
                workspace.
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

const ContextRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-3">
    <span className="text-slate-500 text-xs shrink-0">{label}</span>
    <span className="font-medium text-slate-300 text-xs text-right break-all leading-relaxed">
      {value}
    </span>
  </div>
);

export default InvitePage;
