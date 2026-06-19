"use client";

/**
 * AuroraBackground — soft, slowly drifting medical-blue light blooms behind a
 * section. Purely decorative: it sits in an absolutely-positioned layer, is
 * aria-hidden, and respects prefers-reduced-motion (handled in globals.css).
 *
 * Use inside a `relative overflow-hidden` parent, before the foreground content.
 */
export function AuroraBackground({
  variant = "light",
  grid = true,
  className = "",
}: {
  variant?: "light" | "dark";
  grid?: boolean;
  className?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* Grid / dot texture */}
      {grid && (
        <div
          className={`absolute inset-0 mask-fade ${isDark ? "bg-grid-light" : "bg-grid"}`}
        />
      )}

      {/* Aurora blooms */}
      <div
        className="absolute -top-24 -start-24 h-[420px] w-[420px] rounded-full blur-3xl animate-aurora"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 50%, rgba(61,163,205,0.28), transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(16,128,176,0.20), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -end-24 h-[460px] w-[460px] rounded-full blur-3xl animate-aurora-slow"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 50%, rgba(8,68,94,0.45), transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(154,208,230,0.35), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-28 start-1/4 h-[380px] w-[380px] rounded-full blur-3xl animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(230,58,75,0.12), transparent 70%)",
        }}
      />
    </div>
  );
}
