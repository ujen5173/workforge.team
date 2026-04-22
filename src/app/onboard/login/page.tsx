"use client";

import { useForm } from "@tanstack/react-form";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(254, "Email must be at most 254 characters."),
  password: passwordRules.or(z.literal("")),
});

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log({ value });

      toast.success("Form submitted successfully");
    },
  });

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
            Welcome back Captain
          </h1>
          <p className="text-foreground mb-6 text-sm">
            Sign in using the form, or the Google account you use at work
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
            Sign in using Google
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

            <div className="mt-6 mb-3">
              <Button className="w-full" type="submit">
                Continue with work email
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
