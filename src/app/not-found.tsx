import Link from "next/link";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />
      <main className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-24 pt-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* Icon Container */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-buidl-pill border-2 border-outline bg-surface shadow-brutal-secondary-sm">
            <Ghost className="h-10 w-10 text-outline" strokeWidth={1.5} />
          </div>
          
          {/* Typographic Hero */}
          <h1 className="font-bricolage text-7xl font-bold leading-none tracking-tight text-on-background sm:text-9xl">
            404
          </h1>
          
          {/* Subtitle using the mono font */}
          <h2 className="mt-6 font-fragment-mono text-lg uppercase tracking-[0.2em] text-secondary sm:text-xl">
            {"// HEAD Detached"}
          </h2>
          
          {/* Body */}
          <p className="mt-6 max-w-md font-body text-lg text-on-surface">
            We checked the main branch, searched the stash, and reviewed all pull requests, but we couldn&apos;t find the page you&apos;re looking for.
          </p>
          
          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" variant="primary" shadow="ink">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" shadow="none" className="border-transparent bg-transparent">
              <Link href="https://github.com/BuidlOn">Check our GitHub</Link>
            </Button>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
