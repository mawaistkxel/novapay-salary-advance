import { useState } from "react";

/**
 * Avatar — NovaKit Hi-Fi
 * A photo (`src`) in a white rim, or initials on a soft navy-to-white disc when
 * there's no photo or it fails to load. Decorative next to a visible name, so
 * hidden from screen readers (empty alt).
 */
export default function Avatar({ initials, src, size = "md" }) {
  const [failed, setFailed] = useState(false);
  const sizes = { sm: "h-10 w-10 text-[13px]", md: "h-11 w-11 text-[15px]" };
  const frame = `shrink-0 rounded-full shadow-hf-soft ring-2 ring-white ${sizes[size]}`;

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        onError={() => setFailed(true)}
        className={`${frame} object-cover`}
        draggable="false"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center bg-gradient-to-br from-hf-navy-100 to-white font-medium tracking-tight text-hf-navy-700 ${frame}`}
    >
      {initials}
    </span>
  );
}
