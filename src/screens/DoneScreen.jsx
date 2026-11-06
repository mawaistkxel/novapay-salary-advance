import { Button, Card, CostBreakdown, AmountText } from "../novakit";
import ScreenLayout from "./ScreenLayout";
import { PAYDAY } from "../data/scenarios";

/**
 * Confirmation. Plain, not celebratory: taking on debt isn't a win to cheer.
 * It repeats what was agreed so the user leaves with the date and total.
 */
export default function DoneScreen({ disbursed, fee, total, onDone }) {
  return (
    <ScreenLayout
      title="Salary advance"
      heading={
        <>
          <AmountText amount={disbursed} size="title" /> is in your wallet
        </>
      }
    >
      <Card>
        <CostBreakdown
          items={[
            { label: "You received", value: <AmountText amount={disbursed} size="body" className="font-semibold" /> },
            { label: "One-time fee", value: <AmountText amount={fee} size="body" className="font-semibold" /> },
            { label: "Taken from your wallet on", value: PAYDAY },
            { label: "Total you repay", value: <AmountText amount={total} size="title" />, emphasis: true },
          ]}
        />
      </Card>
      <p className="text-body text-neutral-700">
        We'll remind you before {PAYDAY}. You'll also see this on your home screen.
      </p>
      <Button size="lg" onClick={onDone}>
        Back to home
      </Button>
    </ScreenLayout>
  );
}
