import { AppBar, Card, ListRow, Button, AmountText } from "../novakit";
import { PAYDAY } from "../data/scenarios";
import { declineCopyFor } from "../data/declineCopy";

/**
 * Home — the starter screen, plus the salary-advance entry card in whichever
 * state the user is in: available, declined (per reason), active advance, or
 * documents submitted. Eligibility is known before the user taps anything, so
 * there's no "check" step that can end in a no.
 */
export default function HomeScreen({
  balance,
  advance,
  declineReason,
  documentsSubmitted,
  onSeeOffer,
  onSeeDecline,
}) {
  return (
    <>
      <AppBar title="NovaPay" />
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card>
          <div className="text-caption text-neutral-700">Available balance</div>
          <div className="mt-1">
            <AmountText amount={balance} size="display" />
          </div>
        </Card>

        <Card className="space-y-3">{renderAdvanceCard()}</Card>

        <Card>
          <div className="text-caption text-neutral-700 mb-1">Recent activity</div>
          {advance ? (
            <ListRow
              icon="↓"
              title="Salary advance"
              subtitle="Today"
              trailing={<AmountText amount={advance.disbursed} size="body" />}
            />
          ) : null}
          <ListRow
            icon="↑"
            title="Sent to Ahmed K."
            subtitle="Today, 2:14 PM"
            trailing={<AmountText amount={1500} size="body" />}
          />
          <ListRow
            icon="↓"
            title="Salary credited"
            subtitle="28 Jun"
            trailing={<AmountText amount={68000} size="body" />}
          />
          <ListRow
            icon="↑"
            title="Mobile top-up"
            subtitle="27 Jun"
            trailing={<AmountText amount={500} size="body" />}
          />
        </Card>
      </main>
    </>
  );

  function renderAdvanceCard() {
    if (advance) {
      // Active advance: the one fact that matters, without alarm.
      return (
        <div>
          <div className="text-body font-semibold text-neutral-900">Salary advance</div>
          <div className="text-body text-neutral-700 mt-1">
            <AmountText amount={advance.total} size="body" className="font-semibold" /> will be
            taken from your wallet on {PAYDAY}, your next payday.
          </div>
        </div>
      );
    }
    if (documentsSubmitted) {
      return (
        <div>
          <div className="text-body font-semibold text-neutral-900">Salary advance</div>
          <div className="text-body text-neutral-700 mt-1">
            We're checking the document you sent. We'll let you know when it's done.
          </div>
        </div>
      );
    }
    if (declineReason) {
      // Quiet, and no reason on Home: it shows what's needed or "not available",
      // and the reason sits one tap away. Never an offer they can't have.
      const copy = declineCopyFor(declineReason);
      return (
        <>
          <div>
            <div className="text-body font-semibold text-neutral-900">Salary advance</div>
            <div className="text-body text-neutral-700 mt-1">{copy.home}</div>
          </div>
          <Button variant="secondary" onClick={onSeeDecline}>
            {copy.homeAction}
          </Button>
        </>
      );
    }
    return (
      <>
        <div>
          <div className="text-title text-neutral-900">Need cash before payday?</div>
          <div className="text-body text-neutral-700 mt-1">
            Repaid automatically on your next payday. One fee of 3%, no interest.
          </div>
        </div>
        <Button size="lg" onClick={onSeeOffer}>
          See amounts and cost
        </Button>
      </>
    );
  }
}
