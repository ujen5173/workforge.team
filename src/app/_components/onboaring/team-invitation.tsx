"use client";

import {
  EyeIcon,
  Key01Icon,
  Mail01Icon,
  UserAdd01Icon,
  UserGroupIcon,
} from "hugeicons-react";
import Link from "next/link";
import { toast } from "sonner";
import z from "zod";

import { useForm, useStore } from "@tanstack/react-form";
import axios from "axios";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { passwordGenerator } from "~/helpers/onboard";
import { useOnboard } from "~/stores/hooks";
import type { Role } from "~/stores/slices/onboard.slice";
import { api } from "~/trpc/react";
import InviteRow from "./invite-row";
import { INVITE_ROLE_OPTIONS, type TeamInvite } from "./types";

type STATUS = "pending" | "error" | "success" | "idle";

const TeamInvitation = () => {
  const [inviteError, setInviteError] = useState("");
  const {
    email,
    name,
    password,
    inviteEmail,
    inviteRole,
    invitePassword,
    invites,
    nextStep,

    logo,
    setLogoURL,
  } = useOnboard();
  const { mutateAsync } = api.auth.sendVerificationOTP.useMutation();
  const [status, setStatus] = useState<STATUS>("idle");

  const form = useForm({
    defaultValues: { inviteEmail, inviteRole, invites, invitePassword },
    onSubmit: async ({ value }) => {
      try {
        setStatus("pending");
        await mutateAsync({ email, name, password });
        nextStep(value);
        const formData = new FormData();
        formData.append("logo", logo!);
        const logoUpload = await axios.post<{
          url: string;
          publicId: string;
          width: string;
          height: string;
          format: string;
          bytes: string;
        }>("/api/uploads", formData);
        if (logoUpload) {
          setLogoURL(logoUpload.data.url);
          setStatus("success");
        }
        setStatus("error");
      } catch (err) {
        console.log({ err });
        setStatus("error");
      }
    },
  });

  const formValues = useStore(form.store, (state) => state);

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
          const isDuplicate = form.setFieldValue(
            "invites",
            (formValues.values.invites ?? []).some(
              (inv) => inv.email === emailRaw,
            ) || newInvites.some((inv) => inv.email === emailRaw),
          );

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
        form.setFieldValue("invites", [
          ...formValues.values.invites,
          ...newInvites,
        ]);

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

  const handleAddInvite = () => {
    setInviteError("");
    const email = formValues.values.inviteEmail;
    const parsed = z.string().email().safeParse(email.trim());
    if (!parsed.success) {
      setInviteError("Please enter a valid email address.");
      return;
    }
    if (invites.some((i) => i.email === inviteEmail.trim())) {
      setInviteError("This email has already been added.");
      return;
    }
    form.setFieldValue("invites", [
      ...invites,
      {
        id: crypto.randomUUID(),
        email: inviteEmail.trim(),
        role: inviteRole,
      },
    ]);
    form.setFieldValue("invites", [
      ...invites,
      {
        id: crypto.randomUUID(),
        email: formValues.values.inviteEmail.trim(),
        role: formValues.values.inviteRole,
      },
    ]);
    form.setFieldValue("inviteEmail", "");
    form.setFieldValue("inviteRole", null);
  };

  const companyEmailPattern = email.split("@")[1];

  const generatePassword = () => {
    const newPass = passwordGenerator();
    form.setFieldValue("invitePassword", newPass);
    toast.success("Password generated and filled in the form.");
    void window.navigator.clipboard.writeText(newPass);
    toast.success("Password Copied to clipboard");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <div className="flex justify-between items-center w-full">
        <span className="flex items-center">
          <Mail01Icon className="inline mr-1.5 mb-0.5 w-4 h-4" />
          Invite by email
        </span>
        <label className="flex items-center text-primary text-xs hover:underline cursor-pointer">
          Bulk Invite (CSV)
          <input
            type="file"
            accept=".csv"
            className="sr-only"
            onChange={handleBulkUpload}
          />
        </label>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-2">
          <FieldGroup>
            <form.Field name="inviteEmail">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddInvite();
                        }
                      }}
                      placeholder={`colleague@${companyEmailPattern}`}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </div>
        <div className="flex-1">
          <FieldGroup>
            <form.Field name="inviteRole">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Select
                      value={inviteRole ?? undefined}
                      onValueChange={(e: Role) =>
                        form.setFieldValue("inviteRole", e)
                      }
                    >
                      <SelectTrigger className="w-[140px] h-9">
                        <SelectValue placeholder="User Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {INVITE_ROLE_OPTIONS.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleAddInvite}
          className="shrink-0"
          icon={UserAdd01Icon}
        >
          Add
        </Button>
      </div>
      {inviteError && (
        <p className="mt-1 text-destructive text-xs">{inviteError}</p>
      )}
      <p className="mt-2 mb-4 text-slate-500 text-sm italic">
        Invites are sent once your workspace is created.
      </p>

      {(formValues.values.invites ?? []).length > 0 && (
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Pending invites · {(formValues.values.invites ?? []).length}
          </p>
          <ScrollArea className="w-full h-60">
            <div className="space-y-2 pr-2.5">
              {(formValues.values.invites ?? []).map((invite) => (
                <InviteRow
                  key={invite.id}
                  invite={invite}
                  onRemove={() =>
                    form.setFieldValue(
                      "invites",
                      (formValues.values.invites ?? []).filter(
                        (i) => i.id !== invite.id,
                      ),
                    )
                  }
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      {(formValues.values.invites ?? []).length === 0 && (
        <div className="px-6 py-8 border border-border border-dashed rounded-xl text-center">
          <UserGroupIcon className="mx-auto mb-2 w-8 h-8 text-muted-foreground/50" />
          <p className="text-muted-foreground text-sm">
            No team members added yet
          </p>
          <p className="mt-0.5 text-muted-foreground/70 text-xs">
            Enter an email above to invite someone
          </p>
        </div>
      )}
      <div className="mt-4">
        <FieldGroup>
          <form.Field name="invitePassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex justify-between items-center gap-4">
                    <FieldLabel htmlFor={field.name}>
                      Password for the accounts
                    </FieldLabel>
                    <Button
                      icon={Key01Icon}
                      className="gap-1 opacity-90 px-2 py-1 rounded h-auto text-xs"
                      iconStyle="size-3"
                      variant={"outline"}
                      type={"button"}
                      onClick={generatePassword}
                    >
                      Generate password
                    </Button>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    iconPlacement="right"
                    icon={() => {
                      return (
                        <button
                          type="button"
                          className="group flex justify-center items-center border border-border rounded-sm size-7 cursor-pointer"
                          onClick={() => {
                            const input = document.getElementById(
                              field.name,
                            ) as HTMLInputElement | null;
                            if (input) {
                              input.type =
                                input.type === "password" ? "text" : "password";
                            }
                          }}
                        >
                          <EyeIcon className="opacity-70 group-hover:opacity-100 size-4" />
                        </button>
                      );
                    }}
                    placeholder="*********"
                    autoComplete="new-password"
                    className="tracking-wider"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </div>

      <div className="space-y-2 mt-6">
        <Button
          disabled={status === "pending"}
          className="w-full"
          type="submit"
        >
          {(formValues.values.invites ?? []).length > 0
            ? `Continue & send ${(formValues.values.invites ?? []).length} invite${(formValues.values.invites ?? []).length > 1 ? "s" : ""}`
            : "Continue"}
        </Button>
        {(formValues.values.invites ?? []).length === 0 && (
          <Button
            type="submit"
            disabled={status === "pending"}
            variant="ghost"
            className="w-full text-muted-foreground text-sm"
          >
            Skip for now, I&apos;ll invite my team later
          </Button>
        )}
      </div>
      <p className="mt-2 text-foreground/70 text-xs italic">
        You can manage team members anytime from{" "}
        <Link href="/settings/team" className="text-primary underline">
          Team Settings
        </Link>
        .
      </p>
    </form>
  );
};

export default TeamInvitation;
