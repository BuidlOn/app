"use client";

import { cn } from "@/lib/utils";

/** Build a compact page list with ellipses, e.g. [1, 2, 3, "...", 42]. */
function buildRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  let prev = 0;
  for (const page of sorted) {
    if (page - prev > 1) result.push("...");
    result.push(page);
    prev = page;
  }
  return result;
}

/** All controls are 34px circles so the row reads as a strip of tokens. */
const CELL =
  "flex h-[34px] w-[34px] items-center justify-center rounded-buidl-pill font-mono-label text-[12px] transition-colors";

const CONTROL = `${CELL} border-hairline border-line bg-surface text-on-surface hover:border-outline disabled:pointer-events-none disabled:opacity-40`;

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  if (totalPages <= 1) return null;
  const range = buildRange(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={CONTROL}
      >
        ←
      </button>

      {range.map((item, i) =>
        item === "..." ? (
          <span
            key={`gap-${i}`}
            className="px-1 font-mono-label text-[12px] text-on-surface-muted"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              CELL,
              item === page
                ? "border-ink border-outline bg-outline font-bold text-background"
                : "border-hairline border-line bg-surface text-on-surface hover:border-outline",
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={CONTROL}
      >
        →
      </button>
    </nav>
  );
}
