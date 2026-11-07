import { motion } from "framer-motion";

/**
 * QuickAction — NovaKit Hi-Fi
 * Frosted glass tile on the blue hero: white icon disc + label. The glass is
 * white/10: the label measures 4.63:1 at the hero's lightest point (blue-600)
 * and more above it. At white/14 it dropped to 4.30:1, so don't go lighter.
 */
export default function QuickAction({ icon, label, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="flex flex-col items-start gap-3 [@media(max-height:700px)]:flex-row [@media(max-height:700px)]:items-center [@media(max-height:700px)]:gap-2 [@media(max-height:700px)]:p-2 rounded-hf-md bg-white/10 p-3 text-left text-white shadow-hf-glass backdrop-blur-md transition-shadow hover:ring-1 hover:ring-inset hover:ring-white/50"
    >
      <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-hf-blue-700 [@media(max-height:700px)]:h-8 [@media(max-height:700px)]:w-8">
        {icon}
      </span>
      <span className="text-[14px] font-semibold leading-tight">{label}</span>
    </motion.button>
  );
}
