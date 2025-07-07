"use client";

import { IconButton } from "@/components/icon-button";
import { ModularNavigation } from "@/components/modular-navigation";
import { SidebarIcon } from "@/icons/sidebar-icon";
import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { clsx } from "clsx";
import type React from "react";
import { createContext, useContext, useState } from "react";
import { Navbar } from "./navbar";
import type { NavigationSection } from "@/data/navigation";

export const ModularSidebarContext = createContext<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  isMobileDialogOpen: boolean;
  setIsMobileDialogOpen: (isMobileDialogOpen: boolean) => void;
}>({
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  isMobileDialogOpen: false,
  setIsMobileDialogOpen: () => {},
});

function MobileNavigation({
  open,
  onClose,
  sections,
}: {
  open: boolean;
  onClose: () => void;
  sections: NavigationSection[];
}) {
  return (
    <Dialog open={open} onClose={onClose} className="xl:hidden">
      <DialogBackdrop className="fixed inset-0 bg-gray-950/25" />
      <DialogPanel className="fixed inset-y-0 left-0 isolate w-sm max-w-[calc(100%-(--spacing(11)))] overflow-y-auto bg-white ring ring-gray-950/10 sm:w-xs dark:bg-gray-950 dark:ring-white/10">
        <div className="sticky top-0 z-10 px-4 py-4 sm:px-6">
          <div className="flex h-6 shrink-0">
            <CloseButton as={IconButton}>
              <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
            </CloseButton>
          </div>
        </div>
        <ModularNavigation
          sections={sections}
          onNavigate={onClose}
          className="px-4 pb-4 sm:px-6"
        />
      </DialogPanel>
    </Dialog>
  );
}

interface ModularSidebarLayoutProps {
  children: React.ReactNode;
  sections?: NavigationSection[];
  title?: string;
  description?: string;
}

export function ModularSidebarLayout({
  children,
  sections,
  title = "RockitCode",
  description = "Learn to code with interactive courses",
}: ModularSidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDialogOpen, setIsMobileDialogOpen] = useState(false);

  return (
    <ModularSidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isMobileDialogOpen,
        setIsMobileDialogOpen,
      }}
    >
      <div
        data-sidebar-collapsed={isSidebarOpen ? undefined : ""}
        className="group"
      >
        <aside className="fixed inset-y-0 left-0 w-2xs overflow-y-auto border-r border-gray-950/10 group-data-sidebar-collapsed:hidden max-xl:hidden dark:border-white/10">
          <nav aria-label="Main navigation" className="px-6 py-4">
            <div className="sticky top-4 flex h-6 items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-950 dark:text-white">
                  {title}
                </span>
              </div>
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
              </IconButton>
            </div>
            {description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
            <div className="mt-6">
              <ModularNavigation sections={sections} className="max-xl:hidden" />
            </div>
          </nav>
        </aside>
        
        <MobileNavigation
          open={isMobileDialogOpen}
          onClose={() => setIsMobileDialogOpen(false)}
          sections={sections || []}
        />
        
        <div className="xl:not-group-data-sidebar-collapsed:ml-(--container-2xs)">
          {children}
        </div>
      </div>
    </ModularSidebarContext.Provider>
  );
}

export function ModularSidebarLayoutContent({
  breadcrumbs,
  children,
}: {
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
}) {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileDialogOpen,
    setIsMobileDialogOpen,
  } = useContext(ModularSidebarContext);

  return (
    <>
      <Navbar>
        <div className="flex min-w-0 shrink items-center gap-x-4">
          <IconButton
            onClick={() => setIsMobileDialogOpen(!isMobileDialogOpen)}
            className="xl:hidden"
          >
            <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
          </IconButton>
          {!isSidebarOpen && (
            <IconButton
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="max-xl:hidden"
            >
              <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
            </IconButton>
          )}
          <div className="min-w-0">{breadcrumbs}</div>
        </div>
      </Navbar>
      <main className="px-4 sm:px-6">{children}</main>
    </>
  );
}
