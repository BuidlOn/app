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
  { label: "Settings", href: "/settings", icon: "settings" },
];
