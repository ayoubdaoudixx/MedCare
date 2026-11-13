"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import {
  BatteryFull,
  Camera,
  CheckCheck,
  ChevronLeft,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Signal,
  Smile,
  Video,
  Wifi,
} from "lucide-react";
import { LogoMark } from "@/components/ui/logo-mark";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type ChatMessage = { from: "visitor" | "medcare"; text: string };

// Clock times shown under the messages of the phone mock-up, in order.
const TIMES = ["21:40", "21:41", "21:42", "21:42", "21:43", "21:44"];

// A short WhatsApp exchange that plays when it scrolls into view: the
// visitor's message arrives, MedCare "types", then the answer writes itself.
// It is an illustration of how a request starts, labelled as an example.
// Without motion (reduced-motion setting or no script) all messages show.
//
// Two looks:
// - `bare`: just the bubbles, for use over a photo.
// - `phone`: a phone with a messaging screen around the bubbles (status bar,
//   contact header, wallpaper, message field). The chrome is decorative and
//   hidden from assistive technology; the messages stay readable text.
export function ChatDemo({
  messages,
  variant = "phone",
  className,
}: {
  messages: ChatMessage[];
  variant?: "phone" | "bare";
  className?: string;
}) {
  const { t, lang } = useI18n();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-chat-row]", el);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          delay: 0.2,
        });

        rows.forEach((row) => {
          const bubble = row.querySelector<HTMLElement>("[data-chat-bubble]");
          const typing = row.querySelector<HTMLElement>("[data-chat-typing]");
          const full = row.querySelector<HTMLElement>("[data-chat-full]");
          const typed = row.querySelector<HTMLElement>("[data-chat-typed]");
          if (!bubble || !full || !typed) return;
          gsap.set(bubble, { autoAlpha: 0 });

          if (typing) {
            // MedCare is typing, then the answer writes itself.
            const chars = Array.from(full.textContent ?? "");
            const counter = { n: 0 };
            tl.call(() => {
              el.dataset.typing = "true";
            })
              .set(typing, { display: "flex" })
              .fromTo(typing, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.2 })
              .to(typing, { autoAlpha: 0, duration: 0.15 }, "+=0.85")
              .set(typing, { display: "none" })
              .call(() => {
                el.dataset.typing = "false";
              })
              .set(full, { visibility: "hidden" })
              .to(bubble, { autoAlpha: 1, duration: 0.15 })
              .to(counter, {
                n: chars.length,
                duration: Math.min(1.7, chars.length * 0.03),
                ease: "none",
                onUpdate: () => {
                  typed.textContent = chars.slice(0, Math.round(counter.n)).join("");
                },
              })
              .set(full, { visibility: "visible" })
              .call(() => {
                typed.textContent = "";
              });
          } else {
            // The visitor's message arrives whole, as a sent message does.
            tl.fromTo(
              bubble,
              { autoAlpha: 0, y: 10, scale: 0.96 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.6)" }
            );
          }
          tl.to({}, { duration: 0.4 });
        });

        return () => {
          el.dataset.typing = "false";
          el.querySelectorAll<HTMLElement>("[data-chat-typed]").forEach((n) => (n.textContent = ""));
        };
      });
    },
    { scope: root, dependencies: [lang, messages.length], revertOnUpdate: true }
  );

  const phone = variant === "phone";

  const rows = (
    <ul className={cn("grid", phone ? "gap-1.5" : "gap-2.5")}>
      {messages.map((message, i) => {
        const mine = message.from === "visitor";
        return (
          <li key={i} data-chat-row className={cn("relative flex", mine ? "justify-end" : "justify-start")}>
            {!mine && (
              <span
                data-chat-typing
                aria-hidden="true"
                className={cn(
                  "absolute start-0 top-0 hidden items-center gap-1 bg-white px-4",
                  phone ? "h-9 rounded-lg rounded-ss-none shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]" : "h-10 rounded-2xl rounded-ss-md shadow-card"
                )}
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="size-1.5 rounded-full bg-muted-text"
                    style={{ animation: `dot-bounce 1.1s ${dot * 0.15}s infinite` }}
                  />
                ))}
              </span>
            )}
            <p
              data-chat-bubble
              className={cn(
                "relative max-w-[86%] text-[0.9375rem] leading-snug",
                phone
                  ? "flex flex-wrap items-end justify-end gap-x-2 rounded-lg px-2.5 pb-1.5 pt-1.5 shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]"
                  : "grid rounded-2xl px-4 py-2.5 shadow-card",
                mine ? "bg-[#D9FDD3] text-[#111B21]" : "bg-white text-[#111B21]",
                phone && (mine ? "rounded-se-none" : "rounded-ss-none"),
                !phone && (mine ? "rounded-ee-md" : "rounded-ss-md")
              )}
            >
              <span className="grid min-w-0 flex-1">
                <span data-chat-full className="[grid-area:1/1]">
                  {message.text}
                </span>
                <span data-chat-typed aria-hidden="true" className="[grid-area:1/1]" />
              </span>
              {phone && (
                <span aria-hidden="true" className="num flex shrink-0 items-center gap-1 text-[0.6875rem] leading-none text-[#667781]">
                  {TIMES[i % TIMES.length]}
                  {mine && <CheckCheck className="size-3.5 text-[#53BDEB]" strokeWidth={2.25} />}
                </span>
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "bare") {
    return (
      <div ref={root} className={className}>
        {rows}
      </div>
    );
  }

  return (
    <figure ref={root} data-typing="false" className={cn("group/chat mx-auto w-full max-w-[21rem]", className)}>
      {/* The phone body */}
      <div className="relative rounded-[2.75rem] bg-[#0B141A] p-2.5 shadow-lift ring-1 ring-black/10">
        {/* Side buttons */}
        <span aria-hidden="true" className="absolute -start-[3px] top-28 h-8 w-[3px] rounded-s bg-[#0B141A]" />
        <span aria-hidden="true" className="absolute -start-[3px] top-40 h-14 w-[3px] rounded-s bg-[#0B141A]" />
        <span aria-hidden="true" className="absolute -end-[3px] top-36 h-20 w-[3px] rounded-e bg-[#0B141A]" />

        <div className="relative flex min-h-[35rem] flex-col overflow-hidden rounded-[2.125rem] bg-[#EFEAE2]">
          {/* Camera cut-out */}
          <span aria-hidden="true" className="absolute start-1/2 top-2 z-10 h-[1.375rem] w-20 -translate-x-1/2 rounded-full bg-[#0B141A] rtl:translate-x-1/2" />

          {/* Status bar and contact header */}
          <div aria-hidden="true" className="bg-[#008069] text-white">
            <div className="flex h-9 items-center justify-between px-6 text-[0.75rem] font-semibold">
              <span className="num">21:40</span>
              <span className="flex items-center gap-1">
                <Signal className="size-3.5" strokeWidth={2.5} />
                <Wifi className="size-3.5" strokeWidth={2.5} />
                <BatteryFull className="size-4" strokeWidth={2} />
              </span>
            </div>
            <div className="flex items-center gap-2 px-2 pb-2.5 pt-1">
              <ChevronLeft className="size-6 shrink-0 rtl:-scale-x-100" strokeWidth={2} />
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white">
                <LogoMark className="size-[1.375rem]" />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[0.9375rem] font-semibold">MedCare</span>
                <span className="block text-xs text-white/85 group-data-[typing=true]/chat:hidden">{t("chat_online")}</span>
                <span className="hidden text-xs text-white/85 group-data-[typing=true]/chat:block">{t("chat_typing")}</span>
              </span>
              <Video className="size-5 shrink-0" strokeWidth={2} />
              <Phone className="size-[1.125rem] shrink-0" strokeWidth={2} />
              <MoreVertical className="size-5 shrink-0" strokeWidth={2} />
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 bg-[radial-gradient(rgb(11_20_26/0.045)_1px,transparent_1px)] px-3 py-3 [background-size:14px_14px]">
            <p aria-hidden="true" className="mx-auto mb-3 w-fit rounded-md bg-white/90 px-2.5 py-1 text-[0.6875rem] font-medium text-[#54656F] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">
              {t("rb_today")}
            </p>
            {rows}
          </div>

          {/* Message field */}
          <div aria-hidden="true" className="flex items-center gap-1.5 px-2 pb-3 pt-1.5">
            <span className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 text-[#8696A0] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">
              <Smile className="size-5 shrink-0" strokeWidth={1.75} />
              <span className="min-w-0 flex-1 truncate text-[0.9375rem]">{t("chat_input")}</span>
              <Paperclip className="size-5 shrink-0" strokeWidth={1.75} />
              <Camera className="size-5 shrink-0" strokeWidth={1.75} />
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#00A884] text-white">
              <Mic className="size-5" strokeWidth={2} />
            </span>
          </div>
          <span aria-hidden="true" className="mx-auto mb-1.5 h-1 w-24 rounded-full bg-[#0B141A]/80" />
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted-text">{t("chat_label")}</figcaption>
    </figure>
  );
}
