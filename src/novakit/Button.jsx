/**
 * Button — NovaKit Lite
 * Variants: primary | secondary
 * Sizes: md | lg
 * States: default, pressed (active), disabled, loading
 *
 * Changed in the salary-advance work:
 * - secondary text neutral-500 -> neutral-700 (3.95:1 -> 8.45:1). At 3.95:1 it failed
 *   WCAG AA and read as nearly disabled, which made "Not now" look weaker than "Accept".
 * - loading: keeps the button's colour, shows a spinner, sets aria-busy and ignores
 *   further clicks (prevents a double submit on money actions).
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors select-none w-full";

  const sizes = {
    md: "h-11 px-4 text-body",
    lg: "h-14 px-5 text-title",
  };

  const variants = {
    primary:
      "bg-brand text-white active:bg-brand-pressed disabled:bg-neutral-300 disabled:text-neutral-500",
    secondary:
      "bg-white text-neutral-700 border border-neutral-300 active:bg-neutral-100 disabled:text-neutral-300",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${loading ? "cursor-wait" : ""} ${className}`}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
        />
      ) : null}
      {children}
    </button>
  );
}
