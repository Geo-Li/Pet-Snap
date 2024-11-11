"use client";

// shadcn components
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// components
import SideBarComponent from "../../_templates/page/SideBarComponent";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex flex-row justify-between">
      <SideBarComponent className="w-[25dvw]" />
      <main className="min-h-screen w-[75dvw]">{children}</main>
    </SidebarProvider>
  );
}
