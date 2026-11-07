import Money from "./Money";
import { IconBadge } from "./Tile";

/**
 * TxRow — NovaKit Hi-Fi transaction row (the hi-fi ListRow).
 * direction "in" | "out" | "advance". Money in is green with a plus; money out is
 * ink with a minus. A salary advance is money in, but it's borrowed, so it's
 * shown in ink, not in "good news" green, and its subtitle says when it's repaid.
 * Subtitle is metadata (13px ink-700, 8.91:1), never a money fact.
 */
export default function TxRow({ icon, title, subtitle, amount, direction = "out" }) {
  const sign = direction === "out" ? "−" : "+";
  const color = direction === "in" ? "text-hf-green-600" : "text-hf-ink-900";
  return (
    <li className="flex items-center gap-3 py-3">
      <IconBadge tone="mist">{icon}</IconBadge>
      <div className="min-w-0 flex-1">
        <p className="truncate text-hf-body font-medium text-hf-ink-900">{title}</p>
        <p className="text-hf-small text-hf-ink-700">{subtitle}</p>
      </div>
      <span className={`shrink-0 text-hf-body font-semibold ${color}`}>
        <span aria-hidden="true">{sign}</span>
        <span className="sr-only">{direction === "out" ? "minus " : "plus "}</span>
        <Money amount={amount} />
      </span>
    </li>
  );
}
