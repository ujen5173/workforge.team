import { getMonth, getYear } from "date-fns";
import { eq } from "drizzle-orm";
import { member, usersToOrganizations } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const orgRouter = createTRPCRouter({
  getUserOrgDetails: protectedProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.db.query.usersToOrganizations.findMany({
        where: eq(usersToOrganizations.userId, ctx.session.user.id),
        columns: {},
        with: {
          organization: {
            columns: {
              id: true,
              name: true,
              slug: true,
              logo: true,
              memberCount: true,
            },
            with: {
              members: {
                where: eq(member.userId, ctx.session.user.id),
                columns: {
                  lastWorking: true,
                  createdAt: true,
                  role: true,
                  position: true,
                },
              },
            },
          },
        },
      });

      const result = res
        .map((e) => e.organization)
        .map(({ members, ...rest }) => ({
          ...rest,
          isActive: !members[0]!.lastWorking,
          role: members[0]!.role,
          position: members[0]!.position,
          timePeriod: `${getMonth(members[0]?.createdAt ?? new Date())}, ${getYear(members[0]?.createdAt ?? new Date())} - ${members[0]?.lastWorking ? `${getMonth(members[0].lastWorking)}, ${getYear(members[0].lastWorking)}` : "Present"}`,
        }));

      return result;
    } catch (err) {
      console.log({ err });
      console.log("error");
    }
  }),
});
