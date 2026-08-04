"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { LANGUAGES } from "@/constants/issues";
import { useRepositories } from "../hooks/use-repositories";
import { RepositoryCard } from "./repository-card";

export function RepositoriesView() {
  const [search, setSearch] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");
  const [language, setLanguage] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useRepositories({
    search: committedSearch,
    language,
    page,
  });

  const applySearch = () => {
    setCommittedSearch(search);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-container-padding">
      <div className="mb-gap-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-page-title text-page-title font-bold tracking-tight text-on-surface">
            Repositories
          </h1>
          <p className="mt-1 font-body text-body text-on-surface-variant">
            Explore connected projects and find issues that match your stack.
          </p>
        </div>
        <Link
          href="/repositories/new"
          className="inline-flex shrink-0 items-center gap-2 bg-primary-container px-6 py-2.5 font-mono-label text-mono-label uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110"
        >
          <Icon name="add" className="text-sm" />
          Connect Repository
        </Link>
      </div>

      <div className="mb-gap-8 flex flex-col gap-4 border border-outline-variant bg-surface p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applySearch()}
            placeholder="Search repositories..."
            className="w-full border border-outline-variant bg-surface-container-lowest py-2 pl-9 pr-3 font-caption text-xs outline-none focus:border-primary"
          />
        </div>
        <select
          value={language ?? ""}
          onChange={(e) => {
            setLanguage(e.target.value || null);
            setPage(1);
          }}
          className="border border-outline-variant bg-surface-container-lowest px-3 py-2 font-caption text-xs outline-none focus:border-primary sm:w-48"
        >
          <option value="">All Languages</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={applySearch}
          className="bg-primary-container px-6 py-2 font-caption text-xs font-bold uppercase tracking-wider text-on-primary-container transition-all hover:brightness-110"
        >
          Search
        </button>
      </div>

      {isError ? (
        <div className="border border-error bg-error-container/10 p-12 text-center">
          <Icon name="warning" className="mb-4 text-4xl text-error" />
          <p className="mb-6 font-body font-bold uppercase text-on-surface">
            Failed to load repositories.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="bg-error px-6 py-2 font-mono-label text-sm font-bold uppercase text-on-error hover:brightness-110"
          >
            Retry
          </button>
        </div>
      ) : isLoading || !data ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 w-full" />
          ))}
        </div>
      ) : data.items.length === 0 ? (
        <div className="border border-outline-variant bg-surface-container-low p-20 text-center">
          <Icon name="folder_off" className="mb-4 text-6xl text-on-surface-variant" />
          <h3 className="mb-2 font-section-heading text-xl font-bold">
            No repositories found
          </h3>
          <p className="font-body text-on-surface-variant">
            Try a different search or connect a new repository.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((repo) => (
              <RepositoryCard key={repo.id} repo={repo} />
            ))}
          </div>
          {data.totalPages > 1 && (
            <div className="mt-gap-12">
              <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
