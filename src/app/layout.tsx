import "~/styles/globals.css";

import { type Metadata } from "next";

import { TooltipProvider } from "~/components/ui/tooltip";
import { constructMetadata } from "~/lib/site";
import { cn } from "~/lib/utils";
import { StoreProvider } from "~/stores/StoreProvider";
import { TRPCReactProvider } from "~/trpc/react";

import { headers } from "next/headers";
import { Toaster } from "sonner";
import { auth } from "~/server/better-auth";
import Header from "./_components/headers/main-header";
import { DateHydrator } from "./_components/layouts/RootLayoutContainer";
import { getDateData } from "./actions/date";
import { bagossVF } from "./config/font";

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dateData = await getDateData();

  const user = await auth.api.getSession({
    headers: await headers(),
  });

  console.log({ user });

  return (
    <html
      lang="en"
      className={cn(bagossVF.className, "font-sans")}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <StoreProvider>
            <DateHydrator data={dateData} />
            <TooltipProvider>
              <Header />

              {children}
            </TooltipProvider>

            <Toaster />
          </StoreProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
