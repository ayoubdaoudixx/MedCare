import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  slug: string;
  name: string;
};

export function ServiceChip({ slug, name }: Props) {
  return (
    <Link
      href={`/services/${slug}`}
      className="inline-flex items-center justify-between gap-3 mt-2 w-full bg-tint border border-brand/20 text-brand-dark rounded-xl px-3 py-2.5 hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 group"
    >
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-muted-text group-hover:text-white/70 transition-colors">
          Service recommandé
        </span>
        <span className="text-sm font-semibold truncate">{name}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 text-xs font-semibold">
        <span>Voir</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
