import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, magicLink } from "better-auth/plugins";
import { Resend } from "resend";

import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { env } from "~/env";
import { getVerificationEmailHtml } from "~/server/emails/templates/verification-email";
import { getMagicLinkEmailHtml } from "../emails/templates/magic-link";

const resend = new Resend(env.RESEND_API_KEY);

function extractCommonAndRemaining<T>(
  arr1: T[],
  arr2: T[],
  compareFn: (a: T, b: T) => boolean,
) {
  const common: T[] = [];

  const remaining2 = [...arr2];
  const remaining: T[] = [];

  for (const item1 of arr1) {
    const index = remaining2.findIndex((item2) => compareFn(item1, item2));

    if (index !== -1) {
      common.push(item1);

      // remove matched item from second array
      remaining2.splice(index, 1);
    } else {
      remaining.push(item1);
    }
  }

  // add leftover items from arr2
  remaining.push(...remaining2);

  return {
    common,
    remaining,
  };
}

export const auth = betterAuth({
  appName: "WorkForge",
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    "http://localhost:3000",
    "http://lvh.me:3000",
    "http://*.lvh.me:3000",
    "https://workforge.team",
    "https://*.workforge.team",
  ],

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

  emailVerification: {
    autoSignInAfterVerification: true,
  },

  session: {
    additionalFields: {
      activeOrganizationSlug: {
        type: "string",
        required: false,
      },
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh if older than 1 day
  },

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const member = await db.query.member.findFirst({
            where: (member, { eq }) => eq(member.userId, session.userId),
            with: {
              organization: {
                columns: { slug: true, name: true, logo: true },
              },
            },
            columns: {
              role: true,
            },
          });

          return {
            data: {
              ...session,
              activeOrganizationSlug: member?.organization.slug,
            },
          };
        },
      },
    },
  },

  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain:
        process.env.NODE_ENV === "production" ? ".workforge.team" : ".lvh.me",
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

    magicLink({
      disableSignUp: true,
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: "WorkForge <onboarding@resend.dev>",
          to: email,
          subject: "Your WorkForge sign-in link",
          html: getMagicLinkEmailHtml({ url, email }),
        });
      },
    }),

    // Must always be last
    nextCookies(),
  ],
});

export type WORKFORGE_ROLES = "OWNER" | "HR" | "EMPLOYEE" | "MANAGER";
export type LOCATION_TYPE = "HYBRID" | "REMOTE" | "ONSITE";
