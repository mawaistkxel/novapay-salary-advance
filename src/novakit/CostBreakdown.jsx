/**
 * CostBreakdown — NovaKit Lite (added for the salary advance)
 * A labelled list of money facts: what you get, what it costs, what you repay, when.
 * ListRow is a transaction row (icon, truncating text), so it wasn't the right base.
 *
 * Rule this component enforces: money facts are never fine print. Every label and
 * value is text-body (15px) at neutral-700/900; hints are body size too.
 * The emphasised row (the total) gets a divider and title size.
 *
 * Props
 *   items  [{ label, value (node), hint?, emphasis? }]
 *
 * Renders a <dl>, so label/value pairs are read together by screen readers.
 * Tokens: neutral-700 (labels, 8.45:1), neutral-900 (values), neutral-200 (divider).
 */
export default function CostBreakdown({ items }) {
  return (
    <dl className="divide-y divide-neutral-200">
      {items.map((item) => (
        <div
          key={item.label}
          className={
            "flex items-baseline justify-between gap-4 " +
            (item.emphasis ? "pt-3 mt-1" : "py-2.5 first:pt-0")
          }
        >
          <dt className="min-w-0">
            <span
              className={
                item.emphasis
                  ? "text-body font-semibold text-neutral-900"
                  : "text-body text-neutral-700"
              }
            >
              {item.label}
            </span>
            {item.hint ? (
              <span className="block text-body text-neutral-700">{item.hint}</span>
            ) : null}
          </dt>
          <dd
            className={
              "shrink-0 text-right text-neutral-900 " +
              (item.emphasis ? "text-title" : "text-body font-semibold")
            }
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
