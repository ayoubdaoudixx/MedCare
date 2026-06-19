"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, RotateCcw, Bot } from "lucide-react";
import { useChatbot } from "@/hooks/useChatbot";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

declare global {
  interface Window {
    __medcareIntroDone?: boolean;
  }
}

// Event the home-page intro splash fires when it finishes.
export const INTRO_DONE_EVENT = "medcare:intro-done";

const EMERGENCY_KEYWORDS = [
  "urgence",
  "accident",
  "inconscient",
  "douleur thoracique",
  "respiration",
  "overdose",
  "hémorragie",
  "crise cardiaque",
  "étouffement",
  "convulsion",
];

function hasEmergencyKeyword(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

export function MedcareChatbot() {
  const { messages, isOpen, isLoading, unreadCount, sendMessage, toggleOpen, clearChat } =
    useChatbot();

  const pathname = usePathname();
  const [input, setInput] = useState("");
  const [introReady, setIntroReady] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [showHelpBubble, setShowHelpBubble] = useState(true);
  const [emergencyBanner, setEmergencyBanner] = useState(false);

  // The chatbot only shows once the home-page intro splash has finished.
  // Every other route has no intro, so it appears immediately.
  useEffect(() => {
    if (pathname !== "/") {
      setIntroReady(true);
      return;
    }
    if (typeof window !== "undefined" && window.__medcareIntroDone) {
      setIntroReady(true);
      return;
    }
    const handler = () => setIntroReady(true);
    window.addEventListener(INTRO_DONE_EVENT, handler);
    return () => window.removeEventListener(INTRO_DONE_EVENT, handler);
  }, [pathname]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Stop pulse animation after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxH = parseInt(getComputedStyle(el).lineHeight || "20") * 3 + 16;
    el.style.height = `${Math.min(el.scrollHeight, maxH)}px`;
  }, [input]);

  // Focus textarea when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    if (hasEmergencyKeyword(trimmed)) {
      setEmergencyBanner(true);
      setTimeout(() => setEmergencyBanner(false), 8000);
    }

    sendMessage(trimmed);
    setInput("");
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  if (!introReady) return null;

  return (
    <>
      {/* Chat panel — anchored bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="
                w-[min(340px,calc(100vw-2rem))] h-[min(480px,72dvh)]
                rounded-2xl bg-surface border border-line shadow-float
                flex flex-col overflow-hidden
              "
              style={{ zIndex: 9999 }}
            >
              {/* Header */}
              <div className="bg-brand px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <div className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                  <Bot className="w-4.5 h-4.5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight">
                    Yasmine
                  </p>
                  <p className="text-white/70 text-xs leading-tight truncate">
                    Assistante Médicale Medcare
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                    title="Nouvelle conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleOpen}
                    className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                    title="Fermer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Emergency banner */}
              <AnimatePresence>
                {emergencyBanner && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emergency-tint border-b border-emergency/20 px-4 py-2.5 flex-shrink-0"
                  >
                    <p className="text-emergency text-xs font-semibold leading-snug">
                      ⚠️ Si c&apos;est une urgence vitale, appelez le{" "}
                      <a
                        href="tel:+212522000000"
                        className="underline font-bold"
                      >
                        +212 5XX-XXXXXX
                      </a>{" "}
                      immédiatement.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 flex flex-col">
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
                    <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Bot className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink text-sm">
                        Bonjour, je suis Yasmine
                      </p>
                      <p className="text-muted-text text-xs mt-1 max-w-[220px]">
                        Votre assistante médicale Medcare. Comment puis-je vous
                        aider ?
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                  />
                ))}

                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div
                ref={inputContainerRef}
                className="border-t border-line bg-white px-3 py-2.5 flex-shrink-0"
              >
                <div className="flex items-end gap-2">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) =>
                      setInput(e.target.value.slice(0, 500))
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Écrivez votre message..."
                    rows={1}
                    className="
                      flex-1 resize-none bg-tint border border-line rounded-xl
                      px-3 py-2 text-sm text-ink placeholder:text-muted-text
                      focus:outline-none focus:border-brand focus:bg-white
                      transition-colors leading-relaxed
                    "
                    style={{ maxHeight: "72px", overflowY: "auto" }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="
                      w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center
                      hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed
                      transition-all flex-shrink-0 cursor-pointer
                    "
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-text mt-1.5 text-center">
                  Entrée pour envoyer · Shift+Entrée pour sauter une ligne
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trigger + help bubble — aligned horizontally with the back-to-top
          button (header.tsx), sitting in the corner to its right */}
      <div className="fixed bottom-20 md:bottom-8 right-6 md:right-8 z-[9999] flex flex-col items-end gap-3">
        {/* Dismissible help bubble */}
        <AnimatePresence>
          {!isOpen && showHelpBubble && (
            <motion.div
              key="help-bubble"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.8 }}
              className="relative flex items-center gap-2 bg-white text-ink pl-3.5 pr-2 py-2 rounded-2xl shadow-float border border-line"
            >
              <span className="text-sm font-semibold whitespace-nowrap">
                Besoin d&apos;aide ? Chat !!
              </span>
              <button
                onClick={() => setShowHelpBubble(false)}
                className="text-muted-text hover:text-ink hover:bg-tint transition-colors p-0.5 rounded-full cursor-pointer flex-shrink-0"
                title="Fermer"
                aria-label="Fermer le message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {/* Little tail pointing to the button */}
              <span className="absolute -bottom-1 right-6 w-2.5 h-2.5 bg-white border-r border-b border-line rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger round button */}
        {!isOpen && (
          <motion.button
            onClick={toggleOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.5 }}
            className="relative flex items-center justify-center w-12 h-12 bg-brand text-white rounded-full shadow-brand-glow hover:bg-brand-dark transition-colors cursor-pointer"
            aria-label="Ouvrir le chat"
          >
            {/* Pulsing ring */}
            {showPulse && (
              <span className="absolute inset-0 rounded-full bg-brand animate-pulse-ring" />
            )}

            {/* Avatar */}
            <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
              <Bot className="w-5 h-5" />
            </div>

            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emergency text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </div>
    </>
  );
}
