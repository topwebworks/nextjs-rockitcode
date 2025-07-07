import { SidebarLayout } from "@/components/sidebar-layout";
import { getModules } from "@/data/lessons";
import type React from "react";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the modular navigation by default, but keep the old modules available for backward compatibility
  return <SidebarLayout modules={getModules()} useModular={true}>{children}</SidebarLayout>;
}
