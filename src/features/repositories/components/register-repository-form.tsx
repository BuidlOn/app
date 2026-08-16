"use client";

import { useRouter } from "next/navigation";
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

const schema = z.object({
  url: z
    .string()
    .min(1, "Repository URL is required.")
    .regex(
      /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/,
      "Enter a valid GitHub repository URL (https://github.com/owner/repo).",
    ),
});

type FormValues = z.infer<typeof schema>;

const REQUIREMENTS: { icon: GlyphName; text: string }[] = [
  { icon: "star", text: "You must be a verified maintainer of the repository." },
  { icon: "search", text: "Only public, non-archived repositories are supported in the MVP." },
  { icon: "clock", text: "Issues and pull requests sync automatically once connected." },
];

export function RegisterRepositoryForm() {
  const router = useRouter();
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

      <form onSubmit={onSubmit} noValidate className="rounded-buidl-lg bg-surface border-[1.5px] border-outline/15 p-6 sm:p-8">
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
    </div>
  );
}
