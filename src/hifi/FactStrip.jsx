/**
 * FactStrip — NovaKit Hi-Fi
 * Up to three short facts side by side: a large value over a small label.
 * A <dl>: the label is the term and comes first for screen readers; visually
 * the value sits on top (flex-col-reverse). Values are top-aligned, so a label
 * that wraps to two lines doesn't push its value up.
 *
 * Props
 *   items  [{ value, label }]   e.g. { value: "3%", label: "one-time fee" }
 *   tone   light (on glass: ink values 13.9:1+, ink-700 labels ≥ 6.6:1)
 *          dark  (on navy: white values ≥ 8.3:1, navy-100 labels ≥ 6.4:1)
 */
export default function FactStrip({ items, tone = "light" }) {
  const dark = tone === "dark";
  return (
    <dl
      className={
        "grid grid-cols-3 divide-x rounded-hf-md ring-1 ring-inset " +
        (dark ? "divide-white/15 bg-white/10 ring-white/15" : "divide-hf-line bg-white/70 ring-hf-line")
      }
    >
      {items.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse justify-end gap-0.5 px-3 py-2.5">
          <dt className={"text-hf-small " + (dark ? "text-hf-navy-100" : "text-hf-ink-700")}>{label}</dt>
          <dd className={"text-[19px] leading-6 tracking-[-0.02em] " + (dark ? "text-white" : "text-hf-ink-900")}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
