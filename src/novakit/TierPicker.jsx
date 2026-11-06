import AmountText from "./AmountText.jsx";

/**
 * TierPicker — NovaKit Lite (added for the salary advance)
 * Choose one of a fixed set of amounts. Replaces a free-text amount field,
 * which allowed amounts that don't exist (e.g. 12,000).
 *
 * Built on native radio inputs, so arrow keys, focus and screen-reader
 * semantics come for free.
 *
 * Props
 *   label      string   group label (visible legend)
 *   name       string   radio group name
 *   options    [{ amount, detail?, locked?, lockedReason? }]
 *   value      number   selected amount
 *   onChange   (amount) => void
 *
 * States per option: default · selected · focused · locked.
 * "locked" = visible but not selectable, with a plain reason. It is not an error:
 * the user can't make the mistake, so there is nothing to scold.
 *
 * Tokens: brand / brand-50 (selected), neutral-500 (radio ring, 3.95:1 as a graphic),
 * neutral-50 / neutral-700 (locked), radius md.
 */
export default function TierPicker({ label, name, options, value, onChange }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-body font-semibold text-neutral-900 mb-2">{label}</legend>
      {options.map((opt) => {
        const id = `${name}-${opt.amount}`;
        const selected = value === opt.amount;
        return (
          <label
            key={opt.amount}
            htmlFor={id}
            className={
              "flex items-start gap-3 rounded-md border p-3 transition-colors " +
              (opt.locked
                ? "bg-neutral-50 border-neutral-200 cursor-not-allowed"
                : selected
                  ? "bg-brand-50 border-brand cursor-pointer"
                  : "bg-white border-neutral-300 cursor-pointer active:bg-neutral-100") +
              " has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2"
            }
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.amount}
              checked={selected}
              disabled={opt.locked}
              onChange={() => onChange(opt.amount)}
              aria-describedby={opt.detail || opt.lockedReason ? `${id}-desc` : undefined}
              className={
                "mt-1 h-5 w-5 shrink-0 appearance-none rounded-full border-2 bg-white " +
                "focus-visible:outline-none " +
                (opt.locked
                  ? "border-neutral-300"
                  : "border-neutral-500 checked:border-[6px] checked:border-brand")
              }
            />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <AmountText amount={opt.amount} size="title" />
                {opt.locked ? (
                  <span className="text-caption font-semibold text-neutral-700 bg-neutral-200 rounded-sm px-2 py-0.5">
                    Above your limit
                  </span>
                ) : null}
              </span>
              <span id={`${id}-desc`} className="block text-body text-neutral-700 mt-0.5">
                {opt.locked ? opt.lockedReason : opt.detail}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
