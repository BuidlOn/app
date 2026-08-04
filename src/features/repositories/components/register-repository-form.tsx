"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
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

const REQUIREMENTS = [
  { icon: "verified_user", text: "You must be a verified maintainer of the repository." },
  { icon: "public", text: "Only public, non-archived repositories are supported in the MVP." },
  { icon: "sync", text: "Issues and pull requests sync automatically once connected." },
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
    <div className="mx-auto max-w-2xl p-4 sm:p-container-padding">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-1 font-mono-label text-mono-label uppercase text-on-surface-variant transition-colors hover:text-primary"
      >
        <Icon name="arrow_back" className="text-base" />
        Back
      </button>

      <h1 className="mb-2 font-page-title text-page-title font-bold text-on-surface">
        Connect a Repository
      </h1>
      <p className="mb-8 font-body text-body text-on-surface-variant">
        Register a GitHub repository to publish its issues on the marketplace.
      </p>

      <form onSubmit={onSubmit} noValidate className="border border-outline-variant bg-surface p-6 sm:p-8">
        <label htmlFor="repo-url" className="mb-1.5 block font-mono-label text-[11px] uppercase text-outline">
          GitHub Repository URL
        </label>
        <input
          id="repo-url"
          className={cn(
            "w-full border bg-surface-container-lowest px-3 py-2.5 font-mono-label text-sm outline-none transition-colors placeholder:text-outline-variant focus:border-primary",
            errors.url ? "border-error" : "border-outline-variant",
          )}
          placeholder="https://github.com/owner/repo"
          {...register("url")}
        />
        {errors.url && (
          <p className="mt-1.5 flex items-center gap-1 font-caption text-[11px] text-error">
            <Icon name="error" className="text-[12px]" />
            {errors.url.message}
          </p>
        )}

        <div className="mt-6 space-y-3 border-t border-outline-variant pt-6">
          {REQUIREMENTS.map((req) => (
            <div key={req.text} className="flex items-center gap-3">
              <Icon name={req.icon} className="text-lg text-primary" />
              <span className="font-caption text-caption text-on-surface-variant">
                {req.text}
              </span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={register_.isPending}
          className="mt-8 flex w-full items-center justify-center gap-2 bg-primary-container py-3 font-mono-label text-mono-label font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110 disabled:opacity-60"
        >
          {register_.isPending ? "Verifying..." : "Connect Repository"}
        </button>
      </form>
    </div>
  );
}
