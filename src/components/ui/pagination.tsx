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

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const range = buildRange(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 font-mono-label text-sm"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="border border-outline-variant px-4 py-2 uppercase transition-colors hover:border-primary disabled:opacity-30"
      >
        Prev
      </button>

      {range.map((item, i) =>
        item === "..." ? (
          <span key={`gap-${i}`} className="px-2 text-on-surface-variant">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              "px-4 py-2 transition-colors",
              item === page
                ? "bg-primary-container font-bold text-on-primary-container"
                : "border border-outline-variant hover:border-primary",
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
        className="border border-outline-variant px-4 py-2 uppercase transition-colors hover:border-primary disabled:opacity-30"
      >
        Next
      </button>
    </nav>
  );
}
