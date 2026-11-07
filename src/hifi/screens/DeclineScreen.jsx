import { Button, Illustration, Notice, Screen, declineIllustration } from "..";
import { declineCopyFor } from "../../data/declineCopy";

/**
 * Decline (high fidelity) — moment (c). Same words as the wireframe (shared copy
 * file). A light, quiet screen: no blue hero, no red, no warning triangle. The
 * reason is named; a next step appears only when one exists. A small navy
 * illustration (magnifier for income, chart for credit score) softens the news;
 * it's decorative and never the only signal.
 */
export default function DeclineScreen({ reason, onVerify, onHome }) {
  const copy = declineCopyFor(reason);
  return (
    <Screen
      title="Salary advance"
      onBack={onHome}
      icon={<Illustration name={declineIllustration(reason)} size="lg" />}
      center
      heading={copy.heading}
      lead={copy.why}
      footer={
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
      }
    >
      {copy.canVerify ? null : (
        <Notice tone="info" title={copy.nextTitle}>
          {copy.next}
        </Notice>
      )}
    </Screen>
  );
}
