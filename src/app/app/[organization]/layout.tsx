import { notFound } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "~/app/_components/common/sidebar/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const company = await getCompanyBySlug(tenant);
  const company = true;

  if (!company) notFound();

  return (
    <SidebarProvider>
      <AppSidebar role="ceo" />
      <SidebarInset className="bg-slate-50">{children}</SidebarInset>
    </SidebarProvider>
  );
}
