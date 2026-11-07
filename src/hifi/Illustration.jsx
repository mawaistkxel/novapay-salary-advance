import magnifier from "../assets/illustrations/magnifier.png";
import chart from "../assets/illustrations/chart.png";

/**
 * Illustration — a small 3D navy spot illustration from the Nova Lite Figma file
 * (Components → Illustrations: "handglass front", "scedule front"), exported at
 * 192px with a transparent background.
 *
 * Decorative only (empty alt, hidden from screen readers): the words carry the
 * message. Used to soften bad news, never to sell. No coins, locks or crosses:
 * money imagery would sell, and a lock or cross would read as punishment.
 *
 * name: magnifier ("we need to check something") | chart ("based on your history")
 * size: sm 28px (inside a 40px IconBadge on the Home card) | lg 72px (screen header)
 */
const SOURCES = { magnifier, chart };
const SIZES = { sm: "h-7 w-7", lg: "h-[72px] w-[72px]" };

export default function Illustration({ name, size = "lg", className = "" }) {
  return (
    <img
      src={SOURCES[name]}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`shrink-0 select-none object-contain ${SIZES[size]} ${className}`}
    />
  );
}

/** Which illustration goes with a decline reason (hi-fi only). */
export const declineIllustration = (reason) => (reason === "credit_score" ? "chart" : "magnifier");
