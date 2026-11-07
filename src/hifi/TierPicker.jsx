import { motion } from "framer-motion";
import { LockSimple } from "@phosphor-icons/react";
import Money from "./Money";

/**
 * TierPicker — NovaKit Hi-Fi
 * Same contract as NovaKit's TierPicker: native radios in a fieldset, nothing
 * preselected, locked tiers visible with a plain reason.
 *
 * Options are glass rows. The selected state is one shared element (layoutId):
 * a brighter glass slab with a navy rim that glides to the chosen row. The radio
 * fills with liquid navy. Locked = flat, faded, lock in place of the radio, and
 * an "Above your limit" tag. It isn't an error, so it isn't red.
 * Focus is an outline outside the row, so it never looks like selection.
 */
export default function TierPicker({ label, name, options, value, onChange }) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 text-hf-h2 font-normal text-hf-ink-900">{label}</legend>
      {options.map((opt) => {
        const id = `hf-${name}-${opt.amount}`;
        const selected = value === opt.amount;
        return (
          <label
            key={opt.amount}
            htmlFor={id}
            className={
              "relative flex items-center gap-4 rounded-hf-md px-4 py-4 transition-colors " +
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hf-navy-600 " +
              (opt.locked ? "cursor-not-allowed bg-hf-mist/70 ring-1 ring-inset ring-hf-line" : "hf-glass cursor-pointer")
            }
          >
            {selected ? (
              <motion.span
                layoutId={`${name}-highlight`}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                aria-hidden="true"
                className="hf-glass-strong absolute inset-0 rounded-hf-md ring-[1.5px] ring-inset ring-hf-navy-600"
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
              className="sr-only"
            />

            <span
              aria-hidden="true"
              className={
                "relative grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors " +
                (opt.locked
                  ? "text-hf-ink-700"
                  : selected
                    ? "hf-liquid"
                    : "border-[1.5px] border-hf-ink-500 bg-white/70")
              }
            >
              {opt.locked ? (
                <LockSimple size={18} />
              ) : selected ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 600, damping: 26 }}
                  className="h-2 w-2 rounded-full bg-white"
                />
              ) : null}
            </span>

            <span className="relative min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <Money amount={opt.amount} size="h2" className={opt.locked ? "text-hf-ink-700" : "text-hf-ink-900"} />
                {opt.locked ? (
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-hf-small text-hf-ink-700 ring-1 ring-inset ring-hf-line">
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
