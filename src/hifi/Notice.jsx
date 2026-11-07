import { motion } from "framer-motion";
import { Info, WarningCircle } from "@phosphor-icons/react";

/**
 * Notice — NovaKit Hi-Fi
 * Inline must-read message. info = blue-50 / blue-700 title; caution = amber-50 /
 * amber-700 title (5.79:1). Body text is always ink-900. Amber means "read this",
 * never "buy this". `alert` adds role="alert" for messages after a failed action.
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
        (caution ? "bg-hf-amber-50 ring-hf-amber-100" : "bg-hf-blue-50 ring-hf-blue-100")
      }
    >
      <Icon
        aria-hidden="true"
        size={22}
        weight="fill"
        className={"mt-px shrink-0 " + (caution ? "text-hf-amber-700" : "text-hf-blue-700")}
      />
      <div className="min-w-0 space-y-1">
        {title ? (
          <p className={"text-hf-body font-semibold " + (caution ? "text-hf-amber-700" : "text-hf-blue-700")}>
            {title}
          </p>
        ) : null}
        <div className="text-hf-body text-hf-ink-900">{children}</div>
      </div>
    </motion.div>
  );
}
