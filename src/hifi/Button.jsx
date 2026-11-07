import { motion } from "framer-motion";

/**
 * Button — NovaKit Hi-Fi
 * Full-width pill. Same API as NovaKit's Button, plus a "glass" variant for use
 * on the blue hero.
 *
 * Primary and secondary are the same size, weight and type, so saying no never
 * looks weaker than saying yes: "Not now" is ink-900 on mist (17.0:1).
 *
 * Props
 *   variant  primary | secondary | glass
 *   size     md (48px) | lg (56px). Use lg for money decisions.
 *   loading  keeps the colour, shows a spinner, sets aria-busy, ignores clicks
 *   disabled, onClick, type, icon (leading element), children
 */
export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon = null,
  onClick,
  type = "button",
  className = "",
  children,
}) {
  const inactive = disabled || loading;
  const sizes = { md: "h-12 text-hf-body", lg: "h-14 text-[16px] leading-[22px]" };
  const variants = {
    primary: disabled
      ? "bg-hf-ink-300/70 text-hf-ink-700"
      : "bg-hf-blue-600 text-white shadow-hf-press hover:bg-hf-blue-700",
    secondary: disabled
      ? "bg-hf-mist text-hf-ink-500 border border-hf-line"
      : "bg-hf-mist text-hf-ink-900 border border-hf-ink-300 hover:bg-white",
    // white/10 keeps the label ≥ 4.63:1 anywhere on the hero (white/14 fails low down)
    glass: "bg-white/10 text-white shadow-hf-glass backdrop-blur-md hover:ring-1 hover:ring-inset hover:ring-white/50",
  };
  return (
    <motion.button
      type={type}
      onClick={inactive ? undefined : onClick}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      whileTap={inactive ? undefined : { scale: 0.98, y: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={
        "relative w-full inline-flex items-center justify-center gap-2 rounded-full px-6 font-semibold " +
        "transition-colors duration-200 select-none " +
        (disabled ? "cursor-not-allowed " : loading ? "cursor-progress " : "cursor-pointer ") +
        `${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`
      }
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"
        />
      ) : icon ? (
        <span aria-hidden="true" className="inline-flex">
          {icon}
        </span>
      ) : null}
      <span className="inline-flex items-baseline gap-1">{children}</span>
    </motion.button>
  );
}
