import { cn } from "@/lib/utils";
import type { LogEntry, LogLevel } from "../types";

const LEVEL_TONE: Record<LogLevel, string> = {
  INFO: "text-primary",
  SUCCESS: "text-secondary",
  WARN: "text-error",
  ERROR: "text-error",
};

export function SystemLogs({ logs }: { logs: LogEntry[] }) {
  return (
    <section className="border border-outline-variant bg-surface-container-low p-4">
      <div className="mb-3 flex items-center justify-between">
        <h5 className="font-mono-label text-[10px] uppercase tracking-widest text-outline">
          Live System Logs
        </h5>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
      </div>
      <div className="space-y-2 font-mono-label text-[11px]">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-outline">{log.time}</span>
            <span className={cn(LEVEL_TONE[log.level])}>[{log.level}]</span>
            <span className="text-on-surface-variant">{log.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
