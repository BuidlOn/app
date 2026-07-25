import Link from "next/link";

const FOOTER_LINKS = [
  { label: "System Status", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Security", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export function MarketingFooter() {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-gap-6 border-t border-outline-variant bg-surface-dim px-container-padding py-gap-12 md:flex-row">
      <div className="flex flex-col items-center gap-gap-4 md:items-start">
        <span className="font-section-heading text-section-heading text-on-surface">
          BuidlOn
        </span>
        <p className="font-mono-label text-mono-label text-on-surface-variant">
          © {new Date().getFullYear()} BuidlOn. Built for the open source community.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-gap-6">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-mono-label text-mono-label text-on-surface-variant underline transition-all hover:text-primary hover:opacity-80"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
