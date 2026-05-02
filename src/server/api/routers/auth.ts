import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { fullSchema } from "~/app/_components/onboaring/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { auth } from "~/server/better-auth";
import { member, organization, user } from "~/server/db/schema";

export const authRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello world!`,
    };
  }),

  sendVerificationOTP: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, name, password } = input;
      try {
        const emailSignUp = await auth.api.signUpEmail({
          body: { name, email, password },
        });

        return emailSignUp;
      } catch (err) {
        console.log({ err });
      } finally {
        const { success } = await auth.api.sendVerificationOTP({
          body: {
            email,
            type: "email-verification",
          },
        });

        return { success };
      }
    }),

  verifyAccountAndCreateWorkspace: publicProcedure
    .input(
      fullSchema.merge(
        z.object({ otp: z.string(), logo: z.string().url().nullable() }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        otp,
        password,
        name,
        email,
        companyName,
        jobTitle,
        yourRole,
        ...rest
      } = input;
      // Steps on creating it
      // Verify OTP, and create the workspace

      try {
        const {
          status,
          token,
          user: verifiedUser,
        } = await auth.api.verifyEmailOTP({
          body: {
            email,
            otp,
          },
        });

        if (status) {
          // Create the workspace
          const org = await ctx.db
            .insert(organization)
            .values({
              ...rest,
              name: companyName,
            })
            .returning({
              id: organization.id,
            });

          const sessionUser = await ctx.db.query.user.findFirst({
            where: eq(user.email, email),
            select: {
              id: true,
            },
          });

          const mem = await ctx.db.insert(member).values({
            organizationId: org[0]!.id,
            role: yourRole.toUpperCase(),
            title: jobTitle,
            userId: sessionUser!.id,
          });

          console.log({ org, sessionUser, mem });
        } else {
          throw new TRPCError({
            message: "OTP invalid",
            code: "FORBIDDEN",
          });
        }
      } catch (err) {
        console.log({ err });
      }
    }),
});
