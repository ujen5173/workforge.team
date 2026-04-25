"use client";

import { useForm } from "@tanstack/react-form";
import { EyeIcon, Key01Icon } from "hugeicons-react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { siteConfig } from "~/lib/site";

const passwordRules = z
  .string()
  .min(10, "Password must be at least 10 characters long")
  .max(128, "Password must be at most 128 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase character")
  .regex(/[a-z]/, "Password must contain at least one lowercase character")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character",
  );

const nameField = (label: string) =>
  z
    .string()
    .min(2, `${label} must be at least 2 characters.`)
    .max(20, `${label} must be at most 20 characters.`)
    .regex(
      /^[a-zA-Z\s'-]+$/,
      `${label} must only contain letters, spaces, hyphens, or apostrophes.`,
    )
    .or(z.literal(""));

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(254, "Email must be at most 254 characters."),
  password: passwordRules.or(z.literal("")),
  firstName: nameField("First Name"),
  lastName: nameField("Last Name"),
});

const SignupPage = () => {
  const [proceed, setProceed] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!proceed) {
        setProceed(true);
        return;
      }

      toast.success("Form submitted successfully");
    },
  });

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const all = uppercase + lowercase + numbers + special;

    const length = Math.floor(Math.random() * 9) + 8;

    // Guarantee at least one of each required character type
    const required = [
      uppercase[Math.floor(Math.random() * uppercase.length)],
      lowercase[Math.floor(Math.random() * lowercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      special[Math.floor(Math.random() * special.length)],
    ];

    const rest = Array.from(
      { length: length - required.length },
      () => all[Math.floor(Math.random() * all.length)],
    );

    // Shuffle so the required chars aren't always at the start
    const newPass = [...required, ...rest]
      .sort(() => Math.random() - 0.5)
      .join("");

    form.setFieldValue("password", newPass);
    toast.success("Password generated and filled in the form.");
  };

  const router = useRouter();

  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-4">
          <Button
            type="button"
            onClick={() => {
              void router.back();
            }}
            icon={ChevronLeft}
            variant="link"
            className="px-0"
          >
            Back
          </Button>
        </div>

        <div>
          <h1 className="mb-2 text-2xl font-semibold text-slate-800">
            Create organization account
          </h1>
          <p className="text-foreground mb-6 text-sm">
            Sign up using the form, or the Google account you use at work
          </p>

          <Button
            variant="oauth"
            icon={() => (
              <Image
                src={"/images/svg/google.svg"}
                alt="Google Logo"
                width={16}
                height={16}
              />
            )}
          >
            Sign up using Google
          </Button>

          <div className="my-4 flex items-center gap-3 opacity-60">
            <div className="bg-border h-0.5 flex-1" />
            <p>or</p>
            <div className="bg-border h-0.5 flex-1" />
          </div>

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
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>

            {proceed && (
              <>
                <FieldGroup>
                  <form.Field name="password">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <div className="flex items-center justify-between gap-4">
                            <FieldLabel htmlFor={field.name}>
                              Password
                            </FieldLabel>
                            <Button
                              icon={Key01Icon}
                              className="h-auto gap-1 rounded px-2 py-1 text-xs opacity-90"
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
                                  className="border-border group flex size-7 cursor-pointer items-center justify-center rounded-sm border"
                                  onClick={() => {
                                    const input = document.getElementById(
                                      field.name,
                                    ) as HTMLInputElement | null;
                                    if (input) {
                                      if (input.type === "password") {
                                        input.type = "text";
                                      } else {
                                        input.type = "password";
                                      }
                                    }
                                  }}
                                >
                                  <EyeIcon className="size-4 opacity-70 group-hover:opacity-100" />
                                </button>
                              );
                            }}
                            placeholder="*********"
                            autoComplete="current-password"
                            className="tracking-wider"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </FieldGroup>
                <FieldGroup>
                  <form.Field name="firstName">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            First Name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="text"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="John"
                            autoComplete="given-name"
                            className="tracking-wider"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </FieldGroup>
                <FieldGroup>
                  <form.Field name="lastName">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Last Name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="text"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Doe"
                            autoComplete="family-name"
                            className="tracking-wider"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </FieldGroup>
              </>
            )}

            <div className="mt-6 mb-3">
              <Button className="w-full" type="submit">
                {proceed ? "Create Account" : "Continue with work email"}
              </Button>
            </div>

            <p className="text-foreground/80 text-xs italic">
              By creating your account, you confirm that you have read,
              understood, and agree to the terms in the{" "}
              <Link
                href="/terms-and-conditions"
                className="text-primary underline"
              >
                {siteConfig.name} Legal Hub
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
