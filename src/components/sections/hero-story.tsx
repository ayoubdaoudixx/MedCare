"use client";

import { useRef } from "react";
import Image from "next/image";
import { CheckCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import type { DictKey } from "@/lib/i18n";
import { HERO_IMAGES } from "@/lib/hero-images";
import { IMAGE_PLACEHOLDERS } from "@/lib/image-placeholders";
import { AppIcon } from "@/components/ui/app-icon";

gsap.registerPlugin(useGSAP, ScrollTrigger);
// Phones resize the viewport when the address bar hides; that is not a reason
// to recalculate a pinned section.
ScrollTrigger.config({ ignoreMobileResize: true });

const BEATS = [
  { t: "story_1_t", d: "story_1_d" },
  { t: "story_2_t", d: "story_2_d" },
  { t: "story_3_t", d: "story_3_d" },
  { t: "story_4_t", d: "story_4_d" },
] as const;

// The conversation, in order. `at` is when the message opens, counted in
// beats (0 to 4); MedCare's answers then write themselves until `typed`.
const SCRIPT: { from: "visitor" | "medcare"; text: DictKey; at: number; typed?: number; location?: boolean }[] = [
  { from: "visitor", text: "hero_chat_in", at: 0.1 },
  { from: "medcare", text: "hs_m1", at: 0.42, typed: 0.84 },
  { from: "visitor", text: "hs_loc", at: 1.08, location: true },
  { from: "medcare", text: "hs_m2", at: 1.44, typed: 1.8 },
  { from: "visitor", text: "hs_v3", at: 1.88 },
  { from: "medcare", text: "hs_m3", at: 2.06, typed: 2.32 },
  { from: "medcare", text: "hs_m4", at: 3.1, typed: 3.36 },
  { from: "visitor", text: "hs_v4", at: 3.72 },
];

const ROUTE = "M70 436L186 424Q196 423 197 412L208 190Q209 177 222 176L308 168Q320 167 321 156L322 150";

function Photo({
  image,
  alt,
  priority,
  className,
}: {
  image: { src: string; focus: string };
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const blur = IMAGE_PLACEHOLDERS[image.src];
  return (
    <div data-scene className={cn("absolute inset-0 will-change-transform", className)}>
      <Image
        src={image.src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 46vw"
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur}
        className="object-cover"
        style={{ objectPosition: image.focus }}
      />
    </div>
  );
}

// The visit, told by a WhatsApp conversation that advances with the scroll.
// One frame stays in place while four things happen in it:
//   1. someone at home writes, and MedCare answers;
//   2. they share their position, which drops as a pin on a map of the city;
//   3. a route draws from MedCare to the home and the frame zooms into it;
//   4. the caregiver is at the door, then the care happens in the living room.
//
// On phones the frame is pinned under the header. On large screens the whole
// first row of the hero is pinned, so the headline stays next to the story.
// Without motion (reduced-motion setting, or no script) the frame shows the
// arrival photo on its own.
export function HeroStory({ ready = true }: { ready?: boolean }) {
  const { t, lang } = useI18n();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready) return;
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", phone: "(max-width: 63.99rem)" },
        (context) => {
          const { motion, phone } = context.conditions as { motion: boolean; phone: boolean };
          if (!motion) return;

          // Switch the markup to its animated layout before anything is measured.
          el.dataset.animated = "true";
          const q = gsap.utils.selector(el);
          const stage = q("[data-stage]")[0] as HTMLElement;
          const map = q("[data-map]")[0];
          const route = q("[data-route]")[0] as unknown as SVGPathElement;
          const marker = q("[data-marker]")[0];
          const pin = q("[data-pin]")[0];
          const pulse = q("[data-pulse]")[0];
          const chip = q("[data-chip]")[0];
          const [home, door, care] = q("[data-scene]");
          const rows = q("[data-row]") as HTMLElement[];
          const undo: (() => void)[] = [];

          const length = route.getTotalLength();
          const travel = { progress: 0 };
          const placeMarker = () => {
            const point = route.getPointAtLength(length * travel.progress);
            gsap.set(marker, { x: point.x, y: point.y });
          };

          gsap.set(home, { autoAlpha: 1, scale: 1.16, transformOrigin: HERO_IMAGES.home.focus });
          gsap.set([door, care], { autoAlpha: 0 });
          gsap.set(rows, { height: 0, autoAlpha: 0 });
          gsap.set(route, { strokeDashoffset: 1 });
          gsap.set(pin, { y: -46, autoAlpha: 0 });
          gsap.set(chip, { autoAlpha: 0, y: 6 });
          gsap.set(pulse, { scale: 0.3, autoAlpha: 0, transformOrigin: "50% 50%" });
          gsap.set(marker, { autoAlpha: 0 });
          placeMarker();

          // One unit of time per beat. The scroll position sets the time.
          const tl = gsap.timeline({ defaults: { ease: "none" } });
          // The conversation: each message opens in turn and pushes the older
          // ones up. MedCare's answers are written letter by letter, and the
          // writing follows the scroll in both directions.
          SCRIPT.forEach((line, i) => {
            const row = rows[i];
            tl.to(row, { height: "auto", autoAlpha: 1, duration: 0.1, ease: "power2.out" }, line.at);
            if (line.typed === undefined) return;
            const full = row.querySelector<HTMLElement>("[data-full]");
            const typed = row.querySelector<HTMLElement>("[data-typed]");
            if (!full || !typed) return;
            const chars = Array.from(full.textContent ?? "");
            const count = { n: 0 };
            const write = () => {
              const n = Math.round(count.n);
              const done = n >= chars.length;
              full.style.visibility = done ? "" : "hidden";
              typed.textContent = done ? "" : chars.slice(0, n).join("");
            };
            write();
            undo.push(() => {
              full.style.visibility = "";
              typed.textContent = "";
            });
            tl.to(count, { n: chars.length, duration: line.typed - line.at - 0.04, onUpdate: write }, line.at + 0.04);
          });

          // 1. At home. The photo eases back while the first messages arrive.
          tl.to(home, { scale: 1.02, duration: 1.1, transformOrigin: HERO_IMAGES.home.focus }, 0);

          // 2. The position. The photo dissolves into the map and the pin drops.
          tl.to(home, { autoAlpha: 0, duration: 0.2, ease: "power1.inOut" }, 0.96)
            .to(pin, { y: 0, autoAlpha: 1, duration: 0.2, ease: "back.out(2)" }, 1.16)
            .to(chip, { autoAlpha: 1, y: 0, duration: 0.12 }, 1.3)
            .to(pulse, { scale: 1, autoAlpha: 0.45, duration: 0.22 }, 1.36)
            .to(pulse, { scale: 1.7, autoAlpha: 0, duration: 0.26 }, 1.6);

          // 3. On the way. The route draws, then the frame moves into the home.
          tl.to(marker, { autoAlpha: 1, duration: 0.06 }, 2.08)
            .to(route, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, 2.1)
            .to(travel, { progress: 1, duration: 0.6, ease: "power1.inOut", onUpdate: placeMarker }, 2.1)
            .to(chip, { autoAlpha: 0, duration: 0.08 }, 2.68)
            .to(map, { scale: 2.6, duration: 0.34, ease: "power2.in", transformOrigin: "80.5% 30%" }, 2.68);

          // 4. At the door, then the care. The first photo arrives close on
          //    the nurse's face and settles back; the second moves closer.
          tl.fromTo(
            door,
            { autoAlpha: 0, scale: 1.45, transformOrigin: HERO_IMAGES.door.focus },
            { autoAlpha: 1, scale: 1.45, duration: 0.18, ease: "power1.inOut" },
            2.9
          )
            .to(door, { scale: 1.04, duration: 0.5, ease: "power2.out" }, 3.02)
            .fromTo(
              care,
              { autoAlpha: 0, scale: 1.02, transformOrigin: HERO_IMAGES.care.focus },
              { autoAlpha: 1, scale: 1.02, duration: 0.2, ease: "power1.inOut" },
              3.46
            )
            .to(care, { scale: 1.16, duration: 0.5 }, 3.5);

          // Phones pin the frame. Wide screens pin the whole first row, so the
          // headline and the buttons stay beside the story.
          const row = el.closest<HTMLElement>("[data-hero-row]");
          ScrollTrigger.create({
            animation: tl,
            trigger: phone || !row ? stage : row,
            start: phone ? "top 72px" : "top 92px",
            end: phone ? "+=320%" : "+=260%",
            pin: true,
            // The story eases toward the scroll position instead of jumping to it.
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Sections further down measure themselves after this pin exists.
            refreshPriority: 1,
          });
          const frame = requestAnimationFrame(() => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
          });

          return () => {
            cancelAnimationFrame(frame);
            undo.forEach((fn) => fn());
            delete el.dataset.animated;
          };
        }
      );
    },
    { scope: root, dependencies: [ready, lang], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="group/story">
      <div
        data-stage
        data-quiet-zone
        className="group-data-[animated=true]/story:max-lg:h-[calc(100svh-4.5rem-var(--call-bar-h)-env(safe-area-inset-bottom,0px)-0.75rem)]"
      >
        <figure className="relative h-full">
          <div className="img-outline relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-tint sm:aspect-[4/3] lg:aspect-auto lg:h-[min(41rem,calc(100svh-10rem))] group-data-[animated=true]/story:max-lg:aspect-auto group-data-[animated=true]/story:max-lg:h-full">
            {/* The map: a drawing of city blocks with the ocean at the top. */}
            <div data-map aria-hidden="true" className="absolute inset-0 will-change-transform">
              <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="size-full">
                <rect width="400" height="500" fill="#EDF4F9" />
                <path d="M0 0H400V58Q310 104 204 80T0 112Z" fill="#CFE6F5" />
                <g stroke="#fff" strokeLinecap="round" fill="none">
                  <g strokeWidth="16">
                    <path d="M-20 214L420 172" />
                    <path d="M-20 338L420 306" />
                    <path d="M-20 452L420 430" />
                    <path d="M92 96L64 520" />
                    <path d="M212 84L192 520" />
                    <path d="M322 78L334 520" />
                  </g>
                  <g strokeWidth="8">
                    <path d="M-20 274L420 240" />
                    <path d="M-20 392L420 366" />
                    <path d="M152 92L128 520" />
                    <path d="M268 82L262 520" />
                    <path d="M0 150L140 250" />
                  </g>
                </g>
                {/* Planned route, then the travelled one drawn over it. */}
                <path d={ROUTE} stroke="#9CC9E6" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 10" fill="none" />
                <path
                  data-route
                  pathLength={1}
                  d={ROUTE}
                  stroke="#1278AD"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1"
                  fill="none"
                />
                {/* Where the caregiver leaves from. */}
                <g transform="translate(70 436)">
                  <circle r="17" fill="#fff" stroke="#1278AD" strokeWidth="4" />
                  <path d="M0 -7V7M-7 0H7" stroke="#183660" strokeWidth="4" strokeLinecap="round" />
                </g>
                {/* The home: a pulse, then a pin whose tip sits on the address. */}
                <g transform="translate(322 150)">
                  <circle data-pulse r="34" fill="#1278AD" />
                  <g data-pin>
                    <path d="M0 0C-14 -18 -24 -30 -24 -44A24 24 0 1 1 24 -44C24 -30 14 -18 0 0Z" fill="#183660" />
                    <path d="M-11 -42L0 -53L11 -42V-32H4V-39H-4V-32H-11Z" fill="#fff" />
                  </g>
                </g>
                <g data-marker>
                  <circle r="12" fill="#fff" stroke="#1278AD" strokeWidth="5" />
                  <circle r="4" fill="#183660" />
                </g>
              </svg>
              <p
                data-chip
                className="absolute left-[44%] top-[11%] inline-flex items-center gap-1.5 rounded-full bg-white py-1.5 pe-3 ps-2 text-sm font-semibold text-ink shadow-card"
              >
                <AppIcon name="MapPin" className="size-4 text-brand" />
                {t("story_pin")}
              </p>
            </div>

            {/* Without motion only the arrival photo shows. With motion the
                three take turns: at home, at the door, the care. */}
            <Photo image={HERO_IMAGES.home} alt="" className="opacity-0" />
            <Photo image={HERO_IMAGES.door} alt={t("hero_img_alt")} priority />
            <Photo image={HERO_IMAGES.care} alt="" className="opacity-0" />

            {/* Keeps the conversation readable over any photo. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent group-data-[animated=true]/story:block"
            />

            {/* The conversation. Decorative: the same story is told by the
                list of steps, which assistive technology reads instead. */}
            <ul
              aria-hidden="true"
              className="absolute inset-x-2.5 bottom-2.5 hidden max-h-[40%] flex-col justify-end overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_26%)] lg:max-h-[44%] group-data-[animated=true]/story:flex sm:inset-x-4 sm:bottom-4"
            >
              {SCRIPT.map((line) => {
                const mine = line.from === "visitor";
                return (
                  <li key={line.text} data-row className={cn("flex shrink-0 overflow-hidden", mine ? "justify-end" : "justify-start")}>
                    <p
                      className={cn(
                        "mt-1.5 max-w-[84%] rounded-2xl text-[0.9375rem] leading-snug shadow-[0_1px_2px_rgb(5_29_62/0.25)]",
                        mine ? "rounded-ee-md bg-brand text-white" : "rounded-ss-md bg-white text-ink",
                        line.location ? "p-1.5" : "px-3.5 py-2"
                      )}
                    >
                      {line.location ? (
                        <>
                          {/* A shared position, the way the chat shows it. */}
                          <span className="relative block h-20 w-44 overflow-hidden rounded-xl bg-tint">
                            <svg viewBox="0 0 176 80" className="size-full">
                              <path d="M-4 30L180 18M-4 62L180 52M40 -4L30 84M108 -4L112 84" stroke="#fff" strokeWidth="8" />
                              <circle cx="88" cy="42" r="15" fill="#1278AD" opacity="0.25" />
                              <path d="M88 44C82 36 78 31 78 25A10 10 0 1 1 98 25C98 31 94 36 88 44Z" fill="#183660" />
                              <circle cx="88" cy="25" r="3.5" fill="#fff" />
                            </svg>
                          </span>
                          <span className="flex items-center gap-1.5 px-2 pb-0.5 pt-1.5 text-sm font-medium">
                            <AppIcon name="MapPin" className="size-4" />
                            <span className="flex-1">{t(line.text)}</span>
                            <CheckCheck className="size-3.5 text-white/75" strokeWidth={2.25} />
                          </span>
                        </>
                      ) : (
                        <span className="flex items-end gap-2">
                          <span className="grid min-w-0 flex-1">
                            <span data-full className="[grid-area:1/1]">
                              {t(line.text)}
                            </span>
                            <span data-typed className="[grid-area:1/1]" />
                          </span>
                          {mine && <CheckCheck className="mb-0.5 size-3.5 shrink-0 text-white/75" strokeWidth={2.25} />}
                        </span>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* The same story in words, for assistive technology. */}
          <figcaption className="sr-only">
            <ol aria-label={t("story_label")}>
              {BEATS.map((item) => (
                <li key={item.t}>
                  {t(item.t)}. {t(item.d)}
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
