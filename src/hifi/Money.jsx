import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

const fmt = new Intl.NumberFormat("en-PK");

/**
 * Money — NovaKit Hi-Fi
 * "Rs 10,300": light, large figures with the currency set smaller and softer,
 * the way the reference sets cents. Tabular figures so amounts don't jitter.
 *
 * When `amount` changes after mount the figure rolls to the new value (never on
 * first render: counting up from zero would turn a balance into a show). Screen
 * readers get the final value only.
 *
 * Props
 *   amount   integer PKR
 *   size     hero (42 light) | h1 (26) | h2 (18) | body (15)
 *   weight   for size "body": medium (default) | normal (inside running text)
 *   className  colour overrides (inherits colour by default)
 */
export default function Money({ amount = 0, size = "body", weight = "medium", className = "" }) {
  const reduce = useReducedMotion();
  const value = useMotionValue(amount);
  const text = useTransform(value, (v) => fmt.format(Math.round(v)));
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      value.set(amount);
      return undefined;
    }
    if (reduce) {
      value.set(amount);
      return undefined;
    }
    const controls = animate(value, amount, { type: "spring", stiffness: 120, damping: 22 });
    return () => controls.stop();
  }, [amount, reduce, value]);

  const sizes = {
    hero: ["text-hf-hero", "text-[20px] font-normal mr-2 opacity-70"],
    h1: ["text-hf-h1", "text-[17px] font-normal mr-1.5 opacity-70"],
    h2: ["text-hf-h2", "text-[15px] font-normal mr-1 opacity-70"],
    body: [`text-hf-body ${weight === "normal" ? "font-normal" : "font-medium"}`, "mr-[0.25em]"],
  };
  const [figure, currency] = sizes[size] || sizes.body;

  return (
    <span className={`inline-flex items-baseline whitespace-nowrap tabular-nums ${className}`}>
      <span className="sr-only">Rs {fmt.format(amount)}</span>
      <span aria-hidden="true" className={currency}>
        Rs
      </span>
      <motion.span aria-hidden="true" className={figure}>
        {text}
      </motion.span>
    </span>
  );
}
