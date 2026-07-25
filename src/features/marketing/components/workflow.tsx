const STEPS = [
  {
    index: "01.",
    title: "Claim",
    body: "Connect your GitHub account and wallet. Scan the marketplace for issues matching your tech stack. Claim issues to start your contribution timer.",
  },
  {
    index: "02.",
    title: "Contribute",
    body: "Submit your PR. Our automated system verifies code quality, test coverage, and documentation against repository standards.",
  },
  {
    index: "03.",
    title: "Earn",
    body: "Once merged, rewards are instantly streamed to your wallet. Build your on-chain resume with cryptographic proof of contribution.",
  },
];

export function Workflow() {
  return (
    <section className="mx-auto max-w-7xl px-container-padding py-24">
      <h2 className="mb-16 text-center font-page-title text-page-title text-white">
        How it works
      </h2>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.index}
            className="group border-technical bg-surface p-8 transition-colors hover:border-primary/50"
          >
            <div className="mb-6 font-mono-label text-2xl text-primary">
              {step.index}
            </div>
            <h3 className="mb-4 font-section-heading text-section-heading text-white">
              {step.title}
            </h3>
            <p className="text-on-surface-variant">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
