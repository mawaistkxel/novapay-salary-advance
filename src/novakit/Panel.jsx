/**
 * Panel — NovaKit Lite
 * A surface container for grouping content.
 *
 * DEPRECATED: duplicates Card (same surface, different border). Use Card.
 * Kept exported so existing imports don't break; not used in new work.
 */
export default function Panel({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white rounded-lg border border-neutral-300 shadow-card p-4 " + className
      }
    >
      {children}
    </div>
  );
}
