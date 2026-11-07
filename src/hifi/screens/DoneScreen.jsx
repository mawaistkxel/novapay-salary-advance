import { Check } from "@phosphor-icons/react";
import { Button, IconBadge, Money, Receipt, Screen, Tile, Timeline } from "..";
import { PAYDAY } from "../../data/scenarios";

/**
 * Confirmation (high fidelity). Plain, not celebratory: no confetti, no green
 * burst. It repeats what was agreed and shows the two dates that matter.
 */
export default function DoneScreen({ disbursed, fee, total, onDone }) {
  return (
    <Screen
      title="Salary advance"
      icon={
        <IconBadge size="lg" tone="navy">
          <Check size={26} />
        </IconBadge>
      }
      heading={
        <>
          <Money amount={disbursed} size="h1" /> is in your wallet
        </>
      }
    >
      <Receipt receivedLabel="You received" disbursed={disbursed} fee={fee} total={total} date={PAYDAY} showHints={false} />
      <Tile>
        <Timeline disbursed={disbursed} total={total} date={PAYDAY} />
      </Tile>
      <p className="text-hf-body text-hf-ink-700">
        We'll remind you before {PAYDAY}. You'll also see this on your home screen.
      </p>
      <Button size="lg" onClick={onDone}>
        Back to home
      </Button>
    </Screen>
  );
}
