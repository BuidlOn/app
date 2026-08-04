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
        <button className="flex items-center gap-2 bg-primary-container px-8 py-3 font-bold text-on-primary-container transition-all hover:opacity-90 active:opacity-80">
          Claim Issue
          <Icon name="bolt" className="text-lg" filled />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex h-12 w-12 items-center justify-center border border-primary/20 bg-primary/10 text-primary">
            <Icon name="task_alt" className="text-3xl" />
          </div>
          <div>
            <DialogTitle>Confirm Claim</DialogTitle>
            <DialogDescription>
              #{issue.githubNumber}: {issue.title}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mb-8 space-y-3">
          {TERMS.map((term) => (
            <div
              key={term.title}
              className="flex gap-3 border border-outline-variant bg-surface-container-low p-4"
            >
              <Icon name={term.icon} className="text-primary" />
              <div>
                <p className="text-sm font-bold text-on-surface">{term.title}</p>
                <p className="text-xs text-on-surface-variant">{term.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 border border-outline-variant py-3 font-bold transition-colors hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleClaim}
            disabled={claim.isPending}
            className="flex-1 bg-primary py-3 font-bold text-on-primary transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60"
          >
            {claim.isPending ? "Claiming..." : "Agree & Claim"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
