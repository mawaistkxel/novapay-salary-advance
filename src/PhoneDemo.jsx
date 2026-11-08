import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeft, X } from "@phosphor-icons/react";
import DemoSwitcher from "./DemoSwitcher";

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/**
 * PhoneDemo — the demo controls in phone mode (8 Nov). Prototype-only, like
 * DemoSwitcher, which it wraps unchanged.
 *
 * A small dashed "Demo" tab with a left arrow on the right edge, level with
 * Home's quick actions (Send … Scan: the notch spacer + 236px, 88px tall), opens
 * a bottom sheet. Its hit area is 20×88px: any wider overlaps the Scan button
 * at 360px, so it's under the 44px guideline on purpose; it's prototype UI.
 * The sheet has the same scenarios, "Send
 * payment reminder" and "Restart this scenario". Picking any of them closes
 * the sheet so the result is visible at once.
 *
 * The sheet is a real dialog: role="dialog" + aria-modal, a close button, Esc,
 * focus moved in, kept in (Tab cycles) and returned to the tab on close. A
 * backdrop tap also closes it; that's fine here because nothing in it is a
 * money decision (unlike the starter's BottomSheet rule).
 */
export default function PhoneDemo(props) {
  const [open, setOpen] = useState(false);
  const tabRef = useRef(null);
  const sheetRef = useRef(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    sheetRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !sheetRef.current) return;
      const items = [...sheetRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sheetRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      tabRef.current?.focus();
    };
  }, [open]);

  // Every action in the sheet closes it, so the result shows straight away.
  const andClose = (fn) => (...args) => {
    fn?.(...args);
    close();
  };

  return (
    <>
      <button
        ref={tabRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open demo controls"
        className="fixed right-0 top-[calc(max(env(safe-area-inset-top),0.75rem)+236px)] z-40 flex h-[88px] w-5 items-stretch font-geist"
      >
        <span
          aria-hidden="true"
          className="flex w-full flex-col items-center justify-center gap-1.5 rounded-l-hf-sm border border-r-0 border-dashed border-hf-ink-500 bg-white/90 text-hf-ink-700 shadow-hf-soft backdrop-blur"
        >
          <CaretLeft size={12} weight="bold" />
          <span className="text-[11px] font-medium tracking-wide [writing-mode:vertical-rl]">Demo</span>
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div key="phone-demo" data-view="hifi" className="fixed inset-0 z-50 flex items-end font-geist">
            <motion.div
              aria-hidden="true"
              onClick={close}
              className="absolute inset-0 bg-hf-ink-900/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="phone-demo-title"
              tabIndex={-1}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="relative max-h-[85dvh] w-full overflow-y-auto rounded-t-hf-lg bg-hf-page px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-hf-float outline-none"
            >
              <div className="mb-3 flex items-center justify-between gap-3 pl-1">
                <h2 id="phone-demo-title" className="text-hf-h2 text-hf-ink-900">
                  Demo controls
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close demo controls"
                  className="hf-glass-strong grid h-11 w-11 place-items-center rounded-full text-hf-ink-900"
                >
                  <X size={20} />
                </button>
              </div>
              <DemoSwitcher
                {...props}
                onChange={andClose(props.onChange)}
                onReset={andClose(props.onReset)}
                onSendReminder={andClose(props.onSendReminder)}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
