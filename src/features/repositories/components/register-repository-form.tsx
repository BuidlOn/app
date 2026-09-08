"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Glyph, type GlyphName } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { useRegisterRepository } from "../hooks/use-repositories";
import { InstallationRepoPicker } from "./installation-repo-picker";

const schema = z.object({
  url: z
    .string()
    .min(1, "Repository URL is required.")
    .regex(
      /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/,
      "Enter a valid GitHub repository URL (https://github.com/owner/repo).",
    ),
});

const GITHUB_APP_INSTALL_URL =
  process.env.NEXT_PUBLIC_GITHUB_APP_INSTALL_URL ?? "";

type FormValues = z.infer<typeof schema>;

const REQUIREMENTS: { icon: GlyphName; text: string }[] = [
  { icon: "star", text: "You must be a verified maintainer of the repository." },
  { icon: "search", text: "Only public, non-archived repositories are supported in the MVP." },
  { icon: "clock", text: "Issues and pull requests sync automatically once connected." },
];

export function RegisterRepositoryForm() {
  return (
    <Suspense>
      <RegisterRepositoryFormInner />
    </Suspense>
  );
}

function RegisterRepositoryFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Present after the GitHub App install round-trip (backend /github/setup
  // bounces here with the installation the user just granted on GitHub).
  const installationId = searchParams.get("installation_id");
  const register_ = useRegisterRepository();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { url: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    await register_
      .mutateAsync(values.url)
      .then(() => router.push("/repositories"))
      .catch(() => {});
  });

  return (
    <div className="mx-auto flex max-w-[800px] flex-col gap-6 sm:gap-8 pt-8">
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1 font-mono-label text-[12px] uppercase text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <Glyph name="chevronLeft" size={14} className="rotate-180" />
          Back
        </button>
        <PageHeader
          title="Connect a Repository"
          description="Register a GitHub repository to publish its issues on the marketplace."
        />
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Glyph name="github" size={20} className="mt-[2px] text-primary-deep" />
            <div>
              <p className="text-[15px] font-semibold text-on-surface">
                {installationId
                  ? "GitHub App installed — now pick repositories"
                  : "Step 1 — Install the BuidlOn GitHub App"}
              </p>
              <p className="mt-1 text-[13.5px] leading-[1.6] text-on-surface-variant">
                You only need to install the BuidlOn GitHub App if you
                maintain an open-source project that you want to apply to be
                part of a Campaign. If you&apos;re a contributor looking to
                work on issues in a Campaign, explore current Campaigns on
                the{" "}
                <Link href="/" className="font-medium text-primary hover:underline">
                  homepage
                </Link>
                .
              </p>
            </div>
          </div>
          {!installationId &&
            (GITHUB_APP_INSTALL_URL ? (
              <a
                href={GITHUB_APP_INSTALL_URL}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-[2px] border-outline bg-outline px-[20px] py-[11px] font-mono-label text-[13px] font-bold text-background transition-colors hover:opacity-90"
              >
                <Glyph name="github" size={16} />
                Install GitHub App
              </a>
            ) : (
              <p className="shrink-0 text-[12.5px] text-on-surface-muted">
                Set NEXT_PUBLIC_GITHUB_APP_INSTALL_URL to enable one-click install.
              </p>
            ))}
        </div>
      </Card>

      {installationId ? (
        <InstallationRepoPicker installationId={installationId} />
      ) : (
      <form onSubmit={onSubmit} noValidate className="rounded-buidl-lg bg-surface border-[1.5px] border-outline/15 p-6 sm:p-8">
        <p className="mb-4 text-[15px] font-semibold text-on-surface">
          Step 2 — Paste your repository URL
        </p>
        <div className="mb-6">
          <Label htmlFor="repo-url">GitHub Repository URL</Label>
          <Input
            id="repo-url"
            shape="pill"
            className={cn("mt-2", errors.url && "border-error focus:border-error")}
            placeholder="https://github.com/owner/repo"
            {...register("url")}
          />
          {errors.url && (
            <p className="mt-2 text-[12.5px] font-medium text-error">
              {errors.url.message}
            </p>
          )}
        </div>

        <div className="mb-8 space-y-3 border-t-[1.5px] border-outline/10 pt-6">
          {REQUIREMENTS.map((req) => (
            <div key={req.text} className="flex items-center gap-3 text-on-surface-variant">
              <Glyph name={req.icon} size={16} className="text-primary-deep" />
              <span className="text-[13.5px]">
                {req.text}
              </span>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center"
          disabled={register_.isPending}
        >
          {register_.isPending ? "Verifying..." : "Connect Repository"}
        </Button>
      </form>
      )}
    </div>
  );
}
