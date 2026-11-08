import { WarningCircle } from "@phosphor-icons/react";
import { Button, Checkbox, Illustration, Money, Receipt, Screen } from "..";
import { PAYDAY, feeFor, totalFor } from "../../data/scenarios";

/**
 * Terms and Accept (high fidelity) — moments (a) and (b) on one screen.
 * A calm, light screen because this is where the person reads. The one
 * exception is a reduced amount (haircut): then the header becomes a navy box
 * with the illustration, an amber alert badge (like the island toast's warning)
 * and an apology, in place of "Your salary advance" (8 Nov, my call).
 * Everything they agree to sits above Accept; the total is the loudest number.
 * "Not now" is the same size and weight as Accept.
 *
 * Accept and "Not now" are pinned to the bottom. That's safe because Accept is
 * disabled until the consent box is ticked, and the box stays in the scrolling
 * content below the costs: on a short screen you still pass the breakdown to
 * reach it. A failed Accept shows its message in the island toast at the top
 * (App.jsx), where other feedback appears, so the bar never hides it.
 */
export default function TermsScreen({
  applied,
  disbursed,
  consent,
  onConsent,
  accepting,
  acceptError,
  onAccept,
  onDecline,
  onBack,
}) {
  const fee = feeFor(disbursed);
  const total = totalFor(disbursed);
  const reduced = disbursed < applied;

  return (
    <Screen
      title="Review and accept"
      onBack={onBack}
      {...(reduced
        ? {
            feature: "navy",
            center: true,
            icon: <ReducedBadge />,
            heading: (
              <>
                Oops, <Money amount={disbursed} size="h1" /> is all we can offer right now.
              </>
            ),
            lead: (
              <>
                Our checks didn't allow the <Money amount={applied} weight="normal" /> you asked for. You're free to say
                no.
              </>
            ),
          }
        : { heading: "Your salary advance" })}
      footer={
        <div className="space-y-3">
          {/* A failed Accept is shown in the island toast at the top (App.jsx). */}
          <Button size="lg" disabled={!consent} loading={accepting} onClick={onAccept}>
            {accepting ? (
              "Sending…"
            ) : (
              <>
                Accept and get <Money amount={disbursed} />
              </>
            )}
          </Button>
          <Button size="lg" variant="secondary" onClick={onDecline} disabled={accepting}>
            Not now
          </Button>
        </div>
      }
    >
      <Receipt key="receipt" disbursed={disbursed} fee={fee} total={total} date={PAYDAY} />

      <Checkbox key="consent" id="hf-consent" checked={consent} onChange={onConsent}>
        I agree that NovaPay will take <Money amount={total} /> from my wallet on {PAYDAY}.
      </Checkbox>

    </Screen>
  );
}

/**
 * The illustration on a white circle (its artwork has a white background), with
 * an amber alert badge at the bottom right: the same warning glyph and colour as
 * the island toast (amber-400 on navy-900, 9.98:1). Decorative: the heading says it.
 */
function ReducedBadge() {
  return (
    <span aria-hidden="true" className="relative inline-grid h-24 w-24 place-items-center rounded-full bg-white p-3 ring-4 ring-white/10">
      <Illustration name="disguise" size="lg" className="rounded-full" />
      <span className="absolute -bottom-1 -right-1 grid place-items-center rounded-full bg-hf-navy-900 p-[3px]">
        <WarningCircle size={30} weight="fill" className="text-hf-amber-400" />
      </span>
    </span>
  );
}
