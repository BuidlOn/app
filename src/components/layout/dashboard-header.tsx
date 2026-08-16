"use client";

import Link from "next/link";
import { Glyph } from "@/components/ui/icons";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { BrandMark } from "./brand-mark";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { formatNumber } from "@/utils/format";

/** Pill-shaped search field with the leading magnifier from the designs. */
export function SearchField({
  placeholder = "Search repos, issues, or rewards...",
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <Glyph
        name="search"
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface opacity-40"
      />
      <Input type="search" shape="pill" placeholder={placeholder} aria-label="Search" {...props} />
    </div>
  );
}

/**
 * 72px app bar with a heavy ink underline. Below `lg` it collapses to the
 * mobile lockup: drawer trigger, wordmark, avatar.
 */
export function DashboardHeader({
  onMenuClick,
  searchPlaceholder,
  /** Right-hand slot replacing the points chip (used by the admin console). */
  badge,
}: {
  onMenuClick?: () => void;
  searchPlaceholder?: string;
  badge?: React.ReactNode;
}) {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-header items-center justify-between gap-6 border-b-2 border-outline bg-background px-4 lg:left-sidebar lg:px-8">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-buidl-pill border-[1.5px] border-outline/15 bg-surface text-on-background lg:hidden"
      >
        <Glyph name="menu" size={15} />
      </button>

      <BrandMark size="sm" className="lg:hidden" />

      <SearchField placeholder={searchPlaceholder} className="hidden max-w-[420px] flex-1 lg:block" />

      <div className="flex shrink-0 items-center gap-5">
        {badge ?? (
          <div className="hidden items-center gap-2 rounded-buidl-pill border-[1.5px] border-outline/15 bg-surface px-4 py-2 font-mono-label text-[13px] font-semibold sm:flex">
            <span className="text-tertiary">◆</span>
            {isLoading || !user ? (
              <Skeleton className="h-3 w-16" />
            ) : (
              `${formatNumber(user.totalPoints)} PTS`
            )}
          </div>
        )}

        <button
          type="button"
          aria-label="Notifications"
          className="hidden text-on-surface opacity-70 transition-opacity hover:opacity-100 sm:block"
        >
          <Glyph name="bell" size={20} />
        </button>

        <div className="hidden h-7 w-px bg-outline/[0.12] sm:block" />

        {isLoading || !user ? (
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-[34px] w-[34px] rounded-full" />
            <Skeleton className="hidden h-3 w-20 lg:block" />
          </div>
        ) : (
          <Link href="/profile" className="flex items-center gap-2.5 text-on-surface">
            <Avatar
              src={user.avatarUrl}
              alt={user.name ?? user.githubUsername}
              size={34}
            />
            <span className="hidden font-mono-label text-[13px] font-medium lg:inline">
              {user.githubUsername}
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
