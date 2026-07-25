"use client";

import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

export function DashboardHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant bg-background px-4 lg:left-64 lg:px-8">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="text-on-surface-variant hover:text-primary lg:hidden"
        >
          <Icon name="menu" className="text-2xl" />
        </button>

        <div className="relative w-full max-w-md">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant"
          />
          <input
            type="search"
            placeholder="Search repos, issues, or rewards..."
            aria-label="Search"
            className="w-full border border-outline-variant bg-surface-container-lowest py-1.5 pl-10 pr-4 text-body outline-none focus:border-primary-container"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden items-center gap-4 sm:flex">
          <button
            type="button"
            aria-label="Notifications"
            className="text-on-surface-variant transition-all duration-200 hover:text-primary"
          >
            <Icon name="notifications" />
          </button>
          <button
            type="button"
            aria-label="Help"
            className="text-on-surface-variant transition-all duration-200 hover:text-primary"
          >
            <Icon name="help_outline" />
          </button>
        </div>

        <div className="hidden h-8 w-px bg-outline-variant sm:block" />

        {isLoading || !user ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="hidden h-4 w-20 sm:block" />
          </div>
        ) : (
          <div className="group flex cursor-pointer items-center gap-3">
            <Avatar
              src={user.avatarUrl}
              alt={user.name ?? user.githubUsername}
              size={32}
              className="group-hover:border-primary"
            />
            <span className="hidden font-mono-label text-mono-label text-on-surface transition-colors group-hover:text-primary sm:inline">
              {user.githubUsername}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
