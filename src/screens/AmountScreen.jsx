import { Button, TierPicker, AmountText } from "../novakit";
import ScreenLayout from "./ScreenLayout";
import { TIERS, PAYDAY, totalFor } from "../data/scenarios";
import { LIMIT_EXPLAINER_TITLE, limitExplainerBody } from "../data/limitCopy";

/**
 * Choose amount. The cost of each tier is visible while choosing, and tiers
 * above the limit are shown but locked, so an over-limit request can't happen.
 * Nothing is preselected: defaulting to the maximum would anchor people on
 * borrowing the most.
 */
export default function AmountScreen({ limit, value, onChange, onBack, onContinue, checking }) {
  const options = TIERS.map((amount) => ({
    amount,
    locked: amount > limit,
    detail: (
      <>
        You repay <AmountText amount={totalFor(amount)} size="body" className="font-semibold" /> on{" "}
        {PAYDAY}
      </>
    ),
    lockedReason: (
      <>
        Your current limit is <AmountText amount={limit} size="body" />.
      </>
    ),
  }));

  return (
    <ScreenLayout
      title="Salary advance"
      onBack={onBack}
      heading={
        <>
          You can borrow up to <AmountText amount={limit} size="title" />
        </>
      }
    >
      <p className="text-body text-neutral-700 -mt-2">
        A one-time fee of 3%, no interest. You repay it all in one go from your wallet on{" "}
        {PAYDAY}, your next payday.
      </p>

      <TierPicker
        label="How much do you need?"
        name="tier"
        options={options}
        value={value}
        onChange={onChange}
      />

      {/* Only when a tier is locked. Native <details>: keyboard and screen-reader
          support for free. Shared, honest copy (src/data/limitCopy.js). */}
      {TIERS.some((t) => t > limit) ? (
        <details className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2">
          <summary className="cursor-pointer text-body font-semibold text-brand">
            {LIMIT_EXPLAINER_TITLE}
          </summary>
          <p className="mt-2 text-body text-neutral-700">{limitExplainerBody(limit)}</p>
        </details>
      ) : null}

      <div className="space-y-2">
        <Button size="lg" disabled={!value} loading={checking} onClick={onContinue}>
          {checking ? "Checking…" : "See full cost"}
        </Button>
        {!value ? (
          <p className="text-body text-neutral-700 text-center">Choose an amount to continue.</p>
        ) : null}
      </div>
    </ScreenLayout>
  );
}
