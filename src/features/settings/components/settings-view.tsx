"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useUpdateProfile, useUpdateWallet } from "../hooks/use-settings";

const labelClass = "mb-1.5 block font-mono-label text-[11px] uppercase text-outline";
const fieldClass =
  "w-full border bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface outline-none transition-colors placeholder:text-outline-variant focus:border-primary";

const profileSchema = z.object({
  name: z.string().max(80).optional(),
  bio: z.string().max(280, "Bio must be 280 characters or fewer.").optional(),
  country: z.string().max(60).optional(),
  website: z.string().max(120).optional(),
  skills: z.string().optional(),
});
type ProfileForm = z.infer<typeof profileSchema>;

const walletSchema = z.object({
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Enter a valid EVM wallet address (0x + 40 hex chars)."),
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
    <section className="border border-outline-variant bg-surface">
      <div className="border-b border-outline-variant px-6 py-4">
        <h2 className="font-section-heading text-section-heading text-on-surface">
          {title}
        </h2>
        <p className="mt-0.5 font-caption text-caption text-on-surface-variant">
          {description}
        </p>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export function SettingsView() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading || !user) {
    return (
      <div className="mx-auto max-w-3xl space-y-8 p-4 sm:p-container-padding">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return <SettingsForms key={user.id} initial={user} />;
}

function SettingsForms({
  initial,
}: {
  initial: NonNullable<ReturnType<typeof useCurrentUser>["data"]>;
}) {
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

  const onSubmitProfile = profileForm.handleSubmit((values) => {
    updateProfile.mutate({
      name: values.name?.trim() || null,
      bio: values.bio?.trim() || null,
      country: values.country?.trim() || null,
      website: values.website?.trim() || null,
      skills: (values.skills ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  });

  const onSubmitWallet = walletForm.handleSubmit((values) => {
    updateWallet.mutate(values.walletAddress);
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-4 sm:p-container-padding">
      <div>
        <h1 className="font-page-title text-page-title font-bold tracking-tight text-on-surface">
          Settings
        </h1>
        <p className="mt-1 font-body text-body text-on-surface-variant">
          Manage your public profile and payout wallet.
        </p>
      </div>

      <form onSubmit={onSubmitProfile} noValidate>
        <SectionCard
          title="Profile"
          description="This information appears on your public contributor profile."
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Display Name</label>
                <input id="name" className={cn(fieldClass, "border-outline-variant")} {...profileForm.register("name")} />
              </div>
              <div>
                <label htmlFor="country" className={labelClass}>Country</label>
                <input id="country" className={cn(fieldClass, "border-outline-variant")} {...profileForm.register("country")} />
              </div>
            </div>
            <div>
              <label htmlFor="website" className={labelClass}>Website</label>
              <input id="website" placeholder="yoursite.dev" className={cn(fieldClass, "border-outline-variant")} {...profileForm.register("website")} />
            </div>
            <div>
              <label htmlFor="bio" className={labelClass}>Bio</label>
              <textarea
                id="bio"
                rows={3}
                className={cn(fieldClass, "resize-none", profileForm.formState.errors.bio ? "border-error" : "border-outline-variant")}
                {...profileForm.register("bio")}
              />
              {profileForm.formState.errors.bio && (
                <p className="mt-1.5 font-caption text-[11px] text-error">
                  {profileForm.formState.errors.bio.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="skills" className={labelClass}>Skills (comma separated)</label>
              <input id="skills" placeholder="Rust, Solidity, TypeScript" className={cn(fieldClass, "border-outline-variant")} {...profileForm.register("skills")} />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={updateProfile.isPending}
              className="bg-primary-container px-6 py-2.5 font-mono-label text-mono-label font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110 disabled:opacity-60"
            >
              {updateProfile.isPending ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </SectionCard>
      </form>

      <form onSubmit={onSubmitWallet} noValidate>
        <SectionCard
          title="Payout Wallet"
          description="Reward allocations are sent to this address. Never share your private keys."
        >
          <label htmlFor="wallet" className={labelClass}>Wallet Address</label>
          <div className="relative">
            <Icon
              name="account_balance_wallet"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant"
            />
            <input
              id="wallet"
              className={cn(
                fieldClass,
                "pl-10 font-mono-label",
                walletForm.formState.errors.walletAddress ? "border-error" : "border-outline-variant",
              )}
              placeholder="0x..."
              {...walletForm.register("walletAddress")}
            />
          </div>
          {walletForm.formState.errors.walletAddress && (
            <p className="mt-1.5 flex items-center gap-1 font-caption text-[11px] text-error">
              <Icon name="error" className="text-[12px]" />
              {walletForm.formState.errors.walletAddress.message}
            </p>
          )}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={updateWallet.isPending}
              className="bg-primary-container px-6 py-2.5 font-mono-label text-mono-label font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110 disabled:opacity-60"
            >
              {updateWallet.isPending ? "Saving..." : "Save Wallet"}
            </button>
          </div>
        </SectionCard>
      </form>
    </div>
  );
}
