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
    <nav
      className={cn(
        "fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-outline-variant px-container-padding py-4 transition-colors",
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-background",
      )}
    >
      <div className="flex items-center gap-gap-12">
        <Link
          href="/"
          className="font-page-title text-section-heading font-bold text-on-surface"
        >
          BuidlOn
        </Link>
        <div className="hidden gap-gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body text-body font-medium text-on-surface-variant transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-gap-4">
        <Link
          href="/login"
          className="hidden bg-primary-container px-6 py-2 font-mono-label text-mono-label uppercase tracking-widest text-on-primary-container transition-transform active:scale-95 md:inline-block"
        >
          Connect GitHub
        </Link>
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-on-surface md:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="text-3xl" />
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-16 flex flex-col border-b border-outline-variant bg-background px-container-padding py-gap-4 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-body text-body text-on-surface-variant hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-gap-2 bg-primary-container px-6 py-3 text-center font-mono-label text-mono-label uppercase tracking-widest text-on-primary-container"
          >
            Connect GitHub
          </Link>
        </div>
      )}
    </nav>
  );
}
