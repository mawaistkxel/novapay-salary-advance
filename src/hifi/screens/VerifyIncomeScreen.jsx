import { Bank, FileText, LockKey, Question, UploadSimple } from "@phosphor-icons/react";
import { Button, IconBadge, Screen, Tile } from "..";

/**
 * Verify income (high fidelity) — the one real next step after an
 * income_unverified decline. What to send, why, how it's used. The upload is
 * mocked; no review time or approval is promised, because neither is defined.
 */
export default function VerifyIncomeScreen({ uploading, onUpload, onBack }) {
  return (
    <Screen
      title="Verify your income"
      onBack={onBack}
      icon={
        <IconBadge size="lg">
          <FileText size={26} weight="duotone" />
        </IconBadge>
      }
      heading="Show us your salary"
    >
      <section aria-labelledby="hf-send" className="space-y-3">
        <h3 id="hf-send" className="text-hf-h2 text-hf-ink-900">
          Send one of these
        </h3>
        <Tile as="ul" className="divide-y divide-hf-line px-4 py-1">
          <li className="flex items-center gap-3 py-3">
            <IconBadge size="sm">
              <FileText size={18} weight="bold" />
            </IconBadge>
            <span className="text-hf-body text-hf-ink-900">Your most recent payslip</span>
          </li>
          <li className="flex items-center gap-3 py-3">
            <IconBadge size="sm">
              <Bank size={18} weight="bold" />
            </IconBadge>
            <span className="text-hf-body text-hf-ink-900">A bank statement that shows your salary being paid</span>
          </li>
        </Tile>
      </section>

      <Tile className="space-y-4 p-5">
        <section aria-labelledby="hf-why-ask" className="flex gap-3">
          <Question aria-hidden="true" size={22} weight="duotone" className="mt-px shrink-0 text-hf-blue-700" />
          <div className="space-y-1">
            <h3 id="hf-why-ask" className="text-hf-body font-semibold text-hf-ink-900">
              Why we ask
            </h3>
            <p className="text-hf-body text-hf-ink-700">
              The advance is repaid from your next salary, so we need to know a salary is coming.
            </p>
          </div>
        </section>
        <div className="border-t border-hf-line" />
        <section aria-labelledby="hf-use" className="flex gap-3">
          <LockKey aria-hidden="true" size={22} weight="duotone" className="mt-px shrink-0 text-hf-blue-700" />
          <div className="space-y-1">
            <h3 id="hf-use" className="text-hf-body font-semibold text-hf-ink-900">
              How we use it
            </h3>
            <p className="text-hf-body text-hf-ink-700">
              Only to confirm your income for salary advances. We'll tell you when we've checked it.
            </p>
          </div>
        </section>
      </Tile>

      <div className="space-y-3 pt-1">
        <Button size="lg" loading={uploading} onClick={onUpload} icon={<UploadSimple size={18} weight="bold" />}>
          {uploading ? "Uploading…" : "Upload a document"}
        </Button>
        <Button size="lg" variant="secondary" onClick={onBack} disabled={uploading}>
          Not now
        </Button>
      </div>
    </Screen>
  );
}
