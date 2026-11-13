import { cn } from "@/lib/utils";

// The MedCare mark redrawn as vector strokes: a house with a stethoscope
// running inside it. Each stroke has `pathLength={1}` so the intro can draw it
// with a single dash offset. Outside the intro the classes have no effect and
// the mark renders complete.
export function LogoMark({ className }: { className?: string }) {
  const delay = (seconds: number, duration?: number) =>
    ({
      "--lm-delay": `${seconds}s`,
      ...(duration ? { "--lm-dur": `${duration}s` } : {}),
    }) as React.CSSProperties;

  return (
    <svg
      viewBox="0 0 780 880"
      fill="none"
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      {/* Roof */}
      <path
        className="lm-draw"
        style={delay(0.1, 0.5)}
        pathLength={1}
        d="M14 304 L352 70 Q390 46 428 70 L754 298"
        stroke="#1278AD"
        strokeWidth="34"
        strokeLinejoin="round"
      />
      <path
        className="lm-draw"
        style={delay(0.5, 0.2)}
        pathLength={1}
        d="M608 196 V104"
        stroke="#1278AD"
        strokeWidth="34"
      />
      {/* Heartbeat rings behind the chest piece */}
      <circle className="lm-beat" style={delay(1.3)} cx="492" cy="762" r="46" fill="#1278AD" />
      <circle className="lm-beat" style={delay(1.55)} cx="492" cy="762" r="46" fill="#1278AD" />
      {/* Walls: start at the chest piece, go round the house, end as the stem */}
      <path
        className="lm-draw"
        style={delay(0.25, 0.85)}
        pathLength={1}
        d="M548 762 H626 Q688 762 688 700 V326 L428 138 Q390 112 352 138 L82 326 V692 Q82 762 150 762 H330 Q386 762 386 708 V628"
        stroke="#183660"
        strokeWidth="32"
        strokeLinejoin="round"
      />
      {/* Stethoscope tube, drawn from the stem outwards to both ear tips */}
      <path
        className="lm-draw"
        style={delay(1.0, 0.35)}
        pathLength={1}
        d="M386 624 C322 624 246 522 246 412 Q246 340 306 336"
        stroke="#183660"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <path
        className="lm-draw"
        style={delay(1.0, 0.35)}
        pathLength={1}
        d="M386 624 C452 624 528 522 528 412 Q528 340 462 336"
        stroke="#183660"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <ellipse className="lm-pop" style={delay(1.3)} cx="334" cy="334" rx="32" ry="27" fill="#1278AD" />
      <ellipse className="lm-pop" style={delay(1.3)} cx="432" cy="334" rx="32" ry="27" fill="#1278AD" />
      {/* Chest piece */}
      <g className="lm-pop" style={delay(0)}>
        <circle cx="492" cy="762" r="46" fill="#fff" stroke="#1278AD" strokeWidth="24" />
        <circle cx="492" cy="762" r="17" fill="#183660" />
        <circle cx="492" cy="762" r="5" fill="#fff" />
      </g>
    </svg>
  );
}
