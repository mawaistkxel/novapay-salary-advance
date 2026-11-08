import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./hifi";
import { PAYDAY } from "./data/scenarios";

const fmt = new Intl.NumberFormat("en-PK");

/**
 * The payday reminder, as the phone would show it: a system notification
 * banner over the top of the screen, not in-app UI. Prototype-only (it stands
 * in for the OS), so it lives outside src/novakit/ and src/hifi/, like
 * DemoSwitcher. High fidelity only (the wireframe is unchanged). Sent from the
 * demo panel, and only once an advance exists.
 *
 * Copy: the amount and the date ("say the number"), but not the words
 * "advance" or "loan". A notification can show on a lock screen, and in this
 * market borrowers have been shamed publicly, so the banner doesn't name the
 * debt. No reminder timing ("in 3 days"), late fee or consequence is stated:
 * none is defined. Tapping it opens Home, where the advance card has the rest.
 *
 * Always-mounted role="status" region, so it's announced when it appears.
 */
export default function PhoneNotification({ open, total, onOpen }) {
  const text = `Rs ${fmt.format(total || 0)} will be taken from your wallet on ${PAYDAY}, your payday.`;

  return (
    <div role="status" aria-live="polite" className="hf-overlay-top pointer-events-none absolute inset-x-2 top-2 z-40">
      <AnimatePresence>
        {open ? (
          <motion.button
            key="reminder"
            type="button"
            onClick={onOpen}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            aria-label={`Notification from NovaPay: ${text} Open NovaPay.`}
            className="hf-glass-strong pointer-events-auto flex w-full items-start gap-3 rounded-hf-md p-3 text-left shadow-hf-float"
          >
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-white ring-1 ring-inset ring-hf-ink-300">
              <Logo showWord={false} className="scale-[0.8]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2 text-hf-small text-hf-ink-700">
                <span className="font-medium text-hf-ink-900">NovaPay</span>
                <span>now</span>
              </span>
              <span className="mt-0.5 block text-hf-body text-hf-ink-900">{text}</span>
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
