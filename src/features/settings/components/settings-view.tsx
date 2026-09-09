"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { Input, Textarea } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useUpdateProfile, useUpdateWallet } from "../hooks/use-settings";
import type { User } from "@/types/domain";

/** Accepts bare hosts ("yoursite.dev") as well as full URLs. */
const WEBSITE_PATTERN = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/;

const profileSchema = z.object({
  name: z.string().trim().max(80, "Display name must be 80 characters or fewer."),
  bio: z.string().trim().max(280, "Bio must be 280 characters or fewer."),
  country: z.string().trim().max(60, "Country must be 60 characters or fewer."),
  website: z
    .string()
    .trim()
    .max(120, "Website must be 120 characters or fewer.")
    .refine(
      (value) => value === "" || WEBSITE_PATTERN.test(value),
      "Enter a valid website, e.g. yoursite.dev",
    ),
  skills: z.string().trim().max(200, "Keep the skills list under 200 characters."),
});
type ProfileForm = z.infer<typeof profileSchema>;

const walletSchema = z.object({
  walletAddress: z
    .string()
    .trim()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Enter a valid EVM wallet address (0x + 40 hex chars).")
    // An empty value is allowed so a saved address can be removed.
    .or(z.literal("")),
});
type WalletForm = z.infer<typeof walletSchema>;

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b-[1.5px] border-outline/10 px-6 py-5 sm:px-7">
        <h2 className="font-page-title text-[17px] font-bold text-on-surface">{title}</h2>
        <p className="mt-1 text-[13px] text-on-surface-variant">{description}</p>
      </div>
      <div className="p-6 sm:p-7">{children}</div>
    </Card>
  );
}

export function SettingsView() {
  const { data: user, isLoading, isError, refetch } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-[720px] flex-col gap-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[420px] w-full rounded-buidl-lg" />
        <Skeleton className="h-[220px] w-full rounded-buidl-lg" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-4 p-10 text-center">
        <Glyph name="shield" size={32} className="text-on-surface-muted" />
        <div>
          <h2 className="font-page-title text-[19px] font-bold">Couldn&apos;t load settings</h2>
          <p className="mt-1 text-[13.5px] text-on-surface-variant">
            We couldn&apos;t reach your account. Check your connection and try again.
          </p>
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </Card>
    );
  }

  // Remount on identity change so defaultValues re-seed from the fresh user.
  return <SettingsForms key={user.id} initial={user} />;
}

function SettingsForms({ initial }: { initial: User }) {
  const updateProfile = useUpdateProfile();
  const updateWallet = useUpdateWallet();

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initial.name ?? "",
      bio: initial.bio ?? "",
      country: initial.country ?? "",
      website: initial.website ?? "",
      skills: initial.skills.join(", "),
    },
  });

  const walletForm = useForm<WalletForm>({
    resolver: zodResolver(walletSchema),
    defaultValues: { walletAddress: initial.walletAddress ?? "" },
  });

  const profileErrors = profileForm.formState.errors;
  const walletErrors = walletForm.formState.errors;

  const onSubmitProfile = profileForm.handleSubmit((values) =>
    updateProfile.mutate({
      // Empty means "clear it": the backend treats null as a removal.
      name: values.name || null,
      bio: values.bio || null,
      country: values.country || null,
      website: values.website || null,
      skills: values.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }),
  );

  const onSubmitWallet = walletForm.handleSubmit((values) =>
    updateWallet.mutate(values.walletAddress.trim()),
  );

  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your public profile and payout wallet."
      />

      <form onSubmit={onSubmitProfile} noValidate>
        <SectionCard
          title="Profile"
          description="This information appears on your public contributor profile."
        >
          <div className="flex flex-col gap-[18px]">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Display name" error={profileErrors.name?.message}>
                {(field) => <Input {...field} {...profileForm.register("name")} />}
              </FormField>

              <FormField label="Country" error={profileErrors.country?.message}>
                {(field) => <Input {...field} {...profileForm.register("country")} />}
              </FormField>
            </div>

            <FormField
              label="Website"
              error={profileErrors.website?.message}
              hint="Shown on your public profile."
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="yoursite.dev"
                  {...profileForm.register("website")}
                />
              )}
            </FormField>

            <FormField
              label="Bio"
              error={profileErrors.bio?.message}
              hint="Up to 280 characters."
            >
              {(field) => (
                <Textarea rows={3} {...field} {...profileForm.register("bio")} />
              )}
            </FormField>

            <FormField
              label="Skills"
              error={profileErrors.skills?.message}
              hint="Comma separated."
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Rust, Solidity, TypeScript"
                  {...profileForm.register("skills")}
                />
              )}
            </FormField>

            <div className="mt-2 flex justify-end">
              <Button type="submit" variant="ink" size="sm" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? "Saving..." : "Save profile"}
              </Button>
            </div>
          </div>
        </SectionCard>
      </form>

      <form onSubmit={onSubmitWallet} noValidate>
        <SectionCard
          title="Payout wallet"
          description="Your rewards will be sent to this EVM address. Never share your private keys."
        >
          <FormField
            label="Wallet address"
            error={walletErrors.walletAddress?.message}
            hint="An EVM address starting with 0x."
          >
            {(field) => (
              <div className="relative">
                <Glyph
                  name="card"
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50"
                />
                <Input
                  {...field}
                  placeholder="0x..."
                  className="pl-10 font-mono-label"
                  {...walletForm.register("walletAddress")}
                />
              </div>
            )}
          </FormField>

          <div className="mt-5 flex justify-end">
            <Button type="submit" variant="ink" size="sm" disabled={updateWallet.isPending}>
              {updateWallet.isPending ? "Saving..." : "Save wallet"}
            </Button>
          </div>
        </SectionCard>
      </form>
    </div>
  );
}
