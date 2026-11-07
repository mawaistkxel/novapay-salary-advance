import { motion } from "framer-motion";

/**
 * Tile — NovaKit Hi-Fi surface (the one container; Lite has Card and Panel).
 * tone "glass"  frosted card on the mist page (default)
 *      "strong" denser glass: anything floating, or sitting over the Home haze
 *      "solid"  opaque mist, for nesting inside glass
 * Radius: cards hf-lg (28px), rows and options hf-md (20px), controls pill.
 */
export default function Tile({ tone = "glass", as: Tag = "div", className = "", children, ...rest }) {
  const tones = {
    glass: "hf-glass rounded-hf-lg",
    strong: "hf-glass-strong rounded-hf-lg",
    solid: "bg-hf-mist rounded-hf-md",
    // The one emphasised surface on a screen (Home's offer). White text only.
    navy: "hf-liquid-deep hf-grain hf-grain-light hf-on-dark relative isolate overflow-hidden rounded-hf-lg text-white",
  };
  return (
    <Tag className={`p-4 ${tones[tone] || tones.glass} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * IconBadge — round icon chip.
 * glass: white glass circle, navy line icon (rows, headers)
 * navy:  liquid navy circle, white icon (the one emphasised badge per screen)
 * amber / green: semantic only.
 */
export function IconBadge({ children, tone = "glass", size = "md" }) {
  const tones = {
    glass: "hf-glass-strong text-hf-navy-700",
    navy: "hf-liquid text-white",
    amber: "bg-hf-amber-50 text-hf-amber-700",
    green: "bg-hf-green-50 text-hf-green-600",
  };
  const sizes = { sm: "h-10 w-10", md: "h-12 w-12", lg: "h-14 w-14" };
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full ${sizes[size]} ${tones[tone] || tones.glass}`}
    >
      {children}
    </span>
  );
}

/**
 * RoundButton — 44px glass (or liquid navy) icon button with an accessible name.
 */
export function RoundButton({ label, onClick, tone = "glass", pressed, size = "md", children }) {
  const tones = {
    glass: "hf-glass-strong text-hf-ink-900",
    navy: "hf-liquid text-white",
  };
  const sizes = { md: "h-11 w-11", lg: "h-14 w-14" };
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={`grid shrink-0 place-items-center rounded-full ${sizes[size]} ${tones[tone] || tones.glass}`}
    >
      {children}
    </motion.button>
  );
}
