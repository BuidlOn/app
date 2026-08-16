"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const LINKS = [
  { label: "Explore", href: "/issues" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Documentation", href: "#" },
  { label: "Community", href: "#" },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto flex h-16 w-full max-w-[1200px] items-center justify-between rounded-full border border-outline/20 px-8 py-4 transition-all duration-300",
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-white/40 backdrop-blur-sm",
        )}
      >
        <div className="flex items-center gap-[48px]">
          <Link
            href="/"
            className="font-page-title text-[22px] font-bold text-ink"
          >
            BuidlOn
          </Link>
          <div className="hidden gap-[32px] md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-[14px] font-medium text-on-surface-variant transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-[16px]">
          <Link
            href="/login"
            className="hidden rounded-full bg-primary px-[24px] py-[10px] font-mono-label text-[13px] font-bold text-ink transition-all hover:brightness-110 active:scale-95 md:inline-block"
          >
            Connect GitHub
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-ink md:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="text-3xl" />
          </button>
        </div>

        {open && (
          <div className="absolute inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-[24px] border border-outline/20 bg-white/95 backdrop-blur-xl px-container-padding py-4 md:hidden shadow-sm">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 font-body text-[16px] text-on-surface-variant hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-primary px-6 py-3 text-center font-mono-label text-[13px] font-bold text-ink transition-all hover:brightness-110"
            >
              Connect GitHub
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
