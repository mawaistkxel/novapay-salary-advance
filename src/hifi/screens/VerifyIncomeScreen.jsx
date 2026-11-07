import { Bank, FileText, LockKey, UploadSimple } from "@phosphor-icons/react";
import { Button, IconBadge, Illustration, Screen, Tile } from "..";

/**
 * Verify income (high fidelity) — the one real next step after an
 * income_unverified decline. Same pattern as Decline: a centred illustration
 * (shield) and heading, then what to send and how it's used. The upload is
 * mocked; no review time or approval is promised, because neither is defined.
 */
export default function VerifyIncomeScreen({ uploading, onUpload, onBack }) {
  return (
    <Screen
      title="Verify your income"
      onBack={onBack}
      icon={<Illustration name="shield" size="lg" />}
      center
      heading="Send one of these"
      footer={
        <div className="space-y-3">
          <Button size="lg" loading={uploading} onClick={onUpload} icon={<UploadSimple size={18} />}>
            {uploading ? "Uploading…" : "Upload a document"}
          </Button>
          <Button size="lg" variant="secondary" onClick={onBack} disabled={uploading}>
            Not now
          </Button>
        </div>
      }
    >
      <section aria-label="Documents you can send">
        <Tile as="ul" className="divide-y divide-hf-line/80 px-4 py-1">
          <li className="flex items-center gap-3 py-3">
            <IconBadge size="sm">
              <FileText size={18} />
            </IconBadge>
            <span className="text-hf-body text-hf-ink-900">Your most recent payslip</span>
          </li>
          <li className="flex items-center gap-3 py-3">
            <IconBadge size="sm">
              <Bank size={18} />
            </IconBadge>
            <span className="text-hf-body text-hf-ink-900">A bank statement that shows your salary being paid</span>
          </li>
        </Tile>
      </section>

      <Tile className="p-5">
        <section aria-labelledby="hf-use" className="flex gap-3">
          <LockKey aria-hidden="true" size={22} className="mt-px shrink-0 text-hf-navy-600" />
          <div className="space-y-1">
            <h3 id="hf-use" className="text-hf-body font-medium text-hf-ink-900">
              How we use it
            </h3>
            <p className="text-hf-body text-hf-ink-700">Only to confirm your income for salary advances.</p>
          </div>
        </section>
      </Tile>

    </Screen>
  );
}
