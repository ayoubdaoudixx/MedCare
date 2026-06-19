import { APP_ICONS, type AppIconName } from "@/lib/app-icons-data";

// Renders a Solar bold-duotone icon from local data. The duotone tones both use
// currentColor (one at reduced opacity), so a single `text-*` class tints them.
// Size is controlled by `className` (e.g. `w-6 h-6`).
export function AppIcon({
  name,
  className,
}: {
  name: AppIconName | (string & {});
  className?: string;
}) {
  const icon = APP_ICONS[name as AppIconName] ?? APP_ICONS.Stethoscope;
  return (
    <svg
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      className={className}
      fill="none"
      role="img"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
