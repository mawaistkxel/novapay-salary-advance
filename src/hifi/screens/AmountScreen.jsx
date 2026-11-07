import { Button, Money, Screen, TierPicker } from "..";
import { TIERS, PAYDAY, totalFor } from "../../data/scenarios";

/**
 * Choose amount (high fidelity). Same rules as the wireframe: the repayment for
 * each tier is visible while choosing, tiers above the limit are locked with a
 * plain reason (the over-limit request can't happen), nothing is preselected.
 */
export default function AmountScreen({ limit, value, onChange, onBack, onContinue, checking }) {
  const options = TIERS.map((amount) => ({
    amount,
    locked: amount > limit,
    detail: (
      <>
        You repay <Money amount={totalFor(amount)} className="text-hf-ink-900" /> on {PAYDAY}
      </>
    ),
    lockedReason: (
      <>
        Your current limit is <Money amount={limit} />.
      </>
    ),
  }));

  return (
    <Screen
      variant="hero"
      title="Salary advance"
      onBack={onBack}
      heading={
        <>
          You can borrow up to <Money amount={limit} size="h1" />
        </>
      }
      lead={`A one-time fee of 3%, no interest. You repay it all in one go from your wallet on ${PAYDAY}, your next payday.`}
    >
      <TierPicker label="How much do you need?" name="tier" options={options} value={value} onChange={onChange} />

      <div className="space-y-2">
        <Button size="lg" disabled={!value} loading={checking} onClick={onContinue}>
          {checking ? "Checking…" : "See full cost"}
        </Button>
        {!value ? <p className="text-center text-hf-body text-hf-ink-700">Choose an amount to continue.</p> : null}
      </div>
    </Screen>
  );
}
