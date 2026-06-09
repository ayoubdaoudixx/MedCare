const QUICK_REPLIES = [
  { emoji: "🚑", text: "Ambulance d'urgence" },
  { emoji: "👨‍⚕️", text: "Médecin à domicile" },
  { emoji: "💊", text: "Conseil médical" },
  { emoji: "📋", text: "Prendre rendez-vous" },
  { emoji: "💰", text: "Tarifs & services" },
];

type Props = {
  onSelect: (text: string) => void;
};

export function QuickReplies({ onSelect }: Props) {
  return (
    <div className="px-4 pb-3">
      <p className="text-xs text-muted-text mb-2 font-medium">
        Questions fréquentes
      </p>
      <div className="flex flex-wrap gap-2">
        {QUICK_REPLIES.map(({ emoji, text }) => (
          <button
            key={text}
            onClick={() => onSelect(`${emoji} ${text}`)}
            className="inline-flex items-center gap-1.5 text-sm bg-tint border border-line text-brand-dark font-medium px-3 py-1.5 rounded-full hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 cursor-pointer"
          >
            <span>{emoji}</span>
            <span>{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
