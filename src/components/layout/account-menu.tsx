"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Glyph, type GlyphName } from "@/components/ui/icons";
import { clearAuthTokens } from "@/services/api.client";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { cn } from "@/lib/utils";

const ITEM =
  "flex cursor-pointer items-center gap-2.5 rounded-buidl-sm px-3 py-2.5 text-[13px] font-medium text-on-surface-variant outline-none transition-colors data-[highlighted]:bg-outline/[0.06] data-[highlighted]:text-on-surface";

function MenuLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: GlyphName;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu.Item asChild className={ITEM}>
      <Link href={href}>
        <Glyph name={icon} size={16} />
        {children}
      </Link>
    </DropdownMenu.Item>
  );
}

/**
 * Account menu behind the avatar. Personal concerns (profile, settings, sign
 * out) live here rather than in the sidebar, which is reserved for the
 * product's own sections.
 */
export function AccountMenu() {
  const { data: user, isResolving } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  if (isResolving || !user) {
    return (
      <div className="flex items-center gap-2.5">
        <Skeleton className="h-[34px] w-[34px] rounded-full" />
        <Skeleton className="hidden h-3 w-20 lg:block" />
      </div>
    );
  }

  const label = user.name ?? user.githubUsername;

  // Sign-out is local: the backend's /auth/logout is a client-side discard.
  const signOut = () => {
    clearAuthTokens();
    queryClient.clear();
    router.replace("/login");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label="Open account menu"
        className="flex items-center gap-2.5 rounded-buidl-pill text-on-surface outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Avatar src={user.avatarUrl} alt={label} size={34} />
        <span className="hidden font-mono-label text-[13px] font-medium lg:inline">
          {user.githubUsername}
        </span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className={cn(
            "z-50 min-w-[220px] rounded-buidl-md border-[1.5px] border-outline bg-surface p-1.5",
            "shadow-[4px_4px_0_#161616]",
            "data-[state=open]:animate-fade-in",
          )}
        >
          <div className="border-b-[1.5px] border-outline/10 px-3 pb-2.5 pt-2">
            <p className="truncate text-[13.5px] font-bold text-on-surface">{label}</p>
            <p className="truncate font-mono-label text-[11px] text-on-surface-muted">
              @{user.githubUsername}
            </p>
          </div>

          <div className="pt-1.5">
            <MenuLink href="/profile" icon="user">
              Profile
            </MenuLink>
            <MenuLink href="/settings" icon="settings">
              Settings
            </MenuLink>

            <DropdownMenu.Separator className="my-1.5 h-px bg-outline/10" />

            <DropdownMenu.Item
              onSelect={signOut}
              className={cn(ITEM, "text-error data-[highlighted]:text-error")}
            >
              <Glyph name="logout" size={16} />
              Sign out
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
