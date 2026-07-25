import Link from "next/link";
import { Icon } from "@/components/ui/icon";

const GUARANTEES = ["No KYC", "Instant Payouts", "Open Source"];

export function FinalCta() {
  return (
    <section className="flex flex-col items-center px-container-padding py-32 text-center">
      <div className="relative max-w-2xl border-technical bg-surface-container p-10 md:p-16">
        <div className="absolute -left-4 -top-4 h-8 w-8 border-l border-t border-primary" />
        <div className="absolute -bottom-4 -right-4 h-8 w-8 border-b border-r border-primary" />
        <h2 className="mb-6 font-page-title text-4xl leading-tight text-white">
          Ready to start building?
        </h2>
        <p className="mb-12 text-on-surface-variant">
          Join 45,000+ developers shipping the future. Your GitHub account is your
          ticket.
        </p>
        <Link
          href="/login"
          className="flex w-full items-center justify-center gap-3 bg-primary-container py-5 font-mono-label text-xl font-bold uppercase tracking-widest text-on-primary-container transition-all hover:bg-primary active:scale-[0.98]"
        >
          <Icon name="login" filled />
          Connect GitHub Account
        </Link>
        <div className="mt-8 flex justify-center gap-gap-8 font-mono-label text-[11px] text-on-surface-variant">
          {GUARANTEES.map((item) => (
            <span key={item} className="flex items-center gap-1">
              <Icon name="check_circle" className="text-xs" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
