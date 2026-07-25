/** Pure formatting helpers. No business logic — display only. */

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatUsd(value: number, compact = false): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);
}

export function formatPercent(fraction: number, digits = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: digits,
  }).format(fraction);
}

/** Shorten a wallet or tx hash: 0x7c3a...ed44 */
export function truncateHash(hash: string, lead = 6, tail = 4): string {
  if (hash.length <= lead + tail) return hash;
  return `${hash.slice(0, lead)}...${hash.slice(-tail)}`;
}
