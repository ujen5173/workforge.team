import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { AppSidebar } from "~/app/_components/common/sidebar/app-sidebar";
import { auth } from "~/server/better-auth";
import { db } from "~/server/db";
import { member, organization } from "~/server/db/schema";

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

  // Resolve current user and their role in this organization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let role = "employee";
  if (session?.user) {
    const membership = await db.query.member.findFirst({
      where: eq(member.userId, session.user.id),
      with: { organization: { columns: { slug: true } } },
    });
    const roleValue = membership?.role?.toLowerCase();
    if (
      roleValue === "ceo" ||
      roleValue === "hr" ||
      roleValue === "manager" ||
      roleValue === "employee"
    ) {
      role = roleValue as typeof role;
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar
        role={role}
        organization={{
          id: org.id,
          name: org.name,
          slug: org.slug,
          logo: org.logo,
        }}
      />
      <SidebarInset className="bg-slate-50">{children}</SidebarInset>
    </SidebarProvider>
  );
}
