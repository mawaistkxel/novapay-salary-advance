/**
 * Toast — NovaKit Lite
 * A transient confirmation message.
 *
 * Changed in the salary-advance work:
 * - The live region is always mounted (role="status", aria-live="polite"), so screen
 *   readers announce the message when it appears. Before, it had no live region at all.
 * - Background success -> neutral-900. White text on success was 3.45:1 (fails AA);
 *   on neutral-900 it is 17.4:1. The icon keeps the success colour (5.05:1, a graphic).
 * - icon is a prop (default ✓); pass null for a neutral message.
 */
export default function Toast({ open, message, icon = "✓" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute left-4 right-4 bottom-6 z-30 pointer-events-none"
    >
      {open ? (
        <div className="flex items-center gap-2 rounded-md bg-neutral-900 text-white px-4 py-3 text-body shadow-card">
          {icon ? (
            <span aria-hidden="true" className="text-success font-semibold">
              {icon}
            </span>
          ) : null}
          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
}
