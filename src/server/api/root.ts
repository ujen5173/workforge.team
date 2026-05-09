import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { orgRouter } from "./routers/org";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  organization: orgRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
