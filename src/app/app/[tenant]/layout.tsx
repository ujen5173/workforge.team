import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { notFound } from "next/navigation";
import { AppSidebar } from "~/app/_components/common/sidebar/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const company = await getCompanyBySlug(tenant);
  const company = true;

  if (!company) notFound();

  return (
    <SidebarProvider>
      <AppSidebar role="ceo" />
      <SidebarInset className="p-4">{children}</SidebarInset>
    </SidebarProvider>
  );
}
