import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, organization } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ac = createAccessControl({
  // Resources & allowed actions
  member: ["create", "update", "delete", "read"],
  invitation: ["create", "cancel", "read"],
  organization: ["update", "delete", "read"],
});

const ownerRole = ac.newRole({
  // CEO / Higher — full control
  member: ["create", "update", "delete", "read"],
  invitation: ["create", "cancel", "read"],
  organization: ["update", "delete", "read"],
});

const hrRole = ac.newRole({
  // HR — can manage people and invitations, cannot delete org
  member: ["create", "update", "delete", "read"],
  invitation: ["create", "cancel", "read"],
  organization: ["read"],
});

const managerRole = ac.newRole({
  // Manager / Team Lead — read members, invite (HR approves)
  member: ["read"],
  invitation: ["create", "read"],
  organization: ["read"],
});

const employeeRole = ac.newRole({
  // Employee — read-only on everything
  member: ["read"],
  invitation: [],
  organization: ["read"],
});

const financeManagerRole = ac.newRole({
  // Finance Manager — read-only on everything
  member: ["read"],
  invitation: [],
  organization: ["read"],
});

export const auth = betterAuth({
  appName: "WorkForge",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
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
          html: `
            <div style="font-family:sans-serif;max-width:420px;margin:0 auto;padding:32px 24px;">
              <h2 style="margin:0 0 8px;font-size:20px;">Your verification code</h2>
              <p style="color:#666;margin:0 0 24px;font-size:14px;">
                Enter this code to continue. It expires in 5 minutes.
              </p>
              <p style="font-size:36px;font-weight:700;letter-spacing:10px;margin:0 0 24px;color:#111;">
                ${otp}
              </p>
              <p style="color:#999;font-size:12px;margin:0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          `,
        });
      },
    }),

    organization({
      ac,
      roles: {
        owner: ownerRole,
        hr: hrRole,
        manager: managerRole,
        employee: employeeRole,
        financeManager: financeManagerRole,
      },

      // The user who creates an org automatically becomes its owner
      creatorRole: "owner",

      // Only owners and HR can invite members
      allowUserToCreateOrganization: true,

      // Send invite email via Resend
      async sendInvitationEmail(data) {
        const inviteUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/accept-invitation/${data.id}`;

        await resend.emails.send({
          from: "WorkForge <onboarding@resend.dev>",
          to: data.email,
          subject: `You've been invited to join ${data.organization.name} on WorkForge`,
          html: `
            <div style="font-family:sans-serif;max-width:420px;margin:0 auto;padding:32px 24px;">
              <h2 style="margin:0 0 8px;font-size:20px;">You're invited!</h2>
              <p style="color:#444;margin:0 0 24px;font-size:14px;">
                <strong>${data.inviter.user.name}</strong> has invited you to join
                <strong>${data.organization.name}</strong> on WorkForge as
                <strong>${data.role}</strong>.
              </p>
              <a
                href="${inviteUrl}"
                style="display:inline-block;background:#111;color:#fff;padding:12px 24px;
                      border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;"
              >
                Accept Invitation
              </a>
              <p style="color:#999;font-size:12px;margin-top:24px;">
                This invitation expires in 48 hours. If you weren't expecting this, ignore it.
              </p>
            </div>
          `,
        });
      },
    }),

    // Must always be last
    nextCookies(),
  ],
});

export type WORKFORGE_ROLES =
  | "OWNER"
  | "HR"
  | "EMPLOYEE"
  | "MANAGER"
  | "FINANCE-MANAGER";
export type LOCATION_TYPE = "HYBRID" | "REMOTE" | "ONSITE";
