"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (t: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT: Record<ToastVariant, { icon: string; tone: string }> = {
  success: { icon: "check_circle", tone: "text-secondary" },
  error: { icon: "error", tone: "text-error" },
  info: { icon: "info", tone: "text-primary" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = ++idRef.current;
      setToasts((list) => [...list, { ...t, id }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => {
          const v = VARIANT[t.variant];
          return (
            <div
              key={t.id}
              className="pointer-events-auto flex items-start gap-3 border border-outline-variant bg-surface-container p-4 duration-200 animate-in slide-in-from-right-4"
            >
              <Icon name={v.icon} className={cn("text-lg", v.tone)} filled />
              <div className="flex-1">
                <p className="font-body text-sm font-bold text-on-surface">
                  {t.title}
                </p>
                {t.description && (
                  <p className="mt-0.5 font-caption text-xs text-on-surface-variant">
                    {t.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => dismiss(t.id)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <Icon name="close" className="text-base" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
