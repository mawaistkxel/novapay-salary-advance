/**
 * Avatar — NovaKit Hi-Fi
 * Initials on a soft navy-to-white disc with a white rim, for people and payees.
 * Decorative next to a visible name, so hidden from screen readers.
 */
export default function Avatar({ initials, size = "md" }) {
  const sizes = { sm: "h-10 w-10 text-[13px]", md: "h-11 w-11 text-[15px]" };
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-hf-navy-100 to-white font-medium tracking-tight text-hf-navy-700 shadow-hf-soft ring-2 ring-white ${sizes[size]}`}
    >
      {initials}
    </span>
  );
}
