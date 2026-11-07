/**
 * Avatar — NovaKit Hi-Fi
 * Initials on a glass disc with a thin light ring. No stock photo, no generic
 * silhouette. Decorative next to the visible name, so hidden from screen readers.
 */
export default function Avatar({ initials }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-white/30 to-white/10 text-[15px] font-semibold tracking-tight text-white shadow-hf-glass ring-2 ring-white/25"
    >
      {initials}
    </span>
  );
}
