import { Stethoscope } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white flex-shrink-0">
        <Stethoscope className="w-3.5 h-3.5" />
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft border border-line flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full bg-brand-light block"
          style={{ animation: "dot-bounce 1.2s ease-in-out 0s infinite" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-brand-light block"
          style={{ animation: "dot-bounce 1.2s ease-in-out 0.2s infinite" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-brand-light block"
          style={{ animation: "dot-bounce 1.2s ease-in-out 0.4s infinite" }}
        />
      </div>
    </div>
  );
}
