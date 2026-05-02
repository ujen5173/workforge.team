import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { env } from "~/env";
import { getVerificationEmailHtml } from "~/server/emails/templates/verification-email";

const resend = new Resend(env.RESEND_API_KEY);

export const auth = betterAuth({
  appName: "WorkForge",
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 24,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
  },

  session: {
    // Cache session in cookie for 5 minutes to avoid DB hit on every request
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh if older than 1 day
  },

  advanced: {
    // Required for subdomain tenancy: cookie set on .workforge.team
    // is shared across all {slug}.workforge.team subdomains
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: ".workforge.team",
    },
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  },

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      overrideDefaultEmailVerification: true,

      async sendVerificationOTP({ email, otp, type }) {
        const subjects: Record<typeof type, string> = {
          "email-verification": "Verify your WorkForge account",
          "sign-in": "Your WorkForge sign-in code",
          "forget-password": "Reset your WorkForge password",
        };

        await resend.emails.send({
          from: "WorkForge <onboarding@resend.dev>",
          to: email,
          subject: subjects[type],
          html: getVerificationEmailHtml({ otp }),
        });
      },
    }),

    // Must always be last
    nextCookies(),
  ],
});

export type WORKFORGE_ROLES = "OWNER" | "HR" | "EMPLOYEE" | "MANAGER";
export type LOCATION_TYPE = "HYBRID" | "REMOTE" | "ONSITE";
