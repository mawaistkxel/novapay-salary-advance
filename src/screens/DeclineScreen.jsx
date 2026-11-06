import { Button, Notice } from "../novakit";
import ScreenLayout from "./ScreenLayout";

/**
 * Decline — moment (c).
 * Says no plainly, names the real reason in everyday words, and only offers a
 * next step when one actually exists. No blame, no "try again later" when
 * nothing would change.
 *
 * Copy per internal denial_reason. `other` isn't in the demo switcher; its copy
 * is here so the screen never falls back to a blank or vague message.
 */
const COPY = {
  income_unverified: {
    why: "We couldn't confirm your salary. To lend before payday, we need to see that you're paid a regular salary, and we don't have proof of that yet.",
    nextTitle: "What you can do",
    next: "Share a recent payslip or bank statement. Once we've confirmed your income, you can check for an offer again.",
    canVerify: true,
  },
  credit_score: {
    why: "This is based on your credit score, which comes from your history of borrowing and repaying.",
    nextTitle: "What this means",
    next: "There's nothing you can do in the app to change this decision today. If you think something in your credit history is wrong, NovaPay support can tell you where it came from.",
    canVerify: false,
  },
  other: {
    why: "Our checks didn't meet the conditions for this advance. We can't share more detail in the app.",
    nextTitle: "What this means",
    next: "If you have questions, NovaPay support can help.",
    canVerify: false,
  },
};

export default function DeclineScreen({ reason, onVerify, onHome }) {
  const copy = COPY[reason] || COPY.other;
  return (
    <ScreenLayout
      title="Salary advance"
      onBack={onHome}
      heading="We can't offer you an advance right now"
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

      <p className="text-body text-neutral-700">
        Nothing else in your NovaPay wallet changes because of this.
      </p>

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
