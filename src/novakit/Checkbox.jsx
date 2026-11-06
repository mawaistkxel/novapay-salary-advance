/**
 * Checkbox — NovaKit Lite (added for the salary advance)
 * Explicit consent. Always starts unticked; the label is the full statement
 * the user agrees to, at body size, never caption gray.
 *
 * Props
 *   id, checked, onChange(checked: boolean), children (the label text)
 *
 * States: unticked · ticked · focused (global :focus-visible ring).
 * Tokens: neutral-500 box border (3.95:1 as a graphic), brand when ticked, radius sm.
 */
export default function Checkbox({ id, checked, onChange, children }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <span className="relative mt-0.5 h-5 w-5 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-5 w-5 appearance-none rounded border-2 border-neutral-500 bg-white checked:bg-brand checked:border-brand cursor-pointer"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100"
        >
          <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-body text-neutral-900">{children}</span>
    </label>
  );
}
