import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt: string;
  /** Fallback initials shown when no image is available. */
  fallback?: string;
  size?: number;
  className?: string;
}

/**
 * Square avatar (sharp corners per the design system). Falls back to initials
 * on a muted surface when no image is provided.
 */
export function Avatar({
  src,
  alt,
  fallback,
  size = 32,
  className,
}: AvatarProps) {
  const initials =
    fallback ??
    alt
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden border border-outline-variant bg-surface-variant font-mono-label text-[10px] font-bold text-on-surface",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={alt} width={size} height={size} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
