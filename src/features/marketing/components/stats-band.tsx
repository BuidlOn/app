"use client";

import { usePlatformStats } from "../hooks/use-platform-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCompactNumber, formatUsd } from "@/utils/format";

export function StatsBand() {
  const { data, isLoading } = usePlatformStats();

  return (
    <section className="relative z-20 mx-auto max-w-[1200px] px-container-padding mb-[120px] animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="text-center">
        <div className="font-mono-label text-[11px] font-bold tracking-[0.1em] uppercase text-on-surface-muted mb-6">
          Live on the protocol
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Open Issues */}
          <div className="border-[2px] border-ink rounded-[24px] bg-white p-[32px] text-left shadow-brutal-primary">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-primary border-[2px] border-ink flex items-center justify-center mb-[24px] text-ink">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            {isLoading ? (
              <Skeleton className="h-[40px] w-24 rounded bg-surface-variant/40 mb-2" />
            ) : (
              <div className="font-page-title text-[36px] font-bold tracking-[-0.02em] text-ink">
                {formatCompactNumber(data?.openIssues ?? 0)}
              </div>
            )}
            <div className="font-mono-label text-[12px] text-on-surface-muted mt-2">Open issues</div>
          </div>

          {/* Rewards Paid */}
          <div className="border-[2px] border-ink rounded-[24px] bg-white p-[32px] text-left shadow-brutal-secondary">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-secondary border-[2px] border-ink flex items-center justify-center mb-[24px] text-ink">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20L12 16.5L6.5 20L8 13.5L3 9L9.5 8.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            </div>
            {isLoading ? (
              <Skeleton className="h-[40px] w-32 rounded bg-surface-variant/40 mb-2" />
            ) : (
              <div className="font-page-title text-[36px] font-bold tracking-[-0.02em] text-ink">
                {formatUsd(data?.rewardsPaidUsd ?? 0, true)}
              </div>
            )}
            <div className="font-mono-label text-[12px] text-on-surface-muted mt-2">Rewards paid</div>
          </div>

          {/* Contributors */}
          <div className="border-[2px] border-ink rounded-[24px] bg-white p-[32px] text-left shadow-brutal-tertiary">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-tertiary border-[2px] border-ink flex items-center justify-center mb-[24px] text-ink">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="2"/><path d="M3 20C3 16.5 5.7 14.5 9 14.5C12.3 14.5 15 16.5 15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8"/><path d="M15.5 14.6C18 14.9 20 16.6 20 19.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            {isLoading ? (
              <Skeleton className="h-[40px] w-24 rounded bg-surface-variant/40 mb-2" />
            ) : (
              <div className="font-page-title text-[36px] font-bold tracking-[-0.02em] text-ink">
                {formatCompactNumber(data?.contributors ?? 0)}
              </div>
            )}
            <div className="font-mono-label text-[12px] text-on-surface-muted mt-2">Contributors</div>
          </div>
        </div>
      </div>
    </section>
  );
}
