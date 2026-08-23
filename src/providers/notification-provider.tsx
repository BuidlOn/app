"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useToast } from "./toast-provider";
import { API_BASE_URL, USE_MOCKS } from "@/services/api.client";

/**
 * Connects to the backend SSE endpoint to receive real-time notifications
 * and triggers query invalidation/toasts as needed.
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { data: user } = useCurrentUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user || USE_MOCKS) return;

    const token = window.localStorage.getItem("buidlon.accessToken");
    if (!token) return;

    // Use query param ?token=... to authenticate EventSource
    const base = API_BASE_URL.replace(/\/+$/, "");
    const url = `${base}/notifications/sse?token=${encodeURIComponent(token)}`;
    
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        
        // Show a toast when a new notification arrives
        if (payload?.title) {
          toast({
            variant: "info",
            title: payload.title,
            description: payload.body,
          });
        }

        // Invalidate queries so that the unread count and header updates
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      } catch (err) {
        console.error("Failed to parse SSE notification:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      // EventSource automatically attempts to reconnect on error.
    };

    return () => {
      eventSource.close();
    };
  }, [user, toast, queryClient]);

  return <>{children}</>;
}
