import { Children, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import StatusBar from "./StatusBar";
import TopBar from "./TopBar";

const spring = { type: "spring", stiffness: 260, damping: 30 };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};
export const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: spring },
};

/**
 * Atmosphere — two soft light sources behind the glass, so the frosting has
 * something to frost. Decorative and pointer-events-none. Text never sits on
 * them without a glass fill (ink-700 on navy-100, the deepest tint, is 5.75:1).
 */
export function Atmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
      <div className="absolute -left-28 top-1/3 h-72 w-72 rounded-full bg-hf-navy-100 opacity-70 blur-3xl" />
      <div className="absolute -bottom-24 right-[-60px] h-64 w-64 rounded-full bg-hf-navy-100 opacity-60 blur-3xl" />
    </div>
  );
}

/**
 * Screen — NovaKit Hi-Fi layout for flow screens.
 * Mist page, atmosphere, status bar, glass back button, then an optional icon,
 * the heading (focused on mount, like the wireframe), an optional lead, and the
 * content, which reveals in a short stagger (off under reduced motion).
 *
 * `feature` puts the heading and lead inside a glass card, for screens whose
 * headline is a number (Choose amount).
 *
 * `center` centres the icon and heading block (Decline, where an illustration
 * leads); the content below stays left-aligned for reading.
 *
 * `footer` pins its content to the bottom of the screen, outside the scroll,
 * with a short fade so content slides under it. Used for "See full cost" and for
 * Terms (Accept + "Not now"). On Terms the consent box must stay in the scroll,
 * below the costs: that's what makes a pinned Accept safe.
 */
export default function Screen({ title, onBack, heading, lead, icon, feature = false, center = false, footer, children }) {
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const head = (
    <>
      {icon ? <div className={center ? "mb-4 flex justify-center" : "mb-4"}>{icon}</div> : null}
      <h2 ref={headingRef} tabIndex={-1} className="text-hf-h1 text-hf-ink-900 outline-none">
        {heading}
      </h2>
      {/* A string lead is a paragraph; a node (e.g. a FactStrip) gets its own block. */}
      {typeof lead === "string" ? (
        <p className="mt-3 text-hf-body text-hf-ink-700">{lead}</p>
      ) : lead ? (
        <div className="mt-4">{lead}</div>
      ) : null}
    </>
  );

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-hf-page">
      <Atmosphere />
      <StatusBar tone="dark" className="relative" />
      <TopBar title={title} onBack={onBack} />
      <main className={`relative flex-1 overflow-y-auto px-5 pt-3 ${footer ? "pb-4" : "pb-10"}`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className={(feature ? "hf-glass mb-6 rounded-hf-lg p-5" : "mb-7") + (center ? " text-center" : "")}
        >
          {head}
        </motion.div>
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
          {/* toArray keeps each child's original position in its key, so a Notice
              appearing mid-list doesn't remount (and re-animate) what follows. */}
          {Children.toArray(children).map((child, i) => (
            <motion.div key={child.key ?? i} variants={item}>
              {child}
            </motion.div>
          ))}
        </motion.div>
      </main>
      {footer ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="relative shrink-0 bg-hf-page px-5 pb-6 pt-2"
        >
          {/* Fade above the bar so scrolling content slips under it (decorative). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-hf-page to-hf-page/0"
          />
          {footer}
        </motion.div>
      ) : null}
    </div>
  );
}
