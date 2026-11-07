import { motion } from "framer-motion";

/**
 * Checkbox — NovaKit Hi-Fi
 * The consent tile. Always starts unticked; the label is the full commitment.
 * A native checkbox (sr-only) carries the semantics. Ticked = brighter glass,
 * navy rim, liquid-navy box, and the tick strokes itself in.
 */
export default function Checkbox({ id, checked, onChange, children }) {
  return (
    <label
      htmlFor={id}
      className={
        "flex cursor-pointer items-start gap-3 rounded-hf-md p-4 transition-shadow " +
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hf-navy-600 " +
        (checked ? "hf-glass-strong ring-[1.5px] ring-inset ring-hf-navy-600" : "hf-glass")
      }
    >
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span
        aria-hidden="true"
        className={
          "mt-px grid h-6 w-6 shrink-0 place-items-center rounded-[7px] transition-colors " +
          (checked ? "hf-liquid" : "border-[1.5px] border-hf-ink-500 bg-white/70")
        }
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <motion.path
            d="M3 8.5l3.2 3L13 4.5"
            stroke="currentColor"
            className="text-white"
            strokeWidth="2"
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
