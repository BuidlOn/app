"use client";

import { StatusPip } from "@/components/ui/status-pip";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { truncateHash } from "@/utils/format";

/**
 * Terminal-style status strip closing each app screen. It is chrome, not data:
 * the technical register is the point, so it stays quiet and unlinked.
 */
export function StatusFooter() {
  const { data: user } = useCurrentUser();
  const wallet = user?.walletAddress;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t-hairline border-outline/[0.12] pt-5 font-mono-label text-[11px] uppercase text-on-surface-muted">
      <div className="flex flex-wrap gap-x-7 gap-y-2">
        <span className="flex items-center gap-1.5">
          <StatusPip tone="teal" size={7} />
          System online
        </span>
        <span>Latency: 24ms</span>
        {wallet && <span>Connected as: {truncateHash(wallet, 4, 4)}</span>}
      </div>
      <div>© 2026 BuidlOn Protocol // v4.2.0 stable</div>
    </div>
  );
}
