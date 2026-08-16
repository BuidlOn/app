import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import {
  Hero,
  StatsBand,
  LiveTicker,
  Workflow,
  Workbench,
  FinalCta,
} from "@/features/marketing";

export default function LandingPage() {
  return (
    <>
      <MarketingNav />
      <main className="pt-16 bg-background">
        <Hero />
        <StatsBand />
        <Workflow />
        <Workbench />
        <LiveTicker />
        <FinalCta />
      </main>
      <MarketingFooter />
    </>
  );
}
