import { Skeleton } from "@/components/ui/skeleton";

/** Keeps the admin shell on screen on a prefetch miss. See `(app)/loading.tsx`. */
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6" aria-busy="true">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-64 rounded-buidl-lg" />
      <Skeleton className="h-40 rounded-buidl-lg" />
    </div>
  );
}
