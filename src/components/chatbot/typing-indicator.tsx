import { MessageCircle } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3" role="status">
      <div
        className="grid size-7 place-items-center rounded-full bg-tint-2 text-brand-dark flex-shrink-0"
        aria-hidden="true"
      >
        <MessageCircle className="size-3.5" />
      </div>
      <div className="bg-white rounded-2xl rounded-es-sm px-4 py-3.5 ring-1 ring-line flex items-center gap-1.5">
        <span className="sr-only">Yasmine écrit une réponse</span>
        <span
          className="size-2 rounded-full bg-brand-light block"
          style={{ animation: "dot-bounce 1.2s ease-in-out 0s infinite" }}
          aria-hidden="true"
        />
        <span
          className="size-2 rounded-full bg-brand-light block"
          style={{ animation: "dot-bounce 1.2s ease-in-out 0.2s infinite" }}
          aria-hidden="true"
        />
        <span
          className="size-2 rounded-full bg-brand-light block"
          style={{ animation: "dot-bounce 1.2s ease-in-out 0.4s infinite" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
