"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { formatUsd } from "@/utils/format";
import { useCreateSeason } from "../hooks/use-admin";

/**
 * The reward-pool ceiling depends on live treasury balance, so the schema is
 * built per render rather than hoisted to a module constant.
 */
function makeSchema(treasuryUsd: number) {
  return z
    .object({
      name: z.string().trim().min(3, "Season name must be at least 3 characters."),
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
      <h3 className="mb-4 font-page-title text-[15px] font-bold text-on-surface">
        Create new season
      </h3>

      <form className="flex flex-col gap-3" onSubmit={onSubmit} noValidate>
        <FormField label="Season name" required error={errors.name?.message}>
          {(field) => (
            <Input {...field} shape="compact" placeholder="Season 8" {...register("name")} />
          )}
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Start date" required error={errors.startDate?.message}>
            {(field) => <Input {...field} shape="compact" type="date" {...register("startDate")} />}
          </FormField>

          <FormField label="End date" required error={errors.endDate?.message}>
            {(field) => <Input {...field} shape="compact" type="date" {...register("endDate")} />}
          </FormField>
        </div>

        <FormField
          label="Reward pool (USDC)"
          required
          error={errors.rewardPool?.message}
          hint={`Treasury balance: ${formatUsd(treasuryUsd)}`}
        >
          {(field) => (
            <Input
              {...field}
              shape="compact"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              placeholder="250000"
              className="font-mono-label"
              {...register("rewardPool")}
            />
          )}
        </FormField>

        <Button
          type="submit"
          variant="ink"
          shadow="primary"
          size="sm"
          className="mt-1 w-full"
          disabled={createSeason.isPending}
        >
          {createSeason.isPending ? "Launching..." : "Launch season"}
        </Button>
      </form>
    </Card>
  );
}
