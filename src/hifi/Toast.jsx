import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info } from "@phosphor-icons/react";

/**
 * Toast — NovaKit Hi-Fi ("island")
 * A navy pill that drops from under the status bar, like a dynamic island.
 * Same contract as NovaKit's Toast: an always-mounted role="status" region, so
 * screen readers announce it; transient confirmations only.
 *
 * icon: "check" (default) | null → info glyph for neutral messages.
 */
export default function Toast({ open, message, icon = "check" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute inset-x-3 top-12 z-30 flex justify-center"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: -18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="flex max-w-full items-start gap-2.5 rounded-[22px] bg-hf-navy-900 px-4 py-3 text-hf-body text-white shadow-hf-float"
          >
            {icon ? (
              <CheckCircle aria-hidden="true" size={20} weight="fill" className="mt-px shrink-0 text-hf-green-400" />
            ) : (
              <Info aria-hidden="true" size={20} weight="fill" className="mt-px shrink-0 text-hf-blue-100" />
            )}
            <span>{message}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
