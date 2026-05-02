"use client";

import { useForm } from "@tanstack/react-form";
import { EyeIcon, Key01Icon, UserSettings01Icon } from "hugeicons-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { passwordGenerator } from "~/helpers/onboard";
import { siteConfig } from "~/lib/site";
import { useOnboard } from "~/stores/hooks";
import RoleCard from "./role-card";
import { step3Schema } from "./schema";
import { ROLES } from "./types";

const OnboardFirstUser = () => {
  const { email, password, name, jobTitle, yourRole, nextStep } = useOnboard();

  const form = useForm({
    defaultValues: {
      email,
      password,
      name,
      yourRole,
      jobTitle,
    },
    onSubmit: ({ value }) => {
      const parsingResult = step3Schema.safeParse(value);

      if (parsingResult.success) return nextStep(parsingResult.data);

      toast.error(
        "Form fields are not validated properly. Please check the values again. ",
      );
    },
  });

  const generatePassword = () => {
    const newPass = passwordGenerator();
    form.setFieldValue("password", newPass);
    toast.success("Password generated and filled in the form.");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Work Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={`ujen@${siteConfig.name.toLowerCase().replace(/\s+/g, "")}.team`}
                  autoComplete="email"
                  className="tracking-wider"
                />
                <FieldDescription className="italic">
                  Use the email address associated with your organization.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <FieldGroup>
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <div className="flex justify-between items-center gap-4">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="John Doe"
                  autoComplete="name"
                  className="tracking-wider"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <FieldGroup>
        <form.Field name="yourRole">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>
                  <UserSettings01Icon className="inline mr-1.5 mb-0.5 w-4 h-4" />
                  What&apos;s your role?
                </FieldLabel>
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                  {ROLES.filter((e) => e.value !== "employee").map((role) => (
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
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
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
                <FieldLabel htmlFor={field.name}>Your Job Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={
                    yourRole === "ceo"
                      ? "CEO, Founder, Director…"
                      : yourRole === "hr"
                        ? "HR Manager, People Ops…"
                        : yourRole === "manager"
                          ? "Engineering Manager, Team Lead…"
                          : "Software Engineer, Designer…"
                  }
                  iconPlacement="left"
                />
                <FieldDescription className="italic">
                  Shown on your profile and visible to your team.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
    </form>
  );
};

export default OnboardFirstUser;
