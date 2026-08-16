"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
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

const labelClass = "sr-only"; // Labels are hidden in the design but needed for accessibility
const fieldClass =
  "w-full rounded-[10px] border-[1.5px] border-outline/15 bg-white px-[12px] py-[9px] text-[12.5px] text-on-surface outline-none transition-colors placeholder:text-outline-variant focus:border-primary";

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
    <Card className="p-[22px]">
      <h3 className="m-0 mb-[16px] font-page-title text-[15px] font-bold text-on-surface">Create new season</h3>
      <form className="flex flex-col gap-[12px]" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="season-name" className={labelClass}>
            Season Name
          </label>
          <input
            id="season-name"
            className={cn(fieldClass, errors.name ? "border-error focus:border-error" : "")}
            placeholder="Season name"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 font-mono-label text-[10px] uppercase text-error">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-[12px]">
          <div>
            <label htmlFor="start-date" className={labelClass}>
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              className={cn(fieldClass, "[color-scheme:dark]", errors.startDate ? "border-error focus:border-error" : "")}
              {...register("startDate")}
            />
            {errors.startDate && (
              <p className="mt-1 font-mono-label text-[10px] uppercase text-error">
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
              className={cn(fieldClass, "[color-scheme:dark]", errors.endDate ? "border-error focus:border-error" : "")}
              {...register("endDate")}
            />
            {errors.endDate && (
              <p className="mt-1 font-mono-label text-[10px] uppercase text-error">
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
              className={cn(fieldClass, "font-mono-label", errors.rewardPool ? "border-error focus:border-error" : "")}
              placeholder="Reward pool (USDC)"
              {...register("rewardPool")}
            />
          </div>
          {errors.rewardPool && (
            <p className="mt-1 flex items-center gap-1 font-mono-label text-[10px] uppercase text-error">
              <Icon name="error" className="text-[14px]" />
              {errors.rewardPool.message}
            </p>
          )}
        </div>

        <div className="mt-[4px]">
          <button
            type="submit"
            disabled={createSeason.isPending}
            className="w-full rounded-full border-[2px] border-ink bg-ink py-[10px] font-mono-label text-[12px] font-bold text-white transition-all shadow-brutal-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60"
          >
            {createSeason.isPending ? "Launching..." : "Launch season"}
          </button>
        </div>
      </form>
    </Card>
  );
}
