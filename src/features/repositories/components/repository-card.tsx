import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber } from "@/utils/format";
import type { Repository } from "@/types/domain";

export function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <article className="flex flex-col border border-outline-variant bg-surface p-6 transition-colors hover:border-primary">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-outline-variant">
          <Icon name="folder" className="text-primary" filled />
        </div>
        <div className="min-w-0">
          <Link
            href={`/issues?repo=${repo.id}`}
            className="block truncate font-body font-bold text-on-surface hover:text-primary"
          >
            {repo.fullName}
          </Link>
          <p className="font-mono-label text-[10px] uppercase text-outline">
            {repo.languages.join(" · ") || "—"}
          </p>
        </div>
      </div>

      <p className="mb-6 line-clamp-2 flex-1 font-caption text-caption text-on-surface-variant">
        {repo.description ?? "No description provided."}
      </p>

      {repo.topics.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {repo.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 border-t border-outline-variant pt-4 text-center">
        <div>
          <p className="font-mono-label text-body font-bold text-on-surface">
            {formatCompactNumber(repo.stars)}
          </p>
          <p className="text-[10px] uppercase text-outline">Stars</p>
        </div>
        <div>
          <p className="font-mono-label text-body font-bold text-primary">
            {formatCompactNumber(repo.openIssues)}
          </p>
          <p className="text-[10px] uppercase text-outline">Issues</p>
        </div>
        <div>
          <p className="font-mono-label text-body font-bold text-on-surface">
            {formatCompactNumber(repo.contributors)}
          </p>
          <p className="text-[10px] uppercase text-outline">Devs</p>
        </div>
      </div>
    </article>
  );
}
