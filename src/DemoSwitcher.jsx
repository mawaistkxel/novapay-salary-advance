/**
 * Demo scenario switcher. Prototype-only: it sits outside the phone frame so
 * it can't be mistaken for product UI. Changing the scenario restarts at Home.
 * Not part of NovaKit, so it lives outside src/novakit/.
 */
export default function DemoSwitcher({ scenarios, value, onChange, onReset }) {
  return (
    <aside
      aria-label="Prototype controls"
      className="w-full rounded-md border border-dashed border-neutral-500 bg-neutral-50 p-4 space-y-3"
    >
      <div>
        <p className="text-caption font-semibold uppercase tracking-wide text-neutral-700">
          Prototype only
        </p>
        <p className="text-body text-neutral-900 mt-1">
          Choose what NovaPay decides, then tap “Check eligibility”.
        </p>
      </div>
      <fieldset className="space-y-1">
        <legend className="text-body font-semibold text-neutral-900 mb-1">Demo scenario</legend>
        {Object.entries(scenarios).map(([key, sc]) => (
          <label key={key} className="flex items-start gap-2 py-1 cursor-pointer text-body text-neutral-900">
            <input
              type="radio"
              name="scenario"
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
              className="mt-1 accent-brand"
            />
            <span>{sc.label}</span>
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={onReset}
        className="text-body font-semibold text-brand underline underline-offset-2"
      >
        Restart this scenario
      </button>
    </aside>
  );
}
