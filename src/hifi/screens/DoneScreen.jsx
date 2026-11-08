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
      center
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
      footer={
        <Button size="lg" onClick={onDone}>
          Back to home
        </Button>
      }
    >
      <Receipt receivedLabel="You received" disbursed={disbursed} fee={fee} total={total} date={PAYDAY} />
      <Tile>
        <Timeline disbursed={disbursed} total={total} date={PAYDAY} />
      </Tile>
    </Screen>
  );
}
