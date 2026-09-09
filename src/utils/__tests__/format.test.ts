import { describe, expect, it, vi, afterEach } from "vitest";
import {
  formatCompactNumber,
  formatDate,
  formatNumber,
  formatPercent,
  formatRelativeTime,
  formatUsd,
  truncateHash,
} from "../format";

afterEach(() => vi.useRealTimers());

describe("truncateHash", () => {
  it("shortens a wallet address to head and tail", () => {
    expect(truncateHash("0x4f3b2a1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e9a2c", 4, 4)).toBe(
      "0x4f...9a2c",
    );
  });

  it("leaves short values untouched rather than corrupting them", () => {
    expect(truncateHash("0x1234", 6, 4)).toBe("0x1234");
  });
});

describe("number formatting", () => {
  it("groups thousands", () => {
    expect(formatNumber(8940)).toBe("8,940");
  });

  it("compacts large figures", () => {
    expect(formatCompactNumber(83200)).toBe("83.2K");
  });

  it("renders whole-dollar currency", () => {
    expect(formatUsd(14280)).toBe("$14,280");
  });

  it("compacts currency for headline stats", () => {
    expect(formatUsd(2400000, true)).toBe("$2.4M");
  });

  it("treats the input as a 0-1 fraction", () => {
    expect(formatPercent(0.68)).toBe("68%");
  });
});

describe("formatRelativeTime", () => {
  it("describes a time earlier the same day in hours", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-09T12:00:00.000Z"));
    expect(formatRelativeTime("2026-09-09T10:00:00.000Z")).toBe("2 hours ago");
  });

  it("rolls over to days", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-09T12:00:00.000Z"));
    expect(formatRelativeTime("2026-09-08T12:00:00.000Z")).toBe("yesterday");
  });
});

describe("formatDate", () => {
  it("renders an absolute short date", () => {
    expect(formatDate("2026-07-28T00:00:00.000Z")).toMatch(/Jul 2[78], 2026/);
  });
});
