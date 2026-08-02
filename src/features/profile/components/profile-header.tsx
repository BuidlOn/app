import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    <section className="flex flex-col items-start gap-8 lg:flex-row">
      <div className="h-32 w-32 border border-outline-variant bg-surface p-1 lg:h-44 lg:w-44">
        <Avatar
          src={user.avatarUrl}
          alt={user.name ?? user.githubUsername}
          size={168}
          className="h-full w-full border-0"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <h1 className="font-page-title text-page-title text-on-surface">
            {user.name ?? user.githubUsername}
          </h1>
          <span className="font-mono-label text-primary md:mb-1.5">
            @{user.githubUsername}
          </span>
          <div className="md:mb-1">
            <Badge variant="success">
              <Icon name="verified" className="text-[14px]" filled />
              Verified Contributor
            </Badge>
          </div>
          {isSelf && (
            <Link
              href="/settings"
              className="md:mb-1 md:ml-auto inline-flex items-center gap-1 border border-outline-variant px-3 py-1 font-mono-label text-[11px] uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
              <Icon name="edit" className="text-sm" />
              Edit Profile
            </Link>
          )}
        </div>

        {user.bio && (
          <p className="max-w-2xl font-body text-body text-on-surface-variant">
            {user.bio}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          {user.walletAddress && (
            <div className="flex items-center gap-3 border border-outline-variant bg-surface-container-low px-3 py-1.5">
              <Icon
                name="account_balance_wallet"
                className="text-[18px] text-on-surface-variant"
              />
              <span className="font-mono-label text-on-surface">
                {truncateHash(user.walletAddress)}
              </span>
              <StatusPip tone="success" />
            </div>
          )}
          {user.country && (
            <div className="flex items-center gap-1 text-on-surface-variant">
              <Icon name="location_on" className="text-[18px]" />
              <span className="font-caption">{user.country}</span>
            </div>
          )}
          {user.website && (
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-on-surface-variant transition-colors hover:text-primary"
            >
              <Icon name="link" className="text-[18px]" />
              <span className="font-caption">{user.website}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
