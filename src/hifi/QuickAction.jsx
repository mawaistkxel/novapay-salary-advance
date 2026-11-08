import { motion } from "framer-motion";

/**
 * QuickAction — NovaKit Hi-Fi
 * A round liquid-glass button (56px) with a thin navy line icon, label below in
 * ink-900 (≥ 8:1 even where the Home haze begins).
 */
export default function QuickAction({ icon, label, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="group flex flex-col items-center gap-2 rounded-hf-md py-1"
    >
      <span
        aria-hidden="true"
        className="hf-glass-strong grid h-14 w-14 place-items-center rounded-full text-hf-navy-700 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        {icon}
      </span>
      <span className="text-[13px] leading-tight text-hf-ink-900">{label}</span>
    </motion.button>
  );
}
