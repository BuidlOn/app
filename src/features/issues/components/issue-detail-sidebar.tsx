import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { formatDate, formatNumber } from "@/utils/format";
import type { IssueDetail } from "../types";

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-outline-variant bg-surface p-6">
      <h3 className="mb-4 font-mono-label text-mono-label uppercase tracking-wider text-on-surface-variant">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function IssueDetailSidebar({ issue }: { issue: IssueDetail }) {
  const repo = issue.repositoryDetail;

  return (
    <div className="space-y-6 lg:col-span-4">
      <SidebarCard title="Repository">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-outline-variant">
            <Icon name="token" className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-on-surface">{repo.fullName}</p>
            <p className="font-caption text-caption text-outline">
              {repo.languages.join(" · ") || "—"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-outline-variant pt-4 text-center">
          <div>
            <p className="font-bold text-primary">{formatNumber(repo.stars)}</p>
            <p className="text-[10px] uppercase text-outline">Stars</p>
          </div>
          <div>
            <p className="font-bold text-on-surface">{formatNumber(repo.forks)}</p>
            <p className="text-[10px] uppercase text-outline">Forks</p>
          </div>
          <div>
            <p className="font-bold text-on-surface">
              {formatNumber(repo.contributors)}
            </p>
            <p className="text-[10px] uppercase text-outline">Contribs</p>
          </div>
        </div>
      </SidebarCard>

      <SidebarCard title="Maintainer">
        <div className="flex items-center gap-3">
          <Avatar
            src={issue.maintainer.avatarUrl}
            alt={issue.maintainer.name ?? issue.maintainer.githubUsername}
            size={40}
          />
          <div>
            <p className="font-bold text-on-surface">
              {issue.maintainer.githubUsername}
            </p>
            <p className="flex items-center gap-1 font-caption text-caption text-secondary">
              <Icon name="verified" className="text-xs" filled />
              Verified Maintainer
            </p>
          </div>
        </div>
      </SidebarCard>

      <SidebarCard title="Points Breakdown">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-body">
            <span className="text-on-surface-variant">Base ({issue.difficulty})</span>
            <span className="font-mono text-on-surface">{issue.basePoints} pts</span>
          </div>
          <div className="flex items-center justify-between text-body">
            <span className="text-on-surface-variant">Multipliers</span>
            <span className="font-mono text-secondary">at merge</span>
          </div>
          <div className="my-2 h-px bg-outline-variant" />
          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-on-surface">Base Total</span>
            <span className="text-secondary">{issue.basePoints} pts</span>
          </div>
          <p className="font-caption text-[11px] text-on-surface-variant">
            First-contribution and season bonuses are applied by the scoring engine
            once your PR is merged.
          </p>
        </div>
      </SidebarCard>

      <SidebarCard title="Status Timeline">
        <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-outline-variant">
          {issue.timeline.map((step) => (
            <li key={step.label} className="relative flex gap-4">
              <span
                className={cn(
                  "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  step.state === "done" && "bg-secondary",
                  step.state === "active" &&
                    "border border-primary bg-surface-container-high",
                  step.state === "pending" && "bg-surface-container-high",
                )}
              >
                {step.state === "done" ? (
                  <Icon name="check" className="text-sm text-background" filled />
                ) : step.state === "active" ? (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-outline" />
                )}
              </span>
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.state === "active"
                      ? "font-bold text-primary"
                      : "text-on-surface",
                  )}
                >
                  {step.label}
                </p>
                <p className="text-xs text-outline">
                  {step.date ? formatDate(step.date) : "Pending"}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SidebarCard>
    </div>
  );
}
