"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { useClaimIssue } from "../hooks/use-claim-issue";
import type { IssueDetail } from "../types";

const TERMS = [
  {
    icon: "schedule",
    title: "3-Day Deadline",
    body: "You must open a pull request within 3 days. Missing it auto-releases the issue.",
  },
  {
    icon: "verified_user",
    title: "Quality Standards",
    body: "Code must pass all CI checks, follow the style guide, and include tests for new logic.",
  },
  {
    icon: "workspace_premium",
    title: "Points on Merge",
    body: "Points are awarded by the scoring engine only after a verified maintainer merges your PR.",
  },
];

export function ClaimIssueDialog({ issue }: { issue: IssueDetail }) {
  const [open, setOpen] = useState(false);
  const claim = useClaimIssue(issue.id);

  const handleClaim = async () => {
    await claim.mutateAsync().catch(() => {});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-[8px] rounded-full border-[2px] border-ink bg-ink px-[24px] py-[10px] font-mono-label text-[13px] font-bold text-white transition-all shadow-brutal-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          Claim issue
          <Icon name="bolt" className="text-[16px]" filled />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full border-[1.5px] border-primary-deep/60 bg-primary/10 text-primary-deep">
            <Icon name="task_alt" className="text-[24px]" />
          </div>
          <div>
            <DialogTitle>Confirm claim</DialogTitle>
            <DialogDescription>
              #{issue.githubNumber}: {issue.title}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mb-[32px] flex flex-col gap-[12px]">
          {TERMS.map((term) => (
            <div
              key={term.title}
              className="flex gap-[16px] rounded-[12px] border-[1.5px] border-outline/15 bg-surface p-[16px]"
            >
              <Icon name={term.icon} className="mt-[2px] text-[20px] text-primary-deep shrink-0" />
              <div>
                <p className="m-0 mb-1 text-[13.5px] font-bold text-on-surface">{term.title}</p>
                <p className="m-0 text-[12.5px] leading-relaxed text-on-surface-variant">{term.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-[16px]">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 rounded-full border-[2px] border-ink bg-surface py-[12px] font-mono-label text-[13px] font-bold text-ink transition-all shadow-brutal-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleClaim}
            disabled={claim.isPending}
            className="flex-1 rounded-full border-[2px] border-ink bg-ink py-[12px] font-mono-label text-[13px] font-bold text-white transition-all shadow-brutal-success active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60"
          >
            {claim.isPending ? "Claiming..." : "Agree & claim"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
