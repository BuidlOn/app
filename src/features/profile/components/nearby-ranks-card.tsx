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
    <div className="rounded-[16px] border border-[#161616]/10 bg-white p-6 h-full flex flex-col">
      <h3 className="m-0 mb-6 font-page-title text-[15px] font-bold text-[#161616]">
        Nearby ranks
      </h3>
      <div className="flex flex-col gap-2">
        {NEARBY_RANKS.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between rounded-[8px] px-3 py-2.5 transition-colors ${
              user.current ? "bg-[#F7F4FF]" : "hover:bg-[#161616]/5"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`font-mono-label text-[10.5px] w-6 text-center ${user.current ? "text-[#7C5CFC] font-bold" : "text-[#8a867c]"}`}>
                {user.rank}
              </span>
              <div className="h-[26px] w-[26px] rounded-full flex items-center justify-center overflow-hidden shrink-0">
                {user.avatar ? (
                  <Avatar src={user.avatar} alt={user.username} size={26} />
                ) : (
                  <div className={`h-full w-full ${user.current ? "bg-[#161616]" : "bg-[#E6E4DF]"}`} />
                )}
              </div>
              <span className={`font-mono-label text-[11px] ${user.current ? "text-[#7C5CFC]" : "text-[#161616]"}`}>
                {user.username}
              </span>
            </div>
            <span className={`font-mono-label text-[10px] ${user.current ? "text-[#7C5CFC] font-bold" : "text-[#8a867c]"}`}>
              {formatNumber(user.points / 1000, 2).replace(/\.0+$/, '')}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
