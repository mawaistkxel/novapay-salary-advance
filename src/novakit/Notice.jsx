/**
 * Notice — NovaKit Lite (added for the salary advance)
 * An inline message inside the page (not a transient Toast, not a modal).
 * Used for things the user must read before deciding: a reduced amount,
 * why a tier is locked, what to do after a decline, a failed request.
 *
 * Props
 *   tone   "info" | "caution"
 *   title  string (optional)
 *   alert  boolean: role="alert", for messages that appear after an action fails
 *   children
 *
 * Tokens (no new colours):
 *   info     bg brand-50, border brand-100, title brand-800 (10.22:1)
 *   caution  bg accent-50, border accent-100, title accent-600 (4.71:1)
 *   body text neutral-900 in both (≥15.5:1)
 * Amber is used here only to mean "read this carefully", never to sell the loan.
 */
export default function Notice({ tone = "info", title, alert = false, children }) {
  const tones = {
    info: "bg-brand-50 border-brand-100",
    caution: "bg-accent-50 border-accent-100",
  };
  const titleTones = {
    info: "text-brand-800",
    caution: "text-accent-600",
  };
  return (
    <div
      role={alert ? "alert" : undefined}
      className={`rounded-md border p-3 ${tones[tone] || tones.info}`}
    >
      {title ? (
        <p className={`text-body font-semibold ${titleTones[tone] || titleTones.info}`}>{title}</p>
      ) : null}
      <div className={`text-body text-neutral-900 ${title ? "mt-1" : ""}`}>{children}</div>
    </div>
  );
}
