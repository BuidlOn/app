export interface NavItem {
  label: string;
  href: string;
  /** Material Symbols icon name. */
  icon: string;
}

/** Primary sidebar navigation for the authenticated app shell. */
export const APP_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Repositories", href: "/repositories", icon: "code_blocks" },
  { label: "Issues", href: "/issues", icon: "bug_report" },
  { label: "Leaderboard", href: "/leaderboard", icon: "leaderboard" },
  { label: "Rewards", href: "/rewards", icon: "workspace_premium" },
  { label: "Profile", href: "/profile", icon: "person" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

/** Admin console sidebar navigation. */
export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Seasons", href: "/admin/seasons", icon: "calendar_month" },
  { label: "Rewards", href: "/admin/rewards", icon: "payments" },
  { label: "Repositories", href: "/admin/repositories", icon: "inventory_2" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];
