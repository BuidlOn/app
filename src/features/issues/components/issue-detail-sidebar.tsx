import { cn } from "@/lib/utils";
import { Card, CardEyebrow } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { formatDate, formatCompactNumber } from "@/utils/format";
import type { IssueDetail } from "../types";

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-5 sm:p-[22px]">
      <CardEyebrow className="mb-3.5 text-[10.5px]">{title}</CardEyebrow>
      {children}
    </Card>
  );
}

function RepoStat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className={cn("font-bold", accent && "text-secondary")}>{value}</div>
      <div className="text-[10px] uppercase text-on-surface-muted">{label}</div>
    </div>
  );
}

export function IssueDetailSidebar({ issue }: { issue: IssueDetail }) {
  const repo = issue.repositoryDetail;

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SidebarCard title="Repository">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-buidl-sm border-hairline border-outline bg-primary font-display font-bold">
            {repo.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-bold text-on-surface">
              {repo.fullName}
            </p>
            <p className="truncate text-[12px] text-on-surface-muted">
              {repo.languages.join(" · ") || "—"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t-hairline border-outline/10 pt-4 text-center">
          <RepoStat value={formatCompactNumber(repo.stars)} label="Stars" accent />
          <RepoStat value={formatCompactNumber(repo.forks)} label="Forks" />
          <RepoStat value={formatCompactNumber(repo.contributors)} label="Contribs" />
        </div>
      </SidebarCard>

      <SidebarCard title="Maintainer">
        <div className="flex items-center gap-3">
          <Avatar
            src={issue.maintainer.avatarUrl}
            alt={issue.maintainer.name ?? issue.maintainer.githubUsername}
            size={40}
          />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-bold text-on-surface">
              {issue.maintainer.githubUsername}
            </p>
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-points">
              ✓ Verified maintainer
            </p>
          </div>
        </div>
      </SidebarCard>

      <SidebarCard title="Points breakdown">
        <div className="mb-2.5 flex justify-between text-[13.5px]">
          <span className="text-on-surface-variant">Base ({issue.difficulty})</span>
          <span className="font-mono-label">{issue.basePoints} pts</span>
        </div>
        <div className="mb-2.5 flex justify-between text-[13.5px]">
          <span className="text-on-surface-variant">Multipliers</span>
          <span className="font-mono-label text-points">at merge</span>
        </div>
        <div className="my-3 h-[1.5px] bg-outline/10" />
        <div className="mb-3 flex justify-between text-[16px] font-bold">
          <span>Base total</span>
          <span className="text-points">{issue.basePoints} pts</span>
        </div>
        <p className="text-[11.5px] leading-relaxed text-on-surface-muted">
          First-contribution and season bonuses are applied by the scoring engine once
          your PR is merged.
        </p>
      </SidebarCard>

      <SidebarCard title="Status timeline">
        <ol className="flex flex-col gap-[18px] pl-1">
          {issue.timeline.map((step) => (
            <li
              key={step.label}
              className={cn(
                "flex items-start gap-3",
                step.state === "pending" && "opacity-40",
              )}
            >
              <span
                className={cn(
                  "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold",
                  step.state === "done" && "bg-tertiary text-on-tertiary",
                  step.state === "active" && "border-hairline border-secondary",
                  step.state === "pending" && "bg-outline/10",
                )}
              >
                {step.state === "done" ? (
                  "✓"
                ) : (
                  <span
                    className={cn(
                      "h-[7px] w-[7px] rounded-full",
                      step.state === "active" ? "bg-secondary" : "bg-on-surface-muted",
                    )}
                  />
                )}
              </span>
              <div>
                <p
                  className={cn(
                    "text-[13px]",
                    step.state === "active"
                      ? "font-bold text-secondary"
                      : "font-semibold text-on-surface",
                  )}
                >
                  {step.label}
                </p>
                <p className="text-[11px] text-on-surface-muted">
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
