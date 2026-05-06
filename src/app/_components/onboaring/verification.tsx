"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";
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
import { setTenantCookie } from "~/lib/tenant-cookie";
import { authClient } from "~/server/better-auth/client";
import { useOnboard } from "~/stores/hooks";
import { api } from "~/trpc/react";

const OTP_EXPIRY_SECONDS = 5 * 60;

const formSchema = z.object({
  verificationCode: z.string().length(6, "Enter all 6 digits"),
});

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const Verification = () => {
  const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRY_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { logo, step, logoURL, ...rest } = useOnboard();

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSecondsLeft(OTP_EXPIRY_SECONDS);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await authClient.emailOtp.sendVerificationOtp({
        email: rest.email,
        type: "email-verification",
      });
      if (res.error) {
        toast.error(res.error.message ?? "Failed to send OTP.");
        return;
      }
      toast.success("A new OTP has been sent to your email.");
      startTimer();
      form.resetField("verificationCode");
    } catch (err) {
      console.log(err);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const isExpired = secondsLeft === 0;

  const { mutateAsync: createWorkspace } =
    api.auth.createWorkspace.useMutation();

  const form = useForm({
    defaultValues: {
      verificationCode: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await authClient.emailOtp.verifyEmail({
        email: rest.email,
        otp: value.verificationCode,
      });

      if (res.error) {
        toast.error(res.error.message ?? "Invalid or expired OTP.");
        return;
      }

      const { orgSlug, success } = await createWorkspace({
        companyName: rest.companyName,
        slug: rest.slug,
        spirit: rest.spirit,
        industry: rest.industry!,
        teamSize: rest.teamSize!,
        website: rest.website,
        description: rest.description,
        yourRole: rest.yourRole!,
        jobTitle: rest.jobTitle,
        logo: logoURL,
      });
      if (success && orgSlug) {
        // Force a fresh session fetch and set an explicit tenant cookie
        // so the middleware knows the active organization immediately
        await authClient.getSession({ fetchOptions: { cache: "no-store" } });
        await setTenantCookie(orgSlug);

        toast.success("Account Activated Successfully");
        const baseDomain =
          process.env.NODE_ENV === "production"
            ? "workforge.team"
            : "lvh.me:3000";

        window.location.href = `http://${orgSlug}.${baseDomain}/app`;
      } else {
        toast.error("Failed to create workspace. Please try again.");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <form.Field name="verificationCode">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Verification OTP Code
                </FieldLabel>
                <InputOTP
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  placeholder="517399"
                  maxLength={6}
                  disabled={isExpired}
                >
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <div className="flex justify-between items-center mt-1">
                  <FieldDescription className="italic">
                    Use the email address associated with your organization.
                  </FieldDescription>
                  <div className="flex items-center gap-2 shrink-0">
                    <p className="text-slate-500">
                      Expires on{" "}
                      <span className="font-medium tabular-nums text-destructive text-sm underline">
                        {isExpired ? "Expired" : formatTime(secondsLeft)}
                      </span>
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={isResending}
                      onClick={handleResend}
                      className="px-2 py-0.5 h-auto text-sm underline"
                    >
                      {isResending ? "Sending…" : "Resend"}
                    </Button>
                  </div>
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <div className="mt-6 mb-3">
        <Button className="w-full" type="submit" disabled={isExpired}>
          Verify Account & Create Workspace
        </Button>
      </div>
    </form>
  );
};

export default Verification;
