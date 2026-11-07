import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown, Info } from "@phosphor-icons/react";

/**
 * Disclosure — NovaKit Hi-Fi
 * A quiet "learn more" row that expands its explanation in place. A real
 * <button> with aria-expanded / aria-controls; the panel slides open with a
 * height + opacity spring (instant under reduced motion via MotionConfig).
 * For short, honest explainers that don't deserve their own screen.
 *
 * Props: title · children (the explanation) · defaultOpen
 */
export default function Disclosure({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-11 w-full items-center gap-2 rounded-full px-1 text-left text-hf-body font-medium text-hf-navy-700"
      >
        <Info aria-hidden="true" size={20} className="shrink-0" />
        <span className="flex-1">{title}</span>
        <motion.span aria-hidden="true" animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
          <CaretDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="overflow-hidden"
          >
            <div className="hf-glass mt-2 rounded-hf-md p-4 text-hf-body text-hf-ink-700">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
