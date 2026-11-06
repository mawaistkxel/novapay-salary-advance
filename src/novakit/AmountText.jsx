/**
 * AmountText — NovaKit Lite
 * Formats an integer PKR amount, e.g. 10000 -> "Rs 10,000".
 *
 * Changed in the salary-advance work: added tone. The colour used to be fixed
 * to neutral-900, so an amount couldn't sit inside a button label or a coloured
 * Notice title without !important overrides.
 *   tone "default" -> neutral-900 · "inherit" -> takes the parent's colour
 */
export default function AmountText({ amount, size = "title", tone = "default", className = "" }) {
  const sizes = {
    display: "text-display",
    title: "text-title",
    body: "text-body",
  };
  const tones = {
    default: "text-neutral-900",
    inherit: "",
  };
  const formatted = new Intl.NumberFormat("en-PK").format(amount ?? 0);
  return (
    <span className={`${sizes[size] || sizes.title} ${tones[tone] ?? tones.default} ${className}`}>
      Rs {formatted}
    </span>
  );
}
