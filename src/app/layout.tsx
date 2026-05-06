import "~/styles/globals.css";

import { type Metadata } from "next";

import { TooltipProvider } from "~/components/ui/tooltip";
import { constructMetadata } from "~/lib/site";
import { cn } from "~/lib/utils";
import { StoreProvider } from "~/stores/StoreProvider";
import { TRPCReactProvider } from "~/trpc/react";

import { Toaster } from "sonner";
import Header from "./_components/headers/main-header";
import RootContext from "./_components/layouts/root-context";
import { DateHydrator } from "./_components/layouts/RootLayoutContainer";
import { getDateData } from "./actions/date";
import { bagossVF } from "./config/font";

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dateData = await getDateData();

  return (
    <html
      lang="en"
      className={cn(bagossVF.className, "font-sans")}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <RootContext>
            <StoreProvider>
              <DateHydrator data={dateData} />
              <TooltipProvider>
                <Header />

                {children}
              </TooltipProvider>

              <Toaster />
            </StoreProvider>
          </RootContext>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
