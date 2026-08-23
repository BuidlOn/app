import Image from "next/image";
import { cn } from "@/lib/utils";

/** Deterministic accent pick so a given user keeps the same avatar colour. */
const FILLS = [
  "bg-secondary text-white",
  "bg-primary text-on-primary",
  "bg-tertiary text-on-tertiary",
  "bg-accent text-white",
] as const;

function fillFor(seed?: string | null) {
  if (!seed) return FILLS[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return FILLS[Math.abs(hash) % FILLS.length];
}

interface AvatarProps {
  src?: string | null;
  alt?: string | null;
  /** Fallback initials shown when no image is available. */
  fallback?: string;
  size?: number;
  className?: string;
}

/**
 * Round avatar with an ink border. Without an image it falls back to initials
 * on an accent field, in the display face.
 */
export function Avatar({ src, alt, fallback, size = 34, className }: AvatarProps) {
  const initials =
    fallback ||
    (alt
      ? alt
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? "")
          .join("")
      : "");

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-page-title font-bold leading-none",
        size >= 30 ? "border-2 border-outline" : "border-[1.5px] border-outline",
        src ? "bg-surface-variant" : fillFor(alt),
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.38)) }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </span>
  );
}
