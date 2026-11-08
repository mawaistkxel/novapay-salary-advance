import { motion } from "framer-motion";
import { ArrowCounterClockwise, BellSimple } from "@phosphor-icons/react";

/**
 * Demo scenario switcher. Prototype-only: it sits outside the phone frame so
 * it can't be mistaken for product UI. Changing the scenario restarts at Home.
 * Not part of NovaKit, so it lives outside src/novakit/.
 *
 * `hifi` styles it like the high-fidelity app (glass card, liquid-navy radios
 * matching the amount tiles, a glass restart pill); otherwise it's the plain
 * dashed wireframe panel. Native radios in a fieldset either way.
 *
 * "Send payment reminder" (high fidelity only) shows the payday reminder as a
 * phone notification. It's disabled until an advance has been taken, with a
 * line saying why. The wireframe panel is unchanged.
 */
const REMINDER_HINT_ID = "reminder-hint";

function reminderHint(enabled) {
  return enabled ? "Shows it as a phone notification." : "Available once an advance has been taken.";
}

export default function DemoSwitcher({
  scenarios,
  value,
  onChange,
  onReset,
  canSendReminder = false,
  onSendReminder,
  hifi = false,
}) {
  if (!hifi) {
    return (
      <aside
        aria-label="Prototype controls"
        className="w-full rounded-md border border-dashed border-neutral-500 bg-neutral-50 p-4 space-y-3"
      >
        <fieldset className="space-y-1">
          <legend className="text-body font-semibold text-neutral-900 mb-1">Demo scenario</legend>
          {Object.entries(scenarios).map(([key, sc]) => (
            <label key={key} className="flex items-start gap-2 py-1 cursor-pointer text-body text-neutral-900">
              <input
                type="radio"
                name="scenario"
                value={key}
                checked={value === key}
                onChange={() => onChange(key)}
                className="mt-1 accent-brand"
              />
              <span>{sc.label}</span>
            </label>
          ))}
        </fieldset>
        <button
          type="button"
          onClick={onReset}
          className="text-body font-semibold text-brand underline underline-offset-2"
        >
          Restart this scenario
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Prototype controls" className="hf-glass w-full space-y-3 rounded-hf-lg p-3">
      <fieldset className="space-y-1.5">
        <legend className="mb-2 px-2 pt-1 text-hf-body font-medium text-hf-ink-900">Demo scenario</legend>
        {Object.entries(scenarios).map(([key, sc]) => {
          const on = value === key;
          return (
            <label
              key={key}
              className={
                "relative flex cursor-pointer items-center gap-3 rounded-hf-md px-3 py-2.5 text-hf-body text-hf-ink-900 transition-colors " +
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hf-navy-600 " +
                (on ? "" : "hover:bg-white/50")
              }
            >
              {on ? (
                <motion.span
                  layoutId="scenario-highlight"
                  aria-hidden="true"
                  className="hf-glass-strong absolute inset-0 rounded-hf-md ring-1 ring-inset ring-hf-navy-600/20"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              ) : null}
              <input
                type="radio"
                name="scenario"
                value={key}
                checked={on}
                onChange={() => onChange(key)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={
                  "relative grid h-5 w-5 shrink-0 place-items-center rounded-full " +
                  (on ? "hf-liquid" : "border-[1.5px] border-hf-ink-500 bg-white/70")
                }
              >
                {on ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
              </span>
              <span className="relative">{sc.label}</span>
            </label>
          );
        })}
      </fieldset>
      <div className="space-y-1.5 px-1">
        <motion.button
          type="button"
          onClick={onSendReminder}
          disabled={!canSendReminder}
          aria-describedby={REMINDER_HINT_ID}
          whileTap={canSendReminder ? { scale: 0.97 } : undefined}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="hf-glass-strong inline-flex h-11 items-center gap-2 rounded-full px-4 text-hf-body font-medium text-hf-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BellSimple aria-hidden="true" size={18} weight="regular" />
          Send payment reminder
        </motion.button>
        <p id={REMINDER_HINT_ID} className="px-1 text-hf-small text-hf-ink-700">
          {reminderHint(canSendReminder)}
        </p>
      </div>
      <motion.button
        type="button"
        onClick={onReset}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="hf-glass-strong ml-1 inline-flex h-11 items-center gap-2 rounded-full px-4 text-hf-body font-medium text-hf-navy-700"
      >
        <ArrowCounterClockwise aria-hidden="true" size={18} weight="regular" />
        Restart this scenario
      </motion.button>
    </aside>
  );
}
