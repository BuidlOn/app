import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import {
  Hero,
  StatsBand,
  Workflow,
  Workbench,
  FinalCta,
} from "@/features/marketing";

export default function LandingPage() {
  return (
    <>
      <MarketingNav />
      <main className="grid-bg pt-16">
        <Hero />
        <StatsBand />
        <Workflow />
        <Workbench />
        <FinalCta />
      </main>
      <MarketingFooter />
    </>
  );
}
