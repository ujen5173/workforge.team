import { type Metadata } from "next";

import { TooltipProvider } from "~/components/ui/tooltip";
import { constructMetadata } from "~/lib/site";
import { cn } from "~/lib/utils";
import { StoreProvider } from "~/stores/StoreProvider";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/headers/main-header";
import { bagossVF } from "./config/font";

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(bagossVF.className, "font-sans")}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <StoreProvider>
            <TooltipProvider>
              <Header />

              {children}
            </TooltipProvider>
          </StoreProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
