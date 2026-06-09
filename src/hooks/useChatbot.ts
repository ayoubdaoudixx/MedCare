"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const MAX_MESSAGE_LENGTH = 500;

// A fresh session id is generated on every page load so refreshing the page
// starts a brand-new conversation — nothing is persisted across reloads.
function createSessionId(): string {
  return crypto.randomUUID();
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const sessionId = useRef<string>("");

  // Fresh conversation on every page load — no persistence across refreshes
  useEffect(() => {
    sessionId.current = createSessionId();
  }, []);

  // Reset unread when opening
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  const toggleOpen = useCallback(() => setIsOpen((v) => !v), []);

  const clearChat = useCallback(() => {
    setMessages([]);
    sessionId.current = createSessionId();
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!trimmed || isLoading) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      const assistantMsgId = crypto.randomUUID();
      const assistantMsg: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsLoading(true);

      try {
        const historyForApi = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: historyForApi,
            sessionId: sessionId.current,
          }),
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          const errText =
            err.error || "Une erreur s'est produite. Veuillez réessayer.";
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: errText } : m
            )
          );
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: accumulated } : m
            )
          );
        }

        // Increment unread if chat is closed
        setIsOpen((open) => {
          if (!open) setUnreadCount((c) => c + 1);
          return open;
        });
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content:
                    "Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.",
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  return {
    messages,
    isOpen,
    isLoading,
    unreadCount,
    sessionId: sessionId.current,
    sendMessage,
    toggleOpen,
    clearChat,
  };
}
