"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { useCreateSeason } from "../hooks/use-admin";

function makeSchema(treasuryUsd: number) {
  return z
    .object({
      name: z.string().min(3, "Season name must be at least 3 characters."),
      startDate: z.string().min(1, "Start date is required."),
      endDate: z.string().min(1, "End date is required."),
      rewardPool: z.coerce
        .number({ invalid_type_error: "Enter a reward pool amount." })
        .positive("Reward pool must be greater than zero.")
        .max(treasuryUsd, "Insufficient treasury balance for this amount."),
    })
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
      message: "End date must be after the start date.",
      path: ["endDate"],
    });
}

const labelClass =
  "mb-1.5 block font-mono-label text-[11px] uppercase text-outline";
const fieldClass =
  "w-full border bg-surface-container-lowest px-3 py-2 text-sm outline-none transition-colors placeholder:text-outline-variant focus:border-primary";

export function CreateSeasonForm({ treasuryUsd }: { treasuryUsd: number }) {
  const schema = makeSchema(treasuryUsd);
  type FormValues = z.input<typeof schema>;

  const createSeason = useCreateSeason();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", startDate: "", endDate: "", rewardPool: undefined },
  });

  const onSubmit = handleSubmit(async (values) => {
    await createSeason
      .mutateAsync({
        name: values.name,
        startDate: values.startDate,
        endDate: values.endDate,
        rewardPool: Number(values.rewardPool),
      })
      .then(() => reset())
      .catch(() => {});
  });

  return (
    <section className="border border-outline-variant bg-surface">
      <div className="border-b border-outline-variant px-6 py-4">
        <h3 className="font-section-heading text-[18px]">Configure Next Season</h3>
      </div>
      <form className="space-y-4 p-6" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="season-name" className={labelClass}>
            Season Name
          </label>
          <input
            id="season-name"
            className={cn(fieldClass, errors.name ? "border-error" : "border-outline-variant")}
            placeholder="e.g. Season 5: Expansion"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 font-caption text-[10px] text-error">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className={labelClass}>
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              className={cn(fieldClass, "[color-scheme:dark]", errors.startDate ? "border-error" : "border-outline-variant")}
              {...register("startDate")}
            />
            {errors.startDate && (
              <p className="mt-1.5 font-caption text-[10px] text-error">
                {errors.startDate.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="end-date" className={labelClass}>
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              className={cn(fieldClass, "[color-scheme:dark]", errors.endDate ? "border-error" : "border-outline-variant")}
              {...register("endDate")}
            />
            {errors.endDate && (
              <p className="mt-1.5 font-caption text-[10px] text-error">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="reward-pool" className={labelClass}>
            Reward Pool (USDC)
          </label>
          <div className="relative">
            <input
              id="reward-pool"
              type="number"
              className={cn(fieldClass, "font-mono-label", errors.rewardPool ? "border-error" : "border-outline-variant")}
              placeholder="250000"
              {...register("rewardPool")}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono-label text-[10px] text-outline">
              USDC
            </span>
          </div>
          {errors.rewardPool && (
            <p className="mt-1.5 flex items-center gap-1 font-caption text-[10px] font-medium text-error">
              <Icon name="error" className="text-[12px]" />
              {errors.rewardPool.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={createSeason.isPending}
            className="w-full border border-outline-variant bg-surface-container-high py-2 text-sm font-bold transition-all hover:border-primary hover:bg-primary hover:text-on-primary active:scale-95 disabled:opacity-60"
          >
            {createSeason.isPending ? "SCHEDULING..." : "SCHEDULE SEASON"}
          </button>
        </div>
      </form>
    </section>
  );
}
