import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { LogEntry, LogLevel } from "../types";

const LEVEL_TONE: Record<LogLevel, string> = {
  INFO: "text-primary-deep",
  SUCCESS: "text-secondary-deep",
  WARN: "text-error",
  ERROR: "text-error",
};

export function SystemLogs({ logs }: { logs: LogEntry[] }) {
  return (
    <Card className="border-[1.5px] border-outline/15 bg-ink p-[20px] text-white">
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono-label text-[10px] uppercase tracking-widest text-white/50">
          Live system logs
        </span>
        <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-secondary-deep" />
      </div>
      <div className="flex flex-col gap-[8px] font-mono-label text-[10.5px]">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-white/40">{log.time}</span>
            <span className={cn(LEVEL_TONE[log.level])}>[{log.level}]</span>
            <span className="text-white/70">{log.message}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
