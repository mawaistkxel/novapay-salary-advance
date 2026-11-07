import { motion } from "framer-motion";
import { LockSimple } from "@phosphor-icons/react";
import Money from "./Money";

/**
 * TierPicker — NovaKit Hi-Fi
 * Same contract as NovaKit's TierPicker (native radios in a fieldset, nothing
 * preselected, locked tiers visible with a plain reason), restyled as tiles.
 *
 * The selected highlight is one shared element (layoutId) that glides between
 * tiles, so the eye follows the choice. Locked = frosted, lock icon, "Above your
 * limit" badge. It isn't an error: nothing to scold, because nothing went wrong.
 */
export default function TierPicker({ label, name, options, value, onChange }) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 text-hf-h2 text-hf-ink-900">{label}</legend>
      {options.map((opt) => {
        const id = `hf-${name}-${opt.amount}`;
        const selected = value === opt.amount;
        return (
          <label
            key={opt.amount}
            htmlFor={id}
            className={
              "relative flex items-center gap-4 rounded-hf-md p-4 transition-colors " +
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hf-blue-600 " +
              (opt.locked
                ? "cursor-not-allowed bg-hf-mist"
                : "cursor-pointer bg-white ring-1 ring-inset ring-hf-line hover:ring-hf-ink-300")
            }
          >
            {selected ? (
              <motion.span
                layoutId={`${name}-highlight`}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                aria-hidden="true"
                className="absolute inset-0 rounded-hf-md bg-hf-blue-50 ring-2 ring-inset ring-hf-blue-600"
              />
            ) : null}

            <input
              id={id}
              type="radio"
              name={name}
              value={opt.amount}
              checked={selected}
              disabled={opt.locked}
              onChange={() => onChange(opt.amount)}
              aria-describedby={`${id}-desc`}
              className="peer sr-only"
            />

            <span
              aria-hidden="true"
              className={
                "relative grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors " +
                (opt.locked
                  ? "border-hf-ink-300 bg-white"
                  : selected
                    ? "border-hf-blue-600 bg-hf-blue-600"
                    : "border-hf-ink-500 bg-white")
              }
            >
              {opt.locked ? (
                <LockSimple size={12} weight="bold" className="text-hf-ink-500" />
              ) : selected ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 600, damping: 26 }}
                  className="h-2.5 w-2.5 rounded-full bg-white"
                />
              ) : null}
            </span>

            <span className="relative min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <Money
                  amount={opt.amount}
                  size="h2"
                  className={opt.locked ? "text-hf-ink-700" : "text-hf-ink-900"}
                />
                {opt.locked ? (
                  <span className="rounded-full bg-white px-2.5 py-1 text-hf-small text-hf-ink-700 ring-1 ring-inset ring-hf-line">
                    Above your limit
                  </span>
                ) : null}
              </span>
              <span id={`${id}-desc`} className="mt-1 block text-hf-body text-hf-ink-700">
                {opt.locked ? opt.lockedReason : opt.detail}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
