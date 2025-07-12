"use client";

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown";
import { IconButton } from "@/components/icon-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButton } from "@/components/rockitcode/auth-button";
import { ChevronDownIcon } from "@/icons/chevron-down-icon";
import { CloseIcon } from "@/icons/close-icon";
import { MenuIcon } from "@/icons/menu-icon";
import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { clsx } from "clsx";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

export function Navbar({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "sticky top-0 z-10 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90",
        "flex items-center justify-between gap-x-8 px-4 py-4 sm:px-6",
      )}
      {...props}
    >
      {children}
      <SiteNavigation />
    </div>
  );
}

function MobileNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: session } = useSession();

  return (
    <Dialog open={open} onClose={onClose} className="lg:hidden">
      <DialogBackdrop className="fixed inset-0 bg-gray-950/25" />
      <div className="fixed inset-0 flex justify-end pl-11">
        <DialogPanel className="w-full max-w-2xs bg-white px-4 py-5 ring ring-gray-950/10 sm:px-6 dark:bg-gray-950 dark:ring-white/10">
          <div className="flex justify-end">
            <CloseButton as={IconButton} onClick={onClose}>
              <CloseIcon className="stroke-gray-950 dark:stroke-white" />
            </CloseButton>
          </div>
          <div className="mt-4">
            <div className="flex flex-col gap-y-2">
              {[
                ["Course", "/"],
                ["Interviews", "/interviews"],
                ["Resources", "/resources"],
              ].map(([title, href]) => (
                <CloseButton
                  as={Link}
                  key={href}
                  href={href}
                  className="block rounded-md px-4 py-1.5 text-lg/7 font-medium tracking-tight text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/5"
                >
                  {title}
                </CloseButton>
              ))}
            </div>
            
            {/* Mobile Authentication */}
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              {/* Theme Toggle */}
              <div className="px-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </div>
              
              {session ? (
                <div className="space-y-3">
                  <div className="px-4">
                    <div className="flex items-center gap-3">
                      {session.user.image && (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User avatar'}
                          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {session.user.name}
                        </p>
                        {session.user.login && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            @{session.user.login}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <CloseButton
                      as={Link}
                      href="/dashboard"
                      className="rounded-md px-4 py-1 text-sm/7 font-semibold text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/5"
                    >
                      🚀 Mission Control
                    </CloseButton>
                    <CloseButton
                      as={Link}
                      href="/settings"
                      className="rounded-md px-4 py-1 text-sm/7 font-semibold text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/5"
                    >
                      ⚙️ Equipment Settings
                    </CloseButton>
                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className="rounded-md px-4 py-1 text-left text-sm/7 font-semibold text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/5"
                    >
                      🔐 End Mission
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4">
                  <AuthButton variant="primary" size="sm" className="w-full justify-center" />
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function SiteNavigation() {
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="flex items-center">
      <IconButton className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
        <MenuIcon className="fill-gray-950 dark:fill-white" />
      </IconButton>
      <MobileNavigation
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex items-center gap-x-6 text-sm/6 text-gray-950 max-lg:hidden dark:text-white">
        <Link href="/" className="flex items-center gap-1">
          🚀 <span>Launch Missions</span>
        </Link>
        <Link href="/interviews" className="flex items-center gap-1">
          🎯 <span>Mission Briefings</span>
        </Link>
        <Link href="/resources" className="flex items-center gap-1">
          📋 <span>Equipment</span>
        </Link>
        
        {/* Theme toggle for desktop */}
        <ThemeToggle />
        
        {session ? (
          <Dropdown>
            <DropdownButton className="inline-flex items-center gap-x-2 focus:not-data-focus:outline-none">
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'Mission Specialist avatar'}
                    className="h-6 w-6 rounded-full border border-gray-200 dark:border-gray-700"
                  />
                )}
                <span className="max-w-24 truncate">{session.user.name}</span>
              </div>
              <ChevronDownIcon className="stroke-gray-950 dark:stroke-white" />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
              <DropdownItem href="/dashboard">🚀 Mission Control</DropdownItem>
              <DropdownItem href="/settings">⚙️ Equipment Settings</DropdownItem>
              <DropdownItem href="/support">📡 Mission Support</DropdownItem>
              <DropdownItem href="/api/auth/signout">🔐 End Mission</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <AuthButton variant="primary" size="sm" />
        )}
      </div>
    </nav>
  );
}
