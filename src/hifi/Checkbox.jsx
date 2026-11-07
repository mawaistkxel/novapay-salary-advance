import { motion } from "framer-motion";

/**
 * Checkbox — NovaKit Hi-Fi
 * The consent tile. Always starts unticked; the label is the full commitment.
 * A native checkbox (sr-only) carries the semantics; the box is drawn, and the
 * tick strokes itself in when checked.
 */
export default function Checkbox({ id, checked, onChange, children }) {
  return (
    <label
      htmlFor={id}
      className={
        "flex cursor-pointer items-start gap-3 rounded-hf-md p-4 transition-colors " +
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hf-blue-600 " +
        (checked ? "bg-hf-blue-50 ring-2 ring-inset ring-hf-blue-600" : "bg-white ring-1 ring-inset ring-hf-ink-300")
      }
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={
          "mt-px grid h-6 w-6 shrink-0 place-items-center rounded-[7px] border-2 transition-colors " +
          (checked ? "border-hf-blue-600 bg-hf-blue-600" : "border-hf-ink-500 bg-white")
        }
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <motion.path
            d="M3 8.5l3.2 3L13 4.5"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </span>
      <span className="text-hf-body text-hf-ink-900">{children}</span>
    </label>
  );
}
