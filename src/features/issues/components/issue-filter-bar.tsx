"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { Input, Label, Select } from "@/components/ui/input";
import {
  DIFFICULTIES,
  ISSUE_STATUS_FILTERS,
  LANGUAGES,
} from "@/constants/issues";
import type { IssueDifficulty } from "@/types/domain";
import type { IssueFilters, IssueStatusFilter } from "../types";

interface Props {
  filters: IssueFilters;
  onApply: (next: IssueFilters) => void;
  onClear: () => void;
}

export function IssueFilterBar({ filters, onApply, onClear }: Props) {
  // Local draft state; committed to the query only when "Apply" is pressed.
  const [draft, setDraft] = useState<IssueFilters>(filters);

  useEffect(() => setDraft(filters), [filters]);

  const set = <K extends keyof IssueFilters>(key: K, value: IssueFilters[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const toggleDifficulty = (difficulty: IssueDifficulty) =>
    set("difficulty", draft.difficulty === difficulty ? null : difficulty);

  const dirty =
    !!draft.search || !!draft.difficulty || !!draft.language || draft.status !== "all";

  return (
    <Card className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-[220px] flex-1">
          <Label htmlFor="issue-search">Search</Label>
          <div className="relative">
            <Glyph
              name="search"
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface opacity-40"
            />
            <Input
              id="issue-search"
              type="search"
              shape="pill"
              value={draft.search ?? ""}
              onChange={(e) => set("search", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onApply(draft)}
              placeholder="Search issues or repositories..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="w-full sm:w-[170px]">
          <Label htmlFor="issue-language">Language</Label>
          <Select
            id="issue-language"
            shape="pill"
            value={draft.language ?? ""}
            onChange={(e) => set("language", e.target.value || null)}
            className="pl-4"
          >
            <option value="">All languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full sm:w-[150px]">
          <Label htmlFor="issue-status">Status</Label>
          <Select
            id="issue-status"
            shape="pill"
            value={draft.status ?? "all"}
            onChange={(e) => set("status", e.target.value as IssueStatusFilter)}
            className="pl-4"
          >
            {ISSUE_STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-2">
          {dirty && (
            <Button type="button" variant="outline" shadow="none" size="sm" onClick={onClear}>
              Clear
            </Button>
          )}
          <Button
            type="button"
            variant="ink"
            shadow="tertiary"
            size="sm"
            onClick={() => onApply(draft)}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="font-mono-label text-[10.5px] uppercase tracking-[0.06em] text-on-surface-muted">
          Difficulty
        </span>
        {DIFFICULTIES.map((difficulty) => {
          const active = draft.difficulty === difficulty;
          return (
            <button
              key={difficulty}
              type="button"
              aria-pressed={active}
              onClick={() => toggleDifficulty(difficulty)}
              className={cn(
                "rounded-full border-[1.5px] px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
                active
                  ? "border-outline bg-primary text-on-primary"
                  : "border-outline/15 text-on-surface-variant hover:border-outline",
              )}
            >
              {difficulty}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
