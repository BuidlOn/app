"use client";

import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { Input, Label, Select } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
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
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:gap-8">
      <PageHeader
        title="Repositories"
        description="Explore connected projects and find issues that match your stack."
        actions={
          <Button asChild variant="primary" size="sm">
            <Link href="/repositories/new">Connect Repository</Link>
          </Button>
        }
      />

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end">
        <div className="relative flex-1">
          <Label htmlFor="repo-search">Search</Label>
          <div className="relative mt-2">
            <Glyph
              name="search"
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface opacity-40"
            />
            <Input
              id="repo-search"
              type="search"
              shape="pill"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applySearch()}
              placeholder="Search repositories..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="w-full sm:w-[200px]">
          <Label htmlFor="repo-language">Language</Label>
          <Select
            id="repo-language"
            shape="pill"
            value={language ?? ""}
            onChange={(e) => {
              setLanguage(e.target.value || null);
              setPage(1);
            }}
            className="mt-2 pl-4"
          >
            <option value="">All Languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Select>
        </div>

        <Button
          type="button"
          variant="ink"
          shadow="tertiary"
          size="sm"
          onClick={applySearch}
        >
          Search
        </Button>
      </Card>

      {isError ? (
        <Card className="flex flex-col items-center px-6 py-16 text-center border-error bg-error/10">
          <Glyph name="shield" size={36} className="mb-4 text-error" />
          <h3 className="font-page-title text-[19px] font-bold text-on-surface">Failed to load repositories</h3>
          <p className="mb-6 mt-1.5 max-w-sm text-[13.5px] text-on-surface-variant">The server didn&apos;t respond. Check your connection and try again.</p>
          <Button type="button" variant="secondary" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </Card>
      ) : isLoading || !data ? (
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="mb-6 h-4 w-full" />
              <div className="flex gap-4 border-t-[1.5px] border-outline/10 pt-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : data.items.length === 0 ? (
        <Card className="flex flex-col items-center px-6 py-16 text-center">
          <Glyph name="search" size={36} className="mb-4 text-on-surface-muted" />
          <h3 className="font-page-title text-[19px] font-bold">No repositories found</h3>
          <p className="mb-6 mt-1.5 max-w-sm text-[13.5px] text-on-surface-variant">Try a different search or connect a new repository.</p>
          <Button type="button" variant="secondary" size="sm" onClick={() => { setSearch(""); setCommittedSearch(""); }}>
            Clear search
          </Button>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((repo) => (
              <RepositoryCard key={repo.id} repo={repo} />
            ))}
          </div>
          {data.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
