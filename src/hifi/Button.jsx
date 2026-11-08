import { motion } from "framer-motion";

/**
 * Button — NovaKit Hi-Fi
 * Full-width pill. Same API as NovaKit's Button.
 *
 * primary   liquid navy (the one accent): glossy cap, inner rim, navy drop.
 * secondary white liquid glass with navy text. Same height, weight and type
 *           size as primary, so "Not now" never looks weaker (navy-700 on
 *           white glass ≥ 9.8:1).
 *
 * Props: variant primary | secondary · size md 48 | lg 56 · loading · disabled ·
 *        icon (leading) · onClick · type
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
    primary: disabled ? "bg-hf-ink-300/70 text-hf-ink-700" : "hf-liquid text-white hover:brightness-110",
    secondary: disabled ? "hf-glass text-hf-ink-500" : "hf-glass-strong text-hf-navy-700 hover:brightness-[1.02]",
    // On a navy surface: soft white glass with navy text (≥ 7.33:1).
    inverse: disabled ? "bg-white/40 text-hf-navy-700" : "hf-soft-white text-hf-navy-700 hover:brightness-[1.03]",
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
        "relative w-full inline-flex items-center justify-center gap-2 rounded-full px-6 font-medium tracking-[-0.01em] " +
        "transition-[filter,background-color] duration-200 select-none " +
        (disabled ? "cursor-not-allowed " : loading ? "cursor-progress " : "cursor-pointer ") +
        `${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`
      }
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-full border-[1.5px] border-current border-r-transparent animate-spin"
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
