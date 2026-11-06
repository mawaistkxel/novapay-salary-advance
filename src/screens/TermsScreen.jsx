import { Button, Card, Checkbox, CostBreakdown, Notice, AmountText } from "../novakit";
import ScreenLayout from "./ScreenLayout";
import { PAYDAY, feeFor, totalFor } from "../data/scenarios";

/**
 * Terms and Accept — moments (a) and (b) on one screen.
 * Everything the user agrees to sits above the Accept button: the amount they
 * will actually receive, the fee, the total and the date it's taken. The consent
 * checkbox names the same amount and date. "Not now" is the same size and
 * contrast as Accept.
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
    <ScreenLayout title="Review and accept" onBack={onBack} heading="Your salary advance">
      {reduced ? (
        <Notice
          tone="caution"
          title={
            <>
              We can offer <AmountText amount={disbursed} size="body" tone="inherit" className="font-semibold" />,
              not <AmountText amount={applied} size="body" tone="inherit" className="font-semibold" />
            </>
          }
        >
          After our checks, <AmountText amount={disbursed} size="body" /> is the most we can lend
          you this time. The fee and total below are for{" "}
          <AmountText amount={disbursed} size="body" />. You can still say no.
        </Notice>
      ) : null}

      <Card>
        <CostBreakdown
          items={[
            {
              label: "You receive",
              hint: "Into your NovaPay wallet",
              value: <AmountText amount={disbursed} size="body" className="font-semibold" />,
            },
            {
              label: "One-time fee",
              hint: (
                <>
                  3% of <AmountText amount={disbursed} size="body" />. No interest.
                </>
              ),
              value: <AmountText amount={fee} size="body" className="font-semibold" />,
            },
            {
              label: "Taken from your wallet on",
              hint: "Your next payday",
              value: PAYDAY,
            },
            {
              label: "Total you repay",
              value: <AmountText amount={total} size="title" />,
              emphasis: true,
            },
          ]}
        />
      </Card>

      <Checkbox id="consent" checked={consent} onChange={onConsent}>
        I agree that NovaPay will take{" "}
        <AmountText amount={total} size="body" className="font-semibold" /> from my wallet on{" "}
        {PAYDAY}.
      </Checkbox>

      {acceptError ? (
        <Notice tone="caution" title="That didn't go through" alert>
          No money was moved and nothing will be taken from your wallet. Please try again.
        </Notice>
      ) : null}

      <div className="space-y-3">
        <div className="space-y-2">
          <Button size="lg" disabled={!consent} loading={accepting} onClick={onAccept}>
            {accepting ? (
              "Sending…"
            ) : (
              <span>
                Accept and get <AmountText amount={disbursed} size="title" tone="inherit" />
              </span>
            )}
          </Button>
        </div>
        <Button size="lg" variant="secondary" onClick={onDecline} disabled={accepting}>
          Not now
        </Button>
      </div>
    </ScreenLayout>
  );
}
