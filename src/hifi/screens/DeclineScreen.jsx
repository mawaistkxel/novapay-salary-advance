import { ShieldCheck } from "@phosphor-icons/react";
import { Button, Illustration, Notice, Screen, Tile, declineIllustration } from "..";
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
      heading="We can't offer you an advance right now"
    >
      <Tile tone="glass" as="section" aria-labelledby="hf-why" className="space-y-1 p-5">
        <h3 id="hf-why" className="text-hf-body font-medium text-hf-ink-900">
          Why
        </h3>
        <p className="text-hf-body text-hf-ink-700">{copy.why}</p>
      </Tile>

      <Notice tone="info" title={copy.nextTitle}>
        {copy.next}
      </Notice>

      <p className="flex gap-2.5 px-1 text-hf-body text-hf-ink-700">
        <ShieldCheck aria-hidden="true" size={20} className="mt-px shrink-0 text-hf-navy-600" />
        Nothing else in your NovaPay wallet changes because of this.
      </p>

      <div className="space-y-3 pt-1">
        {copy.canVerify ? (
          <Button size="lg" onClick={onVerify}>
            Verify your income
          </Button>
        ) : null}
        <Button size="lg" variant={copy.canVerify ? "secondary" : "primary"} onClick={onHome}>
          Back to home
        </Button>
      </div>
    </Screen>
  );
}
