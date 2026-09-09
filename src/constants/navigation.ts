import type { GlyphName } from "@/components/ui/icons";

export interface NavItem {
  label: string;
  href: string;
  icon: GlyphName;
  /** Shorter label for the mobile tab bar. */
  shortLabel?: string;
}

export const APP_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard", shortLabel: "Home" },
  { label: "Repositories", href: "/repositories", icon: "repositories" },
  { label: "Issues", href: "/issues", icon: "issues" },
  { label: "Leaderboard", href: "/leaderboard", icon: "leaderboard", shortLabel: "Ranks" },
  { label: "Rewards", href: "/rewards", icon: "star" },
];

/**
 * Mobile tab bar — the five destinations from the mobile designs. Declared
 * separately from APP_NAV because Profile belongs here (there is no room for
 * an account menu on a tab bar) but not in the desktop sidebar.
 */
export const MOBILE_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard", shortLabel: "Home" },
  { label: "Issues", href: "/issues", icon: "issues" },
  { label: "Leaderboard", href: "/leaderboard", icon: "leaderboard", shortLabel: "Ranks" },
  { label: "Rewards", href: "/rewards", icon: "star" },
  { label: "Profile", href: "/profile", icon: "user" },
];

/** Admin console sidebar navigation. */
export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Seasons", href: "/admin/seasons", icon: "calendar" },
  { label: "Rewards", href: "/admin/rewards", icon: "star" },
  { label: "Repositories", href: "/admin/repositories", icon: "repositories" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];
