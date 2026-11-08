import magnifier from "../assets/illustrations/magnifier.png";
import chart from "../assets/illustrations/chart.png";
import shield from "../assets/illustrations/shield.png";
import disguise from "../assets/illustrations/disguise.png";

/**
 * Illustration — a small 3D navy spot illustration from the Nova Lite Figma file
 * (Components → Illustrations: "handglass front", "scedule front", "shield front"), exported at
 * 192px with a transparent background.
 *
 * Decorative only (empty alt, hidden from screen readers): the words carry the
 * message. Used to soften bad news, never to sell. No coins, locks or crosses:
 * money imagery would sell, and a lock or cross would read as punishment.
 *
 * name: magnifier ("we need to check something") | chart ("based on your history")
 *       | shield (Verify income: "your document is handled with care")
 *       | disguise (Terms, reduced amount: hat, glasses and moustache, supplied
 *         by me from Figma on 8 Nov). Its background is solid white, not
 *         transparent, so it only sits on a white circle.
 * size: sm 28px (inside a 40px IconBadge on the Home card) | lg 72px (screen header)
 */
const SOURCES = { magnifier, chart, shield, disguise };
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
