"use client";

import { useForm, useStore } from "@tanstack/react-form";
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
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
import { authClient } from "~/server/better-auth/client";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(254, "Email must be at most 254 characters."),
  password: z.string().max(128),
});

const LoginPage = () => {
  const router = useRouter();
  const [showMagicLinkFlow, setShowMagicLinkFlow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: showMagicLinkFlow
        ? z.object({
            email: formSchema.shape.email,
            password: z.string(),
          })
        : formSchema,
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;

      const res = await authClient.signIn.email({ email, password });

      if (res.error) {
        toast.error(
          res.error.message ??
            "Failed to sign in. Please check your credentials.",
        );
        return;
      }

      const sessionData = await authClient.getSession();
      const orgSlug = (
        sessionData.data?.session as
          | { activeOrganizationSlug?: string }
          | undefined
      )?.activeOrganizationSlug;

      if (!orgSlug) {
        toast.error("No workspace found for this account.");
        return;
      }

      const baseDomain =
        process.env.NODE_ENV === "production"
          ? "workforge.team"
          : "lvh.me:3000";

      window.location.href = `http://${orgSlug}.${baseDomain}/app`;
    },
  });

  const formValues = useStore(form.store, (state) => state);

  const handleMagicLink = async () => {
    try {
      const res = await authClient.signIn.magicLink({
        email: formValues.values.email,
      });
      if (res.error) {
        toast.error(res.error.message ?? "Failed to send magic link.");
        return;
      }
      toast.success("Magic link sent! Check your inbox.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex flex-1 justify-center items-center w-full">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-4">
          <Button
            type="button"
            onClick={() => {
              if (showMagicLinkFlow) {
                setShowMagicLinkFlow(false);
                form.resetField("password");
              } else {
                void router.back();
              }
            }}
            icon={ChevronLeft}
            variant="link"
            className="px-0"
          >
            Back
          </Button>
        </div>

        <div>
          <h1 className="mb-2 font-semibold text-slate-800 text-2xl">
            Welcome back Captain
          </h1>
          <p className="mb-6 text-foreground text-sm">
            {showMagicLinkFlow
              ? "Enter your email and we'll send you a magic link to sign in"
              : "Sign in using the form, or the Google account you use at work"}
          </p>

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

              {!showMagicLinkFlow && (
                <form.Field name="password">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                            autoComplete="current-password"
                            className="pr-10 tracking-wider"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              )}
            </FieldGroup>

            {showMagicLinkFlow ? (
              <div className="mt-6">
                <Button
                  className="w-full"
                  type="button"
                  onClick={handleMagicLink}
                >
                  Send Magic Link
                </Button>
              </div>
            ) : (
              <>
                <div className="mt-6">
                  <form.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Signing in…" : "Continue"}
                      </Button>
                    )}
                  </form.Subscribe>
                </div>

                <div className="relative flex justify-center items-center my-3 font-semibold text-slate-400 text-sm">
                  <div className="top-1/2 left-0 absolute bg-border w-[45%] h-0.5 -translate-y-1/2" />
                  OR
                  <div className="top-1/2 right-0 absolute bg-border w-[45%] h-0.5 -translate-y-1/2" />
                </div>

                <Button
                  className="w-full"
                  variant="secondary"
                  type="button"
                  onClick={() => setShowMagicLinkFlow(true)}
                >
                  Continue with Magic Link
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
