/**
 * Tile — NovaKit Hi-Fi surface container (the one surface; no Card/Panel split).
 * tone "white" floats on the page with a blue-tinted shadow; "mist" sits flat on
 * a white sheet. Radius hf-md (20px) like the moodboard's tiles.
 */
export default function Tile({ tone = "white", as: Tag = "div", className = "", children, ...rest }) {
  const tones = {
    white: "bg-white shadow-hf-soft",
    mist: "bg-hf-mist",
  };
  return (
    <Tag className={`rounded-hf-md p-4 ${tones[tone] || tones.white} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/** IconBadge — a round icon chip used in rows, tiles and screen headers. */
export function IconBadge({ children, tone = "blue", size = "md" }) {
  const tones = {
    blue: "bg-hf-blue-50 text-hf-blue-700",
    mist: "bg-hf-mist text-hf-ink-700",
    white: "bg-white text-hf-ink-700 shadow-hf-soft",
    amber: "bg-hf-amber-50 text-hf-amber-700",
    green: "bg-hf-green-50 text-hf-green-600",
  };
  const sizes = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-14 w-14" };
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full ${sizes[size]} ${tones[tone] || tones.blue}`}
    >
      {children}
    </span>
  );
}
