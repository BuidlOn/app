import { Skeleton } from "@/components/ui/skeleton";

/**
 * Exists to stop the root splash reaching in-product routes.
 *
 * Without it, a prefetch miss on a sidebar link would fall back to the nearest
 * ancestor `loading.tsx` — the full-screen brand splash — tearing down a shell
 * the user is already looking at. A page-shaped skeleton keeps the sidebar and
 * header put and only blanks the content column.
 *
 * Shape is deliberately generic: this covers every route in the group, so it
 * matches none of them exactly.
 */
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6" aria-busy="true">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-64 rounded-buidl-lg" />
      <Skeleton className="h-40 rounded-buidl-lg" />
    </div>
  );
}
