import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, organization } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  appName: "WorkForge",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  experimental: {
    joins: true,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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
              <h2 style="margin:0 0 8px;">Your verification code</h2>
              <p style="color:#666;margin:0 0 24px;">
                Enter this code to continue. It expires in 5 minutes.
              </p>
              <p style="font-size:36px;font-weight:700;letter-spacing:10px;margin:0 0 24px;">
                ${otp}
              </p>
              <p style="color:#999;font-size:13px;margin:0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          `,
        });
      },
    }),

    organization({
      // This becomes the subdomain: company.workforge.team
      slug: {
        generate: (name: string) =>
          name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
      },

      allowUserToCreateMultipleOrganizations: true,

      // Invitation email sent when a team member is invited
      async sendInvitationEmail(data) {
        const inviteUrl = `${process.env.BETTER_AUTH_URL}/accept-invite/${data.id}`;

        await resend.emails.send({
          from: "WorkForge <onboarding@resend.dev>",
          to: data.email,
          subject: `You've been invited to join ${data.organization.name} on WorkForge`,
          html: `
            <div style="font-family:sans-serif;max-width:420px;margin:0 auto;padding:32px 24px;">
              <h2 style="margin:0 0 8px;">You're invited!</h2>
              <p style="color:#666;margin:0 0 24px;">
                <strong>${data.inviter.user.name}</strong> has invited you to join
                <strong>${data.organization.name}</strong> on WorkForge.
              </p>
              <a
                href="${inviteUrl}"
                style="display:inline-block;background:#d4a017;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;"
              >
                Accept Invitation
              </a>
              <p style="color:#999;font-size:13px;margin-top:24px;">
                This invitation expires in 48 hours.
              </p>
            </div>
          `,
        });
      },
    }),

    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
