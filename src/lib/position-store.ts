"use client";

import { useSyncExternalStore } from "react";

// The visitor's position, as a map link, once they have chosen to share it.
// It lives in memory and in sessionStorage only (never sent to a server), and
// every WhatsApp button on the site adds it to its message. WhatsApp links can
// only carry text, so a map link is how a position travels with the message.

const KEY = "medcare-position";
const listeners = new Set<() => void>();
let position = "";

if (typeof window !== "undefined") {
  try {
    position = window.sessionStorage.getItem(KEY) ?? "";
  } catch {
    // Storage blocked: the position simply lasts for this page.
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function setSharedPosition(next: string) {
  position = next;
  try {
    if (next) window.sessionStorage.setItem(KEY, next);
    else window.sessionStorage.removeItem(KEY);
  } catch {
    // See above.
  }
  listeners.forEach((listener) => listener());
}

/** The shared map link, or an empty string when the visitor has not shared one. */
export function useSharedPosition(): string {
  return useSyncExternalStore(
    subscribe,
    () => position,
    () => ""
  );
}
