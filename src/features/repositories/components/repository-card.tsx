import Link from "next/link";
import { Glyph } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCompactNumber } from "@/utils/format";
import type { Repository } from "@/types/domain";

export function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <Card as="article" lift="ink" className="flex flex-col p-6">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-outline rounded-full bg-surface">
          <Glyph name="github" size={20} className="text-on-surface" />
        </div>
        <div className="min-w-0">
          <Link
            href={`/issues?repo=${repo.id}`}
            className="block truncate font-page-title text-[16px] font-bold text-on-surface hover:underline"
          >
            {repo.fullName}
          </Link>
          <p className="font-mono-label text-[10px] uppercase text-on-surface-muted">
            {repo.languages.join(" · ") || "—"}
          </p>
        </div>
      </div>

      <p className="mb-6 line-clamp-2 flex-1 text-[13.5px] text-on-surface-variant">
        {repo.description ?? "No description provided."}
      </p>

      {repo.topics.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {repo.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="secondary">
              {topic}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 border-t-[1.5px] border-outline/10 pt-4 text-center">
        <div>
          <p className="font-mono-label text-[15px] font-bold text-on-surface">
            {formatCompactNumber(repo.stars)}
          </p>
          <p className="font-mono-label text-[10px] uppercase text-on-surface-muted">Stars</p>
        </div>
        <div>
          <p className="font-mono-label text-[15px] font-bold text-primary-deep">
            {formatCompactNumber(repo.openIssues)}
          </p>
          <p className="font-mono-label text-[10px] uppercase text-on-surface-muted">Issues</p>
        </div>
        <div>
          <p className="font-mono-label text-[15px] font-bold text-on-surface">
            {formatCompactNumber(repo.contributors)}
          </p>
          <p className="font-mono-label text-[10px] uppercase text-on-surface-muted">Devs</p>
        </div>
      </div>
    </Card>
  );
}
