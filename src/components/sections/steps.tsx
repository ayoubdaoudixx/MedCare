"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/lib/i18n-context";
import { ChatDemo } from "@/components/ui/chat-demo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  { t: "stp1_t", d: "stp1_d" },
  { t: "stp2_t", d: "stp2_d" },
  { t: "stp3_t", d: "stp3_d" },
  { t: "stp4_t", d: "stp4_d" },
] as const;

// What happens between the call and the visit. A line fills as the visitor
// scrolls and each step lights up when the line reaches it. Without motion
// (reduced-motion setting, or no script) every step shows as complete.
export function Steps() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const list = root.current?.querySelector<HTMLElement>("[data-steps]");
        if (!list) return;
        const items = gsap.utils.toArray<HTMLElement>("[data-step]", list);

        gsap.fromTo(
          "[data-steps-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 72%", end: "bottom 62%", scrub: 0.4 },
          }
        );

        items.forEach((item) => {
          item.dataset.active = "false";
          ScrollTrigger.create({
            trigger: item,
            start: "top 70%",
            onEnter: () => (item.dataset.active = "true"),
            onLeaveBack: () => (item.dataset.active = "false"),
          });
        });

        return () => items.forEach((item) => (item.dataset.active = "true"));
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="comment" className="section-y bg-sand">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">{t("stp_eyebrow")}</p>
          <h2 className="text-title mt-3">{t("stp_h2")}</h2>

          <div data-steps className="relative mt-9">
            {/* Track and fill sit behind the numbers, on the reading-start side. */}
            <span aria-hidden="true" className="absolute bottom-6 start-[1.3125rem] top-6 w-0.5 rounded-full bg-sand-line" />
            <span
              aria-hidden="true"
              data-steps-fill
              className="absolute bottom-6 start-[1.3125rem] top-6 w-0.5 origin-top rounded-full bg-brand"
            />
            <ol>
          {STEPS.map((step, i) => (
            <li
              key={step.t}
              data-step
              data-active="true"
              className="group relative flex gap-5 pb-9 last:pb-0"
            >
              <span className="num relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-white text-base font-semibold text-muted-text ring-2 ring-sand-line transition-colors duration-300 group-data-[active=true]:bg-brand group-data-[active=true]:text-white group-data-[active=true]:ring-brand">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="text-xl">{t(step.t)}</h3>
                <p className="mt-1.5 max-w-md text-ink-soft">{t(step.d)}</p>
              </div>
            </li>
          ))}
            </ol>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <ChatDemo
            messages={[
              { from: "visitor", text: t("sp_1") },
              { from: "medcare", text: t("chat_2") },
              { from: "visitor", text: t("sp_3") },
              { from: "medcare", text: t("chat_4") },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
