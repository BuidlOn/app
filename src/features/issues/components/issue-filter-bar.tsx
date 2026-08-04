"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
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

const selectClass =
  "w-full border border-outline-variant bg-surface-container-lowest px-3 py-1.5 font-caption text-xs text-on-surface outline-none focus:border-primary";

export function IssueFilterBar({ filters, onApply, onClear }: Props) {
  // Local draft state; committed to the query only when "Apply" is pressed.
  const [draft, setDraft] = useState<IssueFilters>(filters);

  useEffect(() => setDraft(filters), [filters]);

  const set = <K extends keyof IssueFilters>(key: K, value: IssueFilters[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const toggleDifficulty = (difficulty: IssueDifficulty) =>
    set("difficulty", draft.difficulty === difficulty ? null : difficulty);

  return (
    <section className="mb-gap-8 border border-outline-variant bg-surface p-4">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label className="mb-2 block font-mono-label text-[10px] uppercase text-on-surface-variant">
            Search
          </label>
          <div className="relative">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant"
            />
            <input
              type="search"
              value={draft.search ?? ""}
              onChange={(e) => set("search", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onApply(draft)}
              placeholder="Search issues or repositories..."
              className="w-full border border-outline-variant bg-surface-container-lowest py-1.5 pl-9 pr-3 font-caption text-xs text-on-surface outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="w-full lg:w-48">
          <label className="mb-2 block font-mono-label text-[10px] uppercase text-on-surface-variant">
            Language
          </label>
          <select
            value={draft.language ?? ""}
            onChange={(e) => set("language", e.target.value || null)}
            className={selectClass}
          >
            <option value="">All Languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full lg:w-40">
          <label className="mb-2 block font-mono-label text-[10px] uppercase text-on-surface-variant">
            Status
          </label>
          <select
            value={draft.status ?? "all"}
            onChange={(e) => set("status", e.target.value as IssueStatusFilter)}
            className={selectClass}
          >
            {ISSUE_STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block font-mono-label text-[10px] uppercase text-on-surface-variant">
          Difficulty
        </label>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((difficulty) => {
            const active = draft.difficulty === difficulty;
            return (
              <button
                key={difficulty}
                type="button"
                aria-pressed={active}
                onClick={() => toggleDifficulty(difficulty)}
                className={cn(
                  "border px-3 py-1 font-caption text-xs transition-colors",
                  active
                    ? "border-primary bg-primary-container/20 text-primary"
                    : "border-outline-variant hover:border-primary",
                )}
              >
                {difficulty}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onClear}
          className="border border-outline-variant px-6 py-1.5 font-caption text-xs uppercase tracking-wider transition-colors hover:bg-surface-container"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => onApply(draft)}
          className="bg-primary-container px-6 py-1.5 font-caption text-xs font-bold uppercase tracking-wider text-on-primary-container transition-all hover:brightness-110"
        >
          Apply
        </button>
      </div>
    </section>
  );
}
