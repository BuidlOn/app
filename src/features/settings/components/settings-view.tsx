"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useUpdateProfile, useUpdateWallet } from "../hooks/use-settings";

const labelClass = "mb-2 block font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted";
const fieldClass =
  "w-full border-[1.5px] border-outline/15 bg-white px-[14px] py-[10px] text-[13.5px] text-on-surface outline-none transition-colors placeholder:text-outline-variant focus:border-primary";

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
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM wallet address")
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
      <div className="border-b-[1.5px] border-outline/10 px-[28px] py-[20px]">
        <h3 className="m-0 font-page-title text-[17px] font-bold text-on-surface">
          {title}
        </h3>
        <p className="m-0 mt-1 text-[13px] text-on-surface-variant">
          {description}
        </p>
      </div>
      <div className="p-[28px]">{children}</div>
    </Card>
  );
}

export function SettingsView() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading || !user) {
    return (
      <div className="mx-auto flex max-w-[720px] flex-col gap-8 p-4 sm:p-container-padding">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[400px] w-full rounded-[20px]" />
        <Skeleton className="h-[200px] w-full rounded-[20px]" />
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
    defaultValues: {
      walletAddress: initial.walletAddress ?? "",
    },
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
    updateWallet.mutate(values.walletAddress.trim());
  });

  return (
    <div className="mx-auto max-w-[720px] p-4 sm:p-container-padding">
      <div className="mb-8">
        <h1 className="m-0 font-page-title text-[32px] font-bold tracking-tight text-on-surface">
          Settings
        </h1>
        <p className="m-0 mt-2 text-[15px] text-on-surface-variant">
          Manage your public profile and payout wallet.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <form onSubmit={onSubmitProfile} noValidate>
          <SectionCard
            title="Profile"
            description="This information appears on your public contributor profile."
          >
            <div className="flex flex-col gap-[18px]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>Display name</label>
                  <input id="name" className={cn(fieldClass, "rounded-[12px]")} {...profileForm.register("name")} />
                </div>
                <div>
                  <label htmlFor="country" className={labelClass}>Country</label>
                  <input id="country" className={cn(fieldClass, "rounded-[12px]")} {...profileForm.register("country")} />
                </div>
              </div>
              <div>
                <label htmlFor="website" className={labelClass}>Website</label>
                <input id="website" placeholder="yoursite.dev" className={cn(fieldClass, "rounded-[12px]")} {...profileForm.register("website")} />
              </div>
              <div>
                <label htmlFor="bio" className={labelClass}>Bio</label>
                <textarea
                  id="bio"
                  rows={3}
                  className={cn(fieldClass, "resize-none rounded-[12px]", profileForm.formState.errors.bio ? "border-error focus:border-error" : "")}
                  {...profileForm.register("bio")}
                />
                {profileForm.formState.errors.bio && (
                  <p className="mt-1.5 font-mono-label text-[10.5px] uppercase text-error">
                    {profileForm.formState.errors.bio.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="skills" className={labelClass}>Skills</label>
                <input id="skills" placeholder="Rust, Solidity, TypeScript" className={cn(fieldClass, "rounded-[12px]")} {...profileForm.register("skills")} />
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="rounded-[12px] bg-[#161616] px-6 py-3 font-mono-label text-[13px] font-bold text-white transition-colors hover:bg-black/80 disabled:opacity-60"
                >
                  {updateProfile.isPending ? "Saving..." : "Save profile"}
                </button>
              </div>
            </div>
          </SectionCard>
        </form>

        <form onSubmit={onSubmitWallet} noValidate>
          <SectionCard
            title="Payout Wallet"
            description="Your rewards will be sent to this EVM address."
          >
            <div className="flex flex-col gap-[18px]">
              <div>
                <label htmlFor="walletAddress" className={labelClass}>
                  Wallet Address
                </label>
                <div className="relative">
                  <Icon
                    name="Wallet"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  />
                  <input
                    id="walletAddress"
                    placeholder="0x..."
                    className={cn(
                      fieldClass,
                      "rounded-[12px] pl-[42px]",
                      walletForm.formState.errors.walletAddress ? "border-error focus:border-error" : ""
                    )}
                    {...walletForm.register("walletAddress")}
                  />
                </div>
                {walletForm.formState.errors.walletAddress && (
                  <p className="mt-1.5 font-mono-label text-[10.5px] uppercase text-error">
                    {walletForm.formState.errors.walletAddress.message}
                  </p>
                )}
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={updateWallet.isPending}
                  className="rounded-[12px] bg-[#161616] px-6 py-3 font-mono-label text-[13px] font-bold text-white transition-colors hover:bg-black/80 disabled:opacity-60"
                >
                  {updateWallet.isPending ? "Saving..." : "Save wallet"}
                </button>
              </div>
            </div>
          </SectionCard>
        </form>
      </div>
    </div>
  );
}

