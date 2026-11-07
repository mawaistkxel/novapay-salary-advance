import { Button, Checkbox, Money, Notice, Receipt, Screen } from "..";
import { PAYDAY, feeFor, totalFor } from "../../data/scenarios";

/**
 * Terms and Accept (high fidelity) — moments (a) and (b) on one screen.
 * A calm, light screen (no blue hero) because this is where the person reads.
 * Everything they agree to sits above Accept; the total is the loudest number.
 * "Not now" is the same size and weight as Accept.
 */
export default function TermsScreen({
  applied,
  disbursed,
  consent,
  onConsent,
  accepting,
  acceptError,
  onAccept,
  onDecline,
  onBack,
}) {
  const fee = feeFor(disbursed);
  const total = totalFor(disbursed);
  const reduced = disbursed < applied;

  return (
    <Screen title="Review and accept" onBack={onBack} heading="Your salary advance">
      {reduced ? (
        <Notice
          key="haircut"
          tone="caution"
          title={
            <>
              We can offer <Money amount={disbursed} />, not <Money amount={applied} />
            </>
          }
        >
          After our checks, <Money amount={disbursed} weight="normal" /> is the most we can lend you this time.
          The fee and total below are for <Money amount={disbursed} weight="normal" />. You can still say no.
        </Notice>
      ) : null}

      <Receipt key="receipt" disbursed={disbursed} fee={fee} total={total} date={PAYDAY} />

      <Checkbox key="consent" id="hf-consent" checked={consent} onChange={onConsent}>
        I agree that NovaPay will take <Money amount={total} /> from my wallet on {PAYDAY}.
      </Checkbox>

      {acceptError ? (
        <Notice key="error" tone="caution" title="That didn't go through" alert>
          No money was moved and nothing will be taken from your wallet. Please try again.
        </Notice>
      ) : null}

      <div key="actions" className="space-y-3 pt-1">
        <Button size="lg" disabled={!consent} loading={accepting} onClick={onAccept}>
          {accepting ? (
            "Sending…"
          ) : (
            <>
              Accept and get <Money amount={disbursed} />
            </>
          )}
        </Button>
        <Button size="lg" variant="secondary" onClick={onDecline} disabled={accepting}>
          Not now
        </Button>
      </div>
    </Screen>
  );
}
