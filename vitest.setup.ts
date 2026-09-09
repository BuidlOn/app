import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

/**
 * jsdom 30 under Vitest 4 exposes a `localStorage` object without the Storage
 * methods, so anything reading a token blows up with "getItem is not a
 * function". Install a real in-memory Storage when that happens.
 */
function installStorage(key: "localStorage" | "sessionStorage") {
  if (typeof window[key]?.getItem === "function") return;
  let store: Record<string, string> = {};
  Object.defineProperty(window, key, {
    configurable: true,
    value: {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => {
        store[k] = String(v);
      },
      removeItem: (k: string) => {
        delete store[k];
      },
      clear: () => {
        store = {};
      },
      key: (i: number) => Object.keys(store)[i] ?? null,
      get length() {
        return Object.keys(store).length;
      },
    },
  });
}

installStorage("localStorage");
installStorage("sessionStorage");

afterEach(() => window.localStorage.clear());

// jsdom implements neither of these, and Radix and our layout code touch both.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}
