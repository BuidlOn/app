import { cn } from "@/lib/utils";

/** Flat pulsing block. No sliding shimmer, per the design spec. */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton", className)} {...props} />;
}
