"use client";

import Link from "next/link";
import { usePlatformStats } from "../hooks/use-platform-stats";
import { formatNumber } from "@/utils/format";

export function FinalCta() {
  const { data } = usePlatformStats();
  const contributors = data?.contributors ?? 0;

  return (
    <section className="px-container-padding animate-slide-up mb-[120px]">
      <div className="mx-auto max-w-[640px] text-center flex flex-col items-center">
        {contributors > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            <span className="font-mono-label text-[10px] font-bold text-secondary-deep uppercase tracking-[0.1em]">
              {formatNumber(contributors)} developers already building
            </span>
          </div>
        )}
        
        <h2 className="font-page-title text-[44px] font-bold tracking-[-0.02em] text-on-surface mb-4">
          Ready to start <span className="relative inline-block">
            building?
            <svg className="absolute -bottom-1 left-0 w-full text-primary" viewBox="0 0 100 8" preserveAspectRatio="none" fill="none">
              <path d="M0 6C30 2 70 2 100 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        
        <p className="font-body text-[17px] leading-[1.6] text-on-surface-variant max-w-[420px] mx-auto mb-8">
          Your GitHub account is your ticket. Connect once, claim your first issue today.
        </p>
        
        <Link
          href="/login"
          className="relative inline-flex items-center gap-2 font-mono-label text-[13px] font-bold bg-ink text-white rounded-[100px] px-[32px] py-[16px] transition-all duration-300 hover:-translate-y-1 hover:bg-ink-soft"
        >
          → Connect GitHub account
        </Link>
        
        <div className="flex justify-center gap-8 mt-10 flex-wrap">
          <span className="flex items-center gap-1.5 font-mono-label text-[11px] font-bold text-on-surface-muted">
            <span className="text-on-surface-faint">✕</span> No KYC
          </span>
          <span className="flex items-center gap-1.5 font-mono-label text-[11px] font-bold text-on-surface-muted">
            <span className="text-on-primary-tint">⚡</span> Instant payouts
          </span>
          <span className="flex items-center gap-1.5 font-mono-label text-[11px] font-bold text-on-surface-muted">
            <span className="text-on-surface-faint">◇</span> Open source
          </span>
        </div>
      </div>
    </section>
  );
}
