import { motion } from "framer-motion";
import { House, ArrowsLeftRight, ClockCounterClockwise, ChatCircle } from "@phosphor-icons/react";

const TABS = [
  { key: "home", label: "Home", Icon: House },
  { key: "payments", label: "Payments", Icon: ArrowsLeftRight },
  { key: "history", label: "History", Icon: ClockCounterClockwise },
  { key: "support", label: "Support", Icon: ChatCircle },
];

/**
 * TabBar — NovaKit Hi-Fi
 * Floating frosted pill pinned to the bottom of the screen. Only Home exists in
 * this prototype; the other tabs call `onUnavailable` (a toast saying so) rather
 * than pretending to work.
 */
export default function TabBar({ active = "home", onUnavailable }) {
  return (
    <nav
      aria-label="Main"
      className="absolute inset-x-4 bottom-4 z-20 rounded-full bg-white/85 p-1.5 shadow-hf-float ring-1 ring-inset ring-white backdrop-blur-xl"
    >
      <ul className="grid grid-cols-4">
        {TABS.map(({ key, label, Icon }) => {
          const on = key === active;
          return (
            <li key={key}>
              <button
                type="button"
                aria-current={on ? "page" : undefined}
                onClick={on ? undefined : () => onUnavailable?.(label)}
                className={
                  "relative flex h-12 w-full flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-semibold leading-none transition-colors " +
                  (on ? "text-hf-blue-700" : "text-hf-ink-700 hover:text-hf-ink-900")
                }
              >
                {on ? (
                  <motion.span
                    layoutId="tab-active"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-hf-blue-50"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                ) : null}
                <Icon aria-hidden="true" size={20} weight={on ? "fill" : "regular"} className="relative" />
                <span className="relative">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
