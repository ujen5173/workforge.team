import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AppSidebar from "~/app/_components/common/sidebar/app-sidebar";
import { db } from "~/server/db";
import { organization } from "~/server/db/schema";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ organization: string }>;
}) {
  const { organization: slug } = await params;

  // Resolve tenant from database
  const org = await db.query.organization.findFirst({
    where: eq(organization.slug, slug),
  });

  if (!org) notFound();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-slate-50">{children}</SidebarInset>
    </SidebarProvider>
  );
}
