import { Button, Notice } from "../novakit";
import ScreenLayout from "./ScreenLayout";
import { declineCopyFor } from "../data/declineCopy";

/**
 * Decline — moment (c).
 * Says no plainly, names the real reason in everyday words, and only offers a
 * next step when one actually exists. No blame, no "try again later" when
 * nothing would change. Copy lives in src/data/declineCopy.js (shared with the
 * high-fidelity view).
 */
export default function DeclineScreen({ reason, onVerify, onHome }) {
  const copy = declineCopyFor(reason);
  return (
    <ScreenLayout
      title="Salary advance"
      onBack={onHome}
      heading={copy.heading}
    >
      <section aria-labelledby="why" className="space-y-1">
        <h3 id="why" className="text-body font-semibold text-neutral-900">
          Why
        </h3>
        <p className="text-body text-neutral-700">{copy.why}</p>
      </section>

      <Notice tone="info" title={copy.nextTitle}>
        {copy.next}
      </Notice>

      <div className="space-y-3">
        {copy.canVerify ? (
          <Button size="lg" onClick={onVerify}>
            Verify your income
          </Button>
        ) : null}
        <Button size="lg" variant={copy.canVerify ? "secondary" : "primary"} onClick={onHome}>
          Back to home
        </Button>
      </div>
    </ScreenLayout>
  );
}
