"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { ADMIN_NAV } from "@/constants/navigation";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

function isActive(pathname: string, href: string) {
  return href === "/admin"
    ? pathname === "/admin"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function AdminSidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-outline-variant bg-background transition-transform duration-200 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex flex-col gap-2 p-gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-primary-container">
            <Icon name="shield_person" className="text-[20px] text-on-primary-container" filled />
          </div>
          <div>
            <h1 className="font-page-title text-[18px] font-black leading-tight text-primary">
              BuidlOn Admin
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-outline">
              Platform Control
            </p>
          </div>
        </div>
        <Link
          href="/admin/seasons/new"
          onClick={onNavigate}
          className="mt-4 flex w-full items-center justify-center gap-2 bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-container transition-all hover:brightness-110 active:scale-95"
        >
          <Icon name="add" className="text-sm" />
          Create Season
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3 py-4">
        {ADMIN_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-150",
                active
                  ? "border-r-2 border-primary bg-surface-container-low font-bold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
              )}
            >
              <Icon name={item.icon} filled={active} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-1 border-t border-outline-variant p-4">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2 text-xs text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
        >
          <Icon name="logout" className="text-[20px]" />
          Exit to app
        </Link>
      </div>
    </nav>
  );
}

function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { data: user } = useCurrentUser();
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant bg-surface px-4 lg:left-64 lg:px-gap-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="text-on-surface-variant hover:text-primary lg:hidden"
        >
          <Icon name="menu" className="text-2xl" />
        </button>
        <div className="hidden items-center gap-2 border border-outline-variant bg-surface-container-lowest px-3 py-1.5 sm:flex">
          <Icon name="search" className="text-sm text-outline" />
          <input
            className="w-40 border-none bg-transparent text-sm outline-none placeholder:text-outline-variant md:w-64"
            placeholder="Search resources..."
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border border-primary-container bg-primary-container/10 px-2 py-0.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-mono-label text-[10px] font-bold tracking-widest text-primary">
            ADMIN CONSOLE
          </span>
        </div>
        {user && (
          <Avatar
            src={user.avatarUrl}
            alt={user.githubUsername}
            size={32}
            className="rounded-full"
          />
        )}
      </div>
    </header>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar open={open} onNavigate={() => setOpen(false)} />
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}
      <AdminHeader onMenuClick={() => setOpen(true)} />
      <main className="min-h-screen pt-16 lg:ml-64">{children}</main>
    </div>
  );
}
