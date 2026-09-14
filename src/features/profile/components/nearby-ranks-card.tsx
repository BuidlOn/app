import { Avatar } from "@/components/ui/avatar";
import { formatNumber } from "@/utils/format";

// Mock data as requested
const NEARBY_RANKS = [
  { rank: 310, username: "m_desai", points: 2500, current: false, avatar: "" },
  { rank: 311, username: "k_wolfe", points: 2490, current: false, avatar: "" },
  { rank: 312, username: "jlin_dev", points: 2480, current: true, avatar: "" },
  { rank: 313, username: "d_ferreira", points: 2460, current: false, avatar: "" },
];

export function NearbyRanksCard() {
  return (
    <div className="rounded-[16px] border border-outline/10 bg-white p-6 h-full flex flex-col">
      <h3 className="m-0 mb-6 font-page-title text-[15px] font-bold text-on-surface">
        Nearby ranks
      </h3>
      <div className="flex flex-col gap-2">
        {NEARBY_RANKS.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between rounded-[8px] px-3 py-2.5 transition-colors ${
              user.current ? "bg-secondary-wash" : "hover:bg-ink/5"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`font-mono-label text-[10.5px] w-6 text-center ${user.current ? "text-secondary font-bold" : "text-on-surface-muted"}`}>
                {user.rank}
              </span>
              <div className="h-[26px] w-[26px] rounded-full flex items-center justify-center overflow-hidden shrink-0">
                {user.avatar ? (
                  <Avatar src={user.avatar} alt={user.username} size={26} />
                ) : (
                  <div className={`h-full w-full ${user.current ? "bg-ink" : "bg-surface-muted"}`} />
                )}
              </div>
              <span className={`font-mono-label text-[11px] ${user.current ? "text-secondary" : "text-on-surface"}`}>
                {user.username}
              </span>
            </div>
            <span className={`font-mono-label text-[10px] ${user.current ? "text-secondary font-bold" : "text-on-surface-muted"}`}>
              {formatNumber(user.points / 1000).replace(/\.0+$/, '')}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
