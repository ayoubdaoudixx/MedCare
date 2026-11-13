import { MessageCircle } from "lucide-react";
import { ServiceChip } from "./service-chip";
import { services } from "@/lib/services-data";

type Props = {
  role: "user" | "assistant";
  content: string;
};

const PHONE_SPLIT_REGEX = /(\+212[\s-]?[\d\s-]{8,14}|\b0\d{9}\b)/g;
const PHONE_TEST_REGEX = /^(\+212[\s-]?[\d\s-]{8,14}|\b0\d{9}\b)$/;

// Renders text with phone numbers as tappable <a href="tel:"> links
function renderContent(text: string): React.ReactNode[] {
  const parts = text.split(PHONE_SPLIT_REGEX);

  return parts.map((part, i) => {
    if (PHONE_TEST_REGEX.test(part)) {
      const cleaned = part.replace(/[\s-]/g, "");
      return (
        <a
          key={i}
          href={`tel:${cleaned}`}
          className="num text-brand-dark underline underline-offset-2 font-semibold"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// Detect if a known service slug or name appears in the message text
function detectService(
  content: string
): { slug: string; name: string } | null {
  const lower = content.toLowerCase();
  for (const s of services) {
    if (
      lower.includes(s.slug) ||
      lower.includes(s.name.toLowerCase()) ||
      lower.includes(s.tagline.toLowerCase().slice(0, 20))
    ) {
      return { slug: s.slug, name: s.name };
    }
  }
  return null;
}

export function ChatMessage({ role, content }: Props) {
  if (role === "user") {
    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-[78%] bg-brand text-white rounded-2xl rounded-ee-sm px-4 py-2.5 text-[0.9375rem] leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </div>
      </div>
    );
  }

  const detectedService =
    content.length > 40 ? detectService(content) : null;

  return (
    <div className="flex items-end gap-2 mb-3">
      <div
        className="grid size-7 place-items-center rounded-full bg-tint-2 text-brand-dark flex-shrink-0"
        aria-hidden="true"
      >
        <MessageCircle className="size-3.5" />
      </div>
      <div className="max-w-[82%] flex flex-col gap-1.5">
        <div className="bg-white rounded-2xl rounded-es-sm px-4 py-2.5 ring-1 ring-line text-[0.9375rem] text-ink leading-relaxed whitespace-pre-wrap break-words">
          {renderContent(content)}
        </div>
        {detectedService && (
          <ServiceChip
            slug={detectedService.slug}
            name={detectedService.name}
          />
        )}
      </div>
    </div>
  );
}
