import { Children, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import StatusBar from "./StatusBar";
import TopBar from "./TopBar";

const spring = { type: "spring", stiffness: 260, damping: 30 };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};
export const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: spring },
};

/**
 * HeroBackdrop — the moodboard's blue: deep cobalt with two soft glass planes and
 * a light bloom. Purely decorative and pointer-events-none.
 *
 * Contrast budget: one continuous blue-700 → blue-600 gradient, so plain white
 * text is ≥ 5.61:1 anywhere, and white on a 10% glass tile is ≥ 4.63:1 even at
 * the lightest bottom edge. The planes stay in the top ~170px so they never
 * stack under a glass tile (that would push labels below 4.5:1).
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-hf-blue-700 to-hf-blue-600" />
      <div className="absolute -right-16 -top-12 h-52 w-52 rounded-full bg-hf-blue-400/40 blur-3xl" />
      <div className="absolute -left-28 top-16 h-24 w-72 -rotate-[24deg] rounded-[36px] bg-white/[0.05]" />
      <div className="absolute right-[-70px] top-2 h-28 w-56 rotate-[30deg] rounded-[36px] bg-white/[0.05]" />
    </div>
  );
}

/**
 * Screen — NovaKit Hi-Fi layout for flow screens.
 *
 * variant "hero": blue hero (status bar, top bar, heading, `hero` slot), then a
 *   white sheet that rises over it with the content. For choosing.
 * variant "plain": light page, dark text. For reviewing and for bad news, where
 *   the screen should be calm, not branded.
 *
 * Like the wireframe's ScreenLayout, focus moves to the heading on mount. Each
 * child reveals in a short stagger (off under reduced motion via MotionConfig).
 */
export default function Screen({ variant = "plain", title, onBack, heading, lead, hero, icon, children }) {
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const content = (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
      {/* toArray keeps each child's original position in its key, so a Notice
          appearing mid-list doesn't remount (and re-animate) what follows. */}
      {Children.toArray(children).map((child, i) => (
        <motion.div key={child.key ?? i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );

  if (variant === "hero") {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col bg-hf-blue-700">
        <StatusBar tone="light" className="relative z-10 bg-hf-blue-700" />
        <main className="relative flex flex-1 flex-col overflow-y-auto">
          <section className="hf-on-blue relative shrink-0 px-5 pb-12 text-white">
            <HeroBackdrop />
            <div className="relative">
              <TopBar title={title} onBack={onBack} tone="light" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
                className="mt-3 space-y-2"
              >
                <h2 ref={headingRef} tabIndex={-1} className="text-hf-h1 text-white outline-none">
                  {heading}
                </h2>
                {lead ? <p className="text-hf-body text-white max-w-[34ch]">{lead}</p> : null}
              </motion.div>
              {hero ? <div className="mt-5">{hero}</div> : null}
            </div>
          </section>
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 26 }}
            className="relative -mt-6 flex-1 rounded-t-hf-lg bg-white px-5 pb-10 pt-6 shadow-hf-sheet"
          >
            {content}
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-hf-page">
      <StatusBar tone="dark" className="bg-hf-page" />
      <TopBar title={title} onBack={onBack} tone="dark" />
      <main className="flex-1 overflow-y-auto px-5 pb-10 pt-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="mb-6 space-y-3"
        >
          {icon ? <div>{icon}</div> : null}
          <h2 ref={headingRef} tabIndex={-1} className="text-hf-h1 text-hf-ink-900 outline-none">
            {heading}
          </h2>
          {lead ? <p className="text-hf-body text-hf-ink-700">{lead}</p> : null}
        </motion.div>
        {content}
      </main>
    </div>
  );
}
