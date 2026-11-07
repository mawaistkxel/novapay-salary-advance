/**
 * Logo — NovaKit Hi-Fi (prototype mark, not a real NovaPay asset)
 * A minimal geometric mark: a segmented "N" (two rounded uprights and a
 * separate diagonal stroke, with gaps between the pieces), next to a
 * medium-weight wordmark. One colour (currentColor, navy-900 by default); the
 * diagonal is softened for a touch of depth.
 *
 * Props
 *   as        element for the wrapper (h1 on Home, so the logo is the page title)
 *   showWord  false renders the mark alone (it then carries the accessible name)
 *   className colour / size overrides
 */
export default function Logo({ as: Tag = "span", showWord = true, className = "" }) {
  return (
    <Tag className={`inline-flex items-center gap-2 text-hf-navy-900 ${className}`}>
      <svg
        viewBox="0 0 28 28"
        className="h-7 w-7 shrink-0"
        fill="currentColor"
        role={showWord ? undefined : "img"}
        aria-hidden={showWord ? "true" : undefined}
        aria-label={showWord ? undefined : "NovaPay"}
      >
        <rect x="2" y="3" width="6.5" height="22" rx="3.25" />
        <line
          x1="12"
          y1="7.5"
          x2="16"
          y2="20.5"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <rect x="19.5" y="3" width="6.5" height="22" rx="3.25" />
      </svg>
      {showWord ? (
        <span className="text-[21px] font-medium leading-none tracking-[-0.035em]">NovaPay</span>
      ) : null}
    </Tag>
  );
}
