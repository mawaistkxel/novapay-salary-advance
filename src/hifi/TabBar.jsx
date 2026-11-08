import { motion } from "framer-motion";
import { House, Wallet, Plus, Cardholder, User } from "@phosphor-icons/react";

const LEFT = [
  { key: "home", label: "Home", Icon: House },
  { key: "wallet", label: "Wallet", Icon: Wallet },
];
const RIGHT = [
  { key: "cards", label: "Cards", Icon: Cardholder },
  { key: "profile", label: "Profile", Icon: User },
];

/**
 * TabBar — NovaKit Hi-Fi
 * Floating liquid-glass pill with a haloed liquid-navy centre button. Only Home
 * exists in this prototype; every other control calls `onUnavailable`, which
 * says so plainly instead of pretending to work.
 */
export default function TabBar({ active = "home", onUnavailable }) {
  const tab = ({ key, label, Icon }) => {
    const on = key === active;
    return (
      <li key={key}>
        <button
          type="button"
          aria-current={on ? "page" : undefined}
          onClick={on ? undefined : () => onUnavailable?.(label)}
          className={
            "relative flex h-14 w-full flex-col items-center justify-center gap-1 rounded-full text-[11px] leading-none transition-colors " +
            (on ? "font-medium text-hf-navy-700" : "text-hf-ink-700 hover:text-hf-ink-900")
          }
        >
          {on ? (
            <motion.span
              layoutId="tab-active"
              aria-hidden="true"
              className="absolute inset-x-1 inset-y-1 rounded-full bg-hf-navy-50"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          ) : null}
          <Icon aria-hidden="true" size={22} weight={on ? "fill" : "light"} className="relative" />
          <span className="relative">{label}</span>
        </button>
      </li>
    );
  };

  return (
    <nav aria-label="Main" className="hf-glass-strong hf-tabbar absolute inset-x-4 bottom-4 z-20 rounded-full px-2 py-1.5">
      <ul className="grid grid-cols-5 items-center">
        {LEFT.map(tab)}
        <li className="grid place-items-center">
          <motion.button
            type="button"
            aria-label="Add money"
            onClick={() => onUnavailable?.("Add money")}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 500, damping: 26 }}
            className="hf-liquid hf-liquid-halo grid h-[52px] w-[52px] place-items-center rounded-full text-white"
          >
            <Plus size={24} />
          </motion.button>
        </li>
        {RIGHT.map(tab)}
      </ul>
    </nav>
  );
}
