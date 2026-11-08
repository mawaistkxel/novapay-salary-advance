import { CellSignalFull, WifiHigh, BatteryFull } from "@phosphor-icons/react";

/**
 * StatusBar — NovaKit Hi-Fi (prototype dressing)
 * The phone's own status bar, so the frame reads as a device. Decorative, hidden
 * from screen readers. tone "light" for the blue hero, "dark" on light screens.
 * In phone mode it becomes an empty spacer the height of the notch area (index.css):
 * the phone shows its own status bar.
 */
export default function StatusBar({ tone = "dark", className = "" }) {
  const color = tone === "light" ? "text-white" : "text-hf-ink-900";
  return (
    <div
      aria-hidden="true"
      className={`hf-statusbar flex h-11 shrink-0 items-center justify-between px-7 pt-1 ${color} ${className}`}
    >
      <span className="text-[15px] font-semibold tracking-tight tabular-nums">9:41</span>
      <span className="flex items-center gap-1.5">
        <CellSignalFull size={16} weight="fill" />
        <WifiHigh size={16} weight="bold" />
        <BatteryFull size={22} weight="fill" />
      </span>
    </div>
  );
}
