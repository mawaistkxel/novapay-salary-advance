import { ArrowLeft } from "@phosphor-icons/react";
import { RoundButton } from "./Tile";

/**
 * TopBar — NovaKit Hi-Fi
 * Round glass back button (44px target) + centred title.
 */
export default function TopBar({ title, onBack }) {
  return (
    <header className="relative grid h-14 shrink-0 grid-cols-[44px_1fr_44px] items-center px-4">
      {onBack ? (
        <RoundButton label="Back" onClick={onBack}>
          <ArrowLeft size={20} />
        </RoundButton>
      ) : (
        <span />
      )}
      <p className="truncate text-center text-[16px] font-medium tracking-tight text-hf-ink-900">{title}</p>
      <span />
    </header>
  );
}
