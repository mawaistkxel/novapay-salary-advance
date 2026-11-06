import { Button, Card } from "../novakit";
import ScreenLayout from "./ScreenLayout";

/**
 * Verify income — the one real next step after an income_unverified decline.
 * A single explainer: what to send, why, how it's used. The upload is mocked.
 * It doesn't promise a review time or an approval, because neither is defined.
 */
export default function VerifyIncomeScreen({ uploading, onUpload, onBack }) {
  return (
    <ScreenLayout title="Verify your income" onBack={onBack} heading="Show us your salary">
      <section aria-labelledby="send" className="space-y-2">
        <h3 id="send" className="text-body font-semibold text-neutral-900">
          Send one of these
        </h3>
        <Card className="space-y-2">
          <p className="text-body text-neutral-900">Your most recent payslip</p>
          <div className="border-t border-neutral-200" />
          <p className="text-body text-neutral-900">A bank statement that shows your salary being paid</p>
        </Card>
      </section>

      <section aria-labelledby="why-ask" className="space-y-1">
        <h3 id="why-ask" className="text-body font-semibold text-neutral-900">
          Why we ask
        </h3>
        <p className="text-body text-neutral-700">
          The advance is repaid from your next salary, so we need to know a salary is coming.
        </p>
      </section>

      <section aria-labelledby="use" className="space-y-1">
        <h3 id="use" className="text-body font-semibold text-neutral-900">
          How we use it
        </h3>
        <p className="text-body text-neutral-700">
          Only to confirm your income for salary advances. We'll tell you when we've checked it.
        </p>
      </section>

      <div className="space-y-3">
        <Button size="lg" loading={uploading} onClick={onUpload}>
          {uploading ? "Uploading…" : "Upload a document"}
        </Button>
        <Button size="lg" variant="secondary" onClick={onBack} disabled={uploading}>
          Not now
        </Button>
      </div>
    </ScreenLayout>
  );
}
