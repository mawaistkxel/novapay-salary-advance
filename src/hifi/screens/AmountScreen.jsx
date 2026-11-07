import { Button, FactStrip, Money, Screen, TierPicker } from "..";
import { TIERS, PAYDAY, totalFor } from "../../data/scenarios";

/**
 * Choose amount (high fidelity). Same rules as the wireframe: the repayment for
 * each tier is visible while choosing, tiers above the limit are locked with a
 * plain reason (the over-limit request can't happen), nothing is preselected.
 * The limit is set like the balance on Home: a light, large figure in glass.
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
        Your current limit is <Money amount={limit} weight="normal" />.
      </>
    ),
  }));

  return (
    <Screen
      feature
      title="Salary advance"
      onBack={onBack}
      heading={
        <>
          <span className="block text-hf-body text-hf-ink-700">You can borrow up to</span>
          <Money amount={limit} size="hero" className="mt-2" />
        </>
      }
      lead={
        <FactStrip
          items={[
            { value: "3%", label: "one-time fee" },
            { value: "0%", label: "interest" },
            { value: PAYDAY, label: "repaid on payday" },
          ]}
        />
      }
    >
      <TierPicker label="How much do you need?" name="tier" options={options} value={value} onChange={onChange} />

      <div className="space-y-2 pt-1">
        <Button size="lg" disabled={!value} loading={checking} onClick={onContinue}>
          {checking ? "Checking…" : "See full cost"}
        </Button>
        {!value ? <p className="text-center text-hf-body text-hf-ink-700">Choose an amount to continue.</p> : null}
      </div>
    </Screen>
  );
}
