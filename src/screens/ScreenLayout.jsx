import { useEffect, useRef } from "react";
import { AppBar } from "../novakit";

/**
 * Shared layout for flow screens: app bar, then a scrolling body.
 * On mount, focus moves to the screen heading so keyboard and screen-reader
 * users land at the top of the new screen instead of on a stale button.
 */
export default function ScreenLayout({ title, onBack, heading, children }) {
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);
  return (
    <>
      <AppBar title={title} onBack={onBack} />
      <main className="flex-1 overflow-y-auto p-4 pb-8 space-y-5">
        {heading ? (
          <h2 ref={headingRef} tabIndex={-1} className="text-title text-neutral-900 outline-none">
            {heading}
          </h2>
        ) : null}
        {children}
      </main>
    </>
  );
}
