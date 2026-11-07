import { ArrowLeft } from "@phosphor-icons/react";

/**
 * TopBar — NovaKit Hi-Fi
 * Round back button (44px target) + centred title. tone "light" sits on the blue
 * hero with a glass button; "dark" sits on light screens.
 */
export default function TopBar({ title, onBack, tone = "dark" }) {
  const light = tone === "light";
  return (
    <header className="grid h-14 shrink-0 grid-cols-[44px_1fr_44px] items-center px-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className={
            "grid h-11 w-11 place-items-center rounded-full transition-colors active:scale-95 " +
            (light
              ? "bg-white/[0.14] text-white shadow-hf-glass backdrop-blur-md hover:bg-white/20"
              : "bg-white text-hf-ink-900 shadow-hf-soft hover:bg-hf-mist")
          }
        >
          <ArrowLeft size={20} weight="bold" />
        </button>
      ) : (
        <span />
      )}
      <p
        className={
          "truncate text-center text-[16px] font-semibold tracking-tight " +
          (light ? "text-white" : "text-hf-ink-900")
        }
      >
        {title}
      </p>
      <span />
    </header>
  );
}
