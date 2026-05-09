import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { fullSchema } from "~/app/_components/onboaring/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { auth } from "~/server/better-auth";
import {
  member,
  organization,
  session as sessionTable,
  user,
  usersToOrganizations,
} from "~/server/db/schema";

export const authRouter = createTRPCRouter({
  signUpAndSendOTP: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        password: z.string().min(8).max(24),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, name, password } = input;

        const existing = await ctx.db.query.user.findFirst({
          where: eq(user.email, email),
          columns: { id: true, emailVerified: true },
        });

        if (existing?.emailVerified) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "An account with this email already exists.",
          });
        }

        if (!existing) {
          const result = await auth.api.signUpEmail({
            body: {
              name,
              email,
              password,
              image: `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(name.split(" ")[0] ?? "")}`,
            },
            headers: ctx.headers,
          });

          if (!result?.user) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create account.",
            });
          }
        }

        return { success: true };
      } catch (err) {
        console.log({ err });
        throw new TRPCError({
          message: "Something went wrong while runnig the code.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  createWorkspace: protectedProcedure
    .input(
      fullSchema
        .omit({ email: true, password: true, name: true, logo: true })
        .merge(
          z.object({
            logo: z.string().url().nullable(),
          }),
        ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { companyName, jobTitle, yourRole, logo, ...rest } = input;
        const verifiedUserId = ctx.session.user.id;

        const [org] = await ctx.db
          .insert(organization)
          .values({
            ...rest,
            name: companyName,
            logo,
          })
          .returning({ id: organization.id, slug: organization.slug });

        if (!org) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create workspace.",
          });
        }

        await ctx.db.insert(member).values({
          organizationId: org.id,
          role: yourRole,
          title: jobTitle,
          userId: verifiedUserId,
        });

        await ctx.db.insert(usersToOrganizations).values({
          userId: ctx.session.user.id,
          organizationId: org.id,
        });

        await ctx.db
          .update(sessionTable)
          .set({ activeOrganizationSlug: org.slug })
          .where(eq(sessionTable.token, ctx.session.session.token))
          .returning({
            activeOrganizationSlug: sessionTable.activeOrganizationSlug,
          });

        ctx.session.session.activeOrganizationSlug = org.slug;

        return { success: true, orgSlug: org.slug };
      } catch (err) {
        console.log({ err });
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getUserRole: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.member.findFirst({
      where: eq(member.userId, ctx.session.user.id),
      columns: {
        role: true,
        position: true,
      },
    });

    return res;
  }),
});
