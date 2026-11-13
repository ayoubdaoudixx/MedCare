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
      className="inline-flex items-center justify-between gap-3 mt-2 w-full min-h-12 bg-tint text-brand-dark rounded-xl px-3.5 py-2 ring-1 ring-inset ring-tint-2 hover:bg-tint-2 hover:ring-brand transition-colors duration-150"
    >
      <span className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-muted-text">
          Service concerné
        </span>
        <span className="text-sm font-semibold truncate">{name}</span>
      </span>
      <span className="flex items-center gap-1 flex-shrink-0 text-sm font-semibold">
        Voir
        <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
      </span>
    </Link>
  );
}
