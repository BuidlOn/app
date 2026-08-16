import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { StatusPip } from "@/components/ui/status-pip";
import { truncateHash } from "@/utils/format";
import type { User } from "@/types/domain";

export function ProfileHeader({
  user,
  isSelf,
}: {
  user: User;
  isSelf: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-7 lg:flex-row">
      <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-[24px] border-[1.5px] border-outline bg-secondary font-page-title text-[40px] font-bold text-white">
        {user.avatarUrl ? (
          <Avatar
            src={user.avatarUrl}
            alt={user.name ?? user.githubUsername}
            size={128}
            className="h-full w-full rounded-none border-0"
          />
        ) : (
          (user.name ?? user.githubUsername).slice(0, 2).toUpperCase()
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-2.5 flex flex-wrap items-center gap-3">
          <h1 className="m-0 font-page-title text-[28px] font-bold text-on-surface">
            {user.name ?? user.githubUsername}
          </h1>
          <span className="font-mono-label text-[14px] text-secondary">
            @{user.githubUsername}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-[12px] font-bold text-secondary-deep">
            ✓ Verified Contributor
          </span>
          {isSelf && (
            <Link
              href="/settings"
              className="ml-auto flex items-center gap-1.5 rounded-full border-[1.5px] border-outline/15 px-4 py-1.5 font-mono-label text-[12px] font-semibold text-on-surface-variant transition-colors hover:border-outline/30"
            >
              Edit profile
            </Link>
          )}
        </div>

        {user.bio && (
          <p className="m-0 mb-4 max-w-[560px] text-[14px] text-on-surface-variant">
            {user.bio}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          {user.walletAddress && (
            <div className="flex items-center gap-2 rounded-full border-[1.5px] border-outline/15 px-[14px] py-[7px]">
              <Icon
                name="account_balance_wallet"
                className="text-[14px] text-on-surface"
              />
              <span className="font-mono-label text-[12px] text-on-surface">
                {truncateHash(user.walletAddress)}
              </span>
              <StatusPip tone="success" className="h-1.5 w-1.5" />
            </div>
          )}
          {user.country && (
            <div className="flex items-center gap-1 text-[12.5px] text-on-surface-variant">
              <span>📍</span>
              <span>{user.country}</span>
            </div>
          )}
          {user.website && (
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[12.5px] text-secondary transition-colors hover:text-secondary-deep"
            >
              <span>{user.website}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
