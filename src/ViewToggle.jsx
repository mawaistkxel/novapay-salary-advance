import { motion } from "framer-motion";

const VIEWS = [
  { key: "wire", label: "Wireframe" },
  { key: "hifi", label: "High fidelity" },
];

/**
 * View toggle. Prototype-only, outside the phone frame (like DemoSwitcher).
 * Switches the visual layer only: the screen you're on, the amount you chose
 * and your consent tick all stay, so the same moment can be compared in both.
 * Native radios, so arrow keys and screen readers work; the sliding thumb is
 * a shared layout element.
 *
 * Styled to match whichever view is showing: neutral in the wireframe; glass
 * track and a liquid-navy thumb in high fidelity.
 */
export default function ViewToggle({ value, onChange }) {
  const hifi = value === "hifi";
  return (
    <fieldset className="w-full">
      <legend
        className={
          "mb-2 uppercase tracking-wide " +
          (hifi ? "text-hf-small font-medium text-hf-ink-700" : "text-caption font-semibold text-neutral-700")
        }
      >
        View
      </legend>
      <div
        className={
          "grid grid-cols-2 rounded-full p-1 " +
          (hifi ? "hf-glass-strong" : "bg-white shadow-card ring-1 ring-inset ring-neutral-300")
        }
      >
        {VIEWS.map((v) => {
          const on = value === v.key;
          return (
            <label
              key={v.key}
              className={
                "relative flex cursor-pointer items-center justify-center rounded-full transition-colors " +
                (hifi
                  ? "h-11 text-hf-body font-medium has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hf-navy-600 "
                  : "h-10 text-body font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 ") +
                (on ? "text-white" : hifi ? "text-hf-ink-700 hover:text-hf-ink-900" : "text-neutral-700 hover:text-neutral-900")
              }
            >
              <input
                type="radio"
                name="view"
                value={v.key}
                checked={on}
                onChange={() => onChange(v.key)}
                className="sr-only"
              />
              {on ? (
                <motion.span
                  layoutId="view-thumb"
                  aria-hidden="true"
                  className={"absolute inset-0 rounded-full " + (hifi ? "hf-liquid" : "bg-neutral-900")}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative">{v.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
