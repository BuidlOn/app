import { Card } from "./card";
import { Button } from "./button";
import { Glyph, type GlyphName } from "./icons";
import { cn } from "@/lib/utils";

/**
 * The four states every list and dashboard panel owes the reader: loading,
 * empty, error, success. Empty and error are never a blank region — each says
 * what happened and offers the next step.
 */
function Shell({
  icon,
  tone = "muted",
  title,
  body,
  action,
  className,
}: {
  icon: GlyphName;
  tone?: "muted" | "error";
  title: string;
  body?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-14 text-center", className)}>
      <Glyph
        name={icon}
        size={36}
        className={cn("mb-4", tone === "error" ? "text-error" : "text-on-surface-muted")}
      />
      <h3 className="font-page-title text-[19px] font-bold text-on-surface">{title}</h3>
      {body && (
        <p className="mt-1.5 max-w-sm text-[13.5px] text-on-surface-variant">{body}</p>
      )}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}

/**
 * Nothing to show, but nothing is wrong. Always give the reader somewhere to
 * go — an empty screen with no next step is a dead end.
 */
export function EmptyState({
  icon = "search",
  title,
  body,
  action,
  className,
  inCard = false,
}: {
  icon?: GlyphName;
  title: string;
  body?: string;
  action?: React.ReactNode;
  className?: string;
  /** Set when the caller already provides the card chrome. */
  inCard?: boolean;
}) {
  const content = (
    <Shell icon={icon} title={title} body={body} action={action} className={className} />
  );
  return inCard ? content : <Card>{content}</Card>;
}

/** Something failed. Say so plainly and offer a retry. */
export function ErrorState({
  title = "Something went wrong",
  body = "We couldn't load this. Check your connection and try again.",
  onRetry,
  action,
  className,
  inCard = false,
}: {
  title?: string;
  body?: string;
  onRetry?: () => void;
  /** Extra actions rendered beside Retry. */
  action?: React.ReactNode;
  className?: string;
  inCard?: boolean;
}) {
  const content = (
    <Shell
      icon="shield"
      tone="error"
      title={title}
      body={body}
      className={className}
      action={
        <>
          {onRetry && (
            <Button type="button" variant="secondary" size="sm" onClick={onRetry}>
              Retry
            </Button>
          )}
          {action}
        </>
      }
    />
  );
  return inCard ? content : <Card>{content}</Card>;
}
