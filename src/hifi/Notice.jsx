import { motion } from "framer-motion";
import { Info, WarningCircle } from "@phosphor-icons/react";

/**
 * Notice — NovaKit Hi-Fi
 * Inline must-read message. info = navy-50 glass, navy-700 title (9.81:1);
 * caution = amber-50, amber-700 title (5.79:1). Body is always ink-900.
 * Amber means "read this", never "buy this". `alert` adds role="alert".
 */
export default function Notice({ tone = "info", title, alert = false, children }) {
  const caution = tone === "caution";
  const Icon = caution ? WarningCircle : Info;
  return (
    <motion.div
      role={alert ? "alert" : undefined}
      initial={alert ? { opacity: 0, y: -6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={
        "flex gap-3 rounded-hf-md p-4 ring-1 ring-inset " +
        (caution ? "bg-hf-amber-50 ring-hf-amber-100" : "bg-hf-navy-50/90 ring-hf-navy-100")
      }
    >
      <Icon aria-hidden="true" size={22} className={"mt-px shrink-0 " + (caution ? "text-hf-amber-700" : "text-hf-navy-600")} />
      <div className="min-w-0 space-y-1">
        {title ? (
          <p className={"text-hf-body font-medium " + (caution ? "text-hf-amber-700" : "text-hf-navy-700")}>{title}</p>
        ) : null}
        <div className="text-hf-body text-hf-ink-900">{children}</div>
      </div>
    </motion.div>
  );
}
