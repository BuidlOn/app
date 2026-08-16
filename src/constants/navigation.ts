import type { GlyphName } from "@/components/ui/icons";

export interface NavItem {
  label: string;
  href: string;
  icon: GlyphName;
  /** Shorter label for the mobile tab bar. */
  shortLabel?: string;
}

export const APP_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Dashboard", href: "/dashboard", icon: "dashboard", shortLabel: "Home" },
  { label: "Repositories", href: "/repositories", icon: "repositories" },
  { label: "Issues", href: "/issues", icon: "issues" },
  { label: "Leaderboard", href: "/leaderboard", icon: "leaderboard", shortLabel: "Ranks" },
  { label: "Rewards", href: "/rewards", icon: "star" },
  { label: "Profile", href: "/profile", icon: "user" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

/**
 * Mobile tab bar — five destinations, matching the mobile designs. The rest of
 * the sidebar stays reachable through the drawer.
 */
export const MOBILE_NAV: NavItem[] = APP_NAV.filter((item) =>
  ["/dashboard", "/issues", "/leaderboard", "/rewards", "/profile"].includes(item.href),
);

/** Admin console sidebar navigation. */
export const ADMIN_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Seasons", href: "/admin/seasons", icon: "calendar" },
  { label: "Rewards", href: "/admin/rewards", icon: "star" },
  { label: "Repositories", href: "/admin/repositories", icon: "repositories" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];
