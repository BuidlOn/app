"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { Input, Select } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import {
  DIFFICULTIES,
  ISSUE_STATUS_FILTERS,
  LANGUAGES,
} from "@/constants/issues";
import type { IssueFilters } from "../types";

const schema = z.object({
  search: z.string().trim().max(120, "Keep the search under 120 characters."),
  language: z.string(),
  status: z.enum(["all", "available", "claimed"]),
  difficulty: z.enum(DIFFICULTIES).nullable(),
});
type FilterForm = z.infer<typeof schema>;

interface Props {
  filters: IssueFilters;
  onApply: (next: IssueFilters) => void;
  onClear: () => void;
}

function toForm(filters: IssueFilters): FilterForm {
  return {
    search: filters.search ?? "",
    language: filters.language ?? "",
    status: filters.status ?? "all",
    difficulty: filters.difficulty ?? null,
  };
}

export function IssueFilterBar({ filters, onApply, onClear }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FilterForm>({
    resolver: zodResolver(schema),
    defaultValues: toForm(filters),
  });

  // Re-seed when the parent resets or restores filters (e.g. Clear).
  useEffect(() => reset(toForm(filters)), [filters, reset]);

  const difficulty = watch("difficulty");
  const search = watch("search");
  const language = watch("language");
  const status = watch("status");
  const dirty = !!search || !!difficulty || !!language || status !== "all";

  const submit = handleSubmit((values) =>
    onApply({
      ...filters,
      search: values.search,
      language: values.language || null,
      status: values.status,
      difficulty: values.difficulty,
    }),
  );

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label="Filter issues"
      className={cn(cardVariants(), "flex flex-col gap-5 p-6")}
    >
        <div className="flex flex-wrap items-end gap-4">
          <FormField label="Search" error={errors.search?.message} className="min-w-[220px] flex-1">
            {(field) => (
              <div className="relative">
                <Glyph
                  name="search"
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface opacity-40"
                />
                <Input
                  {...field}
                  type="search"
                  shape="pill"
                  placeholder="Search issues or repositories..."
                  className="pl-9"
                  {...register("search")}
                />
              </div>
            )}
          </FormField>

          <FormField label="Language" className="w-full sm:w-[170px]">
            {(field) => (
              <Select {...field} shape="pill" className="pl-4" {...register("language")}>
                <option value="">All languages</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </Select>
            )}
          </FormField>

          <FormField label="Status" className="w-full sm:w-[150px]">
            {(field) => (
              <Select {...field} shape="pill" className="pl-4" {...register("status")}>
                {ISSUE_STATUS_FILTERS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )}
          </FormField>

          <div className="flex gap-2">
            {dirty && (
              <Button type="button" variant="outline" shadow="none" size="sm" onClick={onClear}>
                Clear
              </Button>
            )}
            <Button type="submit" variant="ink" shadow="tertiary" size="sm">
              Apply
            </Button>
          </div>
        </div>

        <fieldset className="flex flex-wrap items-center gap-2.5">
          <legend className="sr-only">Difficulty</legend>
          <span
            aria-hidden="true"
            className="font-mono-label text-[10.5px] uppercase tracking-[0.06em] text-on-surface-muted"
          >
            Difficulty
          </span>
          {DIFFICULTIES.map((value) => {
            const active = difficulty === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setValue("difficulty", active ? null : value, { shouldDirty: true })
                }
                className={cn(
                  "rounded-full border-[1.5px] px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
                  active
                    ? "border-outline bg-primary text-on-primary"
                    : "border-outline/15 text-on-surface-variant hover:border-outline",
                )}
              >
                {value}
              </button>
            );
          })}
        </fieldset>
    </form>
  );
}
