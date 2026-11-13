"use client";

import { useRef, useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, RotateCcw, MessageCircle } from "lucide-react";
import { useChatbot } from "@/hooks/useChatbot";
import { dictionaries } from "@/lib/i18n";
import { useStoredLang } from "@/lib/i18n-context";
import { PHONE_DISPLAY, TEL_HREF, PUBLIC_EMERGENCY } from "@/lib/contact";
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

// Shared by the open panel and the trigger. On phones both sit above the
// fixed call bar, on large screens in the corner. `end-*` flips in Arabic.
const FLOATING =
  "fixed end-4 lg:end-6 bottom-[calc(var(--call-bar-h)+env(safe-area-inset-bottom,0px)+0.75rem)] lg:bottom-6 z-[75] flex flex-col items-end gap-3";

const HEADER_BUTTON =
  "grid size-11 place-items-center rounded-full text-white/75 transition-colors duration-150 hover:bg-white/10 hover:text-white cursor-pointer";

function hasEmergencyKeyword(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

// On phones the first screen belongs to the two real ways to reach MedCare
// (call and WhatsApp). The chat button joins them once the visitor scrolls.
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
function triggerAllowed() {
  if (window.innerWidth >= 1024) return true;
  if (window.scrollY <= window.innerHeight * 0.6) return false;
  // Stay out of the way while the visitor fills in the request form.
  const form = document.getElementById("contact")?.getBoundingClientRect();
  return !form || form.top > window.innerHeight || form.bottom < 0;
}

function subscribeToIntro(onChange: () => void) {
  window.addEventListener(INTRO_DONE_EVENT, onChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onChange);
}

export function MedcareChatbot() {
  const { messages, isOpen, isLoading, unreadCount, sendMessage, toggleOpen, clearChat } =
    useChatbot();

  const pathname = usePathname();
  // The assistant itself answers in the visitor's language; its short labels
  // around the button follow the site language.
  const copy = dictionaries[useStoredLang()];
  const [input, setInput] = useState("");
  const [showHelpBubble, setShowHelpBubble] = useState(true);
  const [emergencyBanner, setEmergencyBanner] = useState(false);

  // The chatbot only shows once the home-page intro splash has finished.
  // Every other route has no intro, so it appears immediately.
  const introDone = useSyncExternalStore(
    subscribeToIntro,
    () => window.__medcareIntroDone === true,
    () => false
  );
  const introReady = pathname !== "/" || introDone;
  const showTrigger = useSyncExternalStore(subscribeToScroll, triggerAllowed, () => false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

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
      {/* Chat panel */}
      <div className={FLOATING}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-panel"
              role="dialog"
              aria-label="Discussion avec Yasmine, l'assistante MedCare"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="
                w-[min(22.5rem,calc(100vw-2rem))]
                h-[min(32rem,calc(100dvh_-_var(--call-bar-h)_-_env(safe-area-inset-bottom,0px)_-_2rem))]
                lg:h-[min(34rem,calc(100dvh_-_3rem))]
                rounded-2xl bg-background ring-1 ring-line shadow-lift
                flex flex-col overflow-hidden
              "
            >
              {/* Header */}
              <div className="on-dark bg-brand-deep ps-4 pe-1.5 py-1.5 flex items-center gap-3 flex-shrink-0">
                <div
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-white flex-shrink-0"
                  aria-hidden="true"
                >
                  <MessageCircle className="size-[1.125rem]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-[0.9375rem] leading-tight">
                    Yasmine
                  </p>
                  <p className="text-on-dark text-[0.8125rem] leading-tight truncate">
                    Assistante virtuelle MedCare
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={clearChat}
                    className={HEADER_BUTTON}
                    title="Nouvelle conversation"
                    aria-label="Nouvelle conversation"
                  >
                    <RotateCcw className="size-[1.125rem]" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={toggleOpen}
                    className={HEADER_BUTTON}
                    title="Fermer"
                    aria-label="Fermer la discussion"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Emergency banner */}
              <AnimatePresence>
                {emergencyBanner && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emergency-tint border-b border-emergency/20 px-4 flex-shrink-0 overflow-hidden"
                  >
                    <p className="py-2.5 text-emergency-dark text-sm font-semibold leading-snug">
                      Urgence vitale : appelez tout de suite le{" "}
                      <a href={TEL_HREF} className="num underline underline-offset-2 font-bold">
                        {PHONE_DISPLAY}
                      </a>{" "}
                      ou le SAMU au{" "}
                      <a
                        href={PUBLIC_EMERGENCY[0].href}
                        className="num underline underline-offset-2 font-bold"
                      >
                        {PUBLIC_EMERGENCY[0].number}
                      </a>
                      .
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-2 flex flex-col">
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
                    <div
                      className="grid size-14 place-items-center rounded-full bg-tint text-brand-dark"
                      aria-hidden="true"
                    >
                      <MessageCircle className="size-7" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink text-base">
                        Bonjour, je suis Yasmine
                      </p>
                      <p className="text-ink-soft text-sm mt-1 max-w-[16rem]">
                        Je réponds à vos questions sur les services et les tarifs
                        de MedCare. Que puis-je faire pour vous ?
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
                    placeholder="Écrivez votre message"
                    aria-label="Votre message"
                    rows={1}
                    className="
                      flex-1 min-h-11 resize-none bg-white border border-line rounded-xl
                      px-3 py-2 text-base text-ink placeholder:text-muted-text
                      focus:border-brand
                      transition-colors duration-150 leading-relaxed
                    "
                    style={{ maxHeight: "96px", overflowY: "auto" }}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    aria-label="Envoyer le message"
                    className="
                      grid size-11 place-items-center rounded-xl bg-brand text-white
                      hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed
                      transition-colors duration-150 flex-shrink-0 cursor-pointer
                    "
                  >
                    <Send className="size-[1.125rem] rtl:-scale-x-100" aria-hidden="true" />
                  </button>
                </div>
                <p className="hidden lg:block text-xs text-muted-text mt-1.5 text-center">
                  Entrée pour envoyer, Maj+Entrée pour aller à la ligne
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trigger and help bubble */}
      <div className={FLOATING}>
        {/* Dismissible help bubble */}
        <AnimatePresence>
          {!isOpen && showTrigger && showHelpBubble && (
            <motion.div
              key="help-bubble"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.8 }}
              className="relative hidden lg:flex items-center gap-1 bg-white text-ink ps-4 pe-0.5 py-0.5 rounded-2xl shadow-card ring-1 ring-line"
            >
              <span className="text-sm font-semibold whitespace-nowrap">{copy.chat_help}</span>
              <button
                type="button"
                onClick={() => setShowHelpBubble(false)}
                className="grid size-11 place-items-center rounded-full text-muted-text hover:text-ink hover:bg-tint transition-colors duration-150 cursor-pointer flex-shrink-0"
                aria-label={copy.chat_help_close}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
              {/* Little tail pointing to the button */}
              <span
                className="absolute -bottom-1 end-6 size-2.5 bg-white border-r border-b border-line rotate-45"
                aria-hidden="true"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger round button */}
        {!isOpen && showTrigger && (
          <motion.button
            type="button"
            onClick={toggleOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative grid size-14 place-items-center bg-brand text-white rounded-full shadow-lift hover:bg-brand-dark transition-colors duration-150 cursor-pointer"
            aria-label={
              unreadCount > 0
                ? `Ouvrir la discussion avec l'assistante MedCare, ${unreadCount} ${unreadCount > 1 ? "nouveaux messages" : "nouveau message"}`
                : "Ouvrir la discussion avec l'assistante MedCare"
            }
          >
            <MessageCircle className="size-6" aria-hidden="true" />

            {/* Unread badge */}
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -end-1 grid min-w-5 h-5 px-1 place-items-center rounded-full bg-ink text-white text-[0.6875rem] font-bold ring-2 ring-white"
                aria-hidden="true"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </div>
    </>
  );
}
