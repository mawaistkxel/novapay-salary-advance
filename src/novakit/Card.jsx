/**
 * Card — NovaKit Lite
 * A surface container for grouping content.
 * Border: hard-coded #E6E6E6 replaced with the neutral-200 token.
 */
export default function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white rounded-lg border border-neutral-200 shadow-card p-4 " + className
      }
    >
      {children}
    </div>
  );
}
