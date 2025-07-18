"use client";

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown";
import { IconButton } from "@/components/icon-button";
import { AuthButton } from "@/components/rockitcode/auth-button";
import { useUser } from "@/contexts/UserContext";
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
  const { data: session } = useSession() || { data: null };

  return (
    <Dialog open={open} onClose={onClose} className="lg:hidden">
      <DialogBackdrop className="fixed inset-0 bg-gray-950/25" />
      <div className="fixed inset-0 flex justify-end pl-11">
        <DialogPanel className="w-full px-4 py-5 bg-white max-w-2xs ring ring-gray-950/10 sm:px-6 dark:bg-gray-950 dark:ring-white/10">
          <div className="flex justify-end">
            <CloseButton as={IconButton} onClick={onClose}>
              <CloseIcon className="stroke-gray-950 dark:stroke-white" />
            </CloseButton>
          </div>
          <div className="mt-4">
            <div className="flex flex-col gap-y-2">
              {[
                ["🚀 Launch Pad", "/launch-pad"],
                ["🌟 About RockitCode", "/about"],
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
            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              {session ? (
                <div className="space-y-3">
                  <div className="px-4">
                    <div className="flex items-center gap-3">
                      {session.user.image && (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User avatar'}
                          className="w-8 h-8 border border-gray-200 rounded-full dark:border-gray-700"
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
                      className="px-4 py-1 font-semibold rounded-md text-sm/7 text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/5"
                    >
                      🚀 Mission Control
                    </CloseButton>
                    <CloseButton
                      as={Link}
                      href="/settings"
                      className="px-4 py-1 font-semibold rounded-md text-sm/7 text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/5"
                    >
                      ⚙️ Equipment Settings
                    </CloseButton>
                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className="px-4 py-1 font-semibold text-left rounded-md text-sm/7 text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/5"
                    >
                      🔐 End Mission
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4">
                  <AuthButton variant="primary" size="sm" className="justify-center w-full" />
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
  const { data: session } = useSession() || { data: null };

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
        <Link href="/launch-pad" className="flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
          🚀 <span>Launch Pad</span>
        </Link>
        <Link href="/about" className="flex items-center gap-1 transition-colors hover:text-purple-600 dark:hover:text-purple-400">
          🌟 <span>About RockitCode</span>
        </Link>
        
        {session ? (
          <Dropdown>
            <DropdownButton className="inline-flex items-center gap-x-2 focus:not-data-focus:outline-none">
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'Mission Specialist avatar'}
                    className="w-6 h-6 border border-gray-200 rounded-full dark:border-gray-700"
                  />
                )}
                <span className="truncate max-w-24">{session.user.name}</span>
              </div>
              <ChevronDownIcon className="stroke-gray-950 dark:stroke-white" />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
              <DropdownItem href="/dashboard">🚀 Mission Control</DropdownItem>
              <DropdownItem href="/settings">⚙️ Account Settings</DropdownItem>
              {/* Admin-only Admin Dashboard */}
              {(session.user.email?.includes('topwebworks') || 
                session.user.email?.includes('@yourcompany.com') || 
                session.user.email === 'admin@rockitcode.com') && (
                <DropdownItem href="/revdash">📊 Admin Dashboard</DropdownItem>
              )}
              <DropdownItem href="/foundation">📚 My Courses</DropdownItem>
              <DropdownItem href="/launch-pad">🎯 Career Launch Pad</DropdownItem>
              <DropdownItem href="/support">📡 Mission Support</DropdownItem>
              <DropdownItem href="/api/auth/signout">🔐 End Mission</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <AuthButton variant="transparent" size="sm" />
        )}
      </div>
    </nav>
  );
}
