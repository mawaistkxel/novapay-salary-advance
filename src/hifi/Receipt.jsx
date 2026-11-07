import { motion } from "framer-motion";
import { ArrowDownLeft, Percent, CalendarBlank } from "@phosphor-icons/react";
import Money from "./Money";
import { IconBadge } from "./Tile";

/**
 * Receipt — NovaKit Hi-Fi cost disclosure (the hi-fi CostBreakdown).
 * A <dl> on a white tile: You receive → One-time fee → Taken from your wallet on,
 * each with an icon and a body-size hint, then a navy band carrying the total to
 * repay. The total is the loudest thing on the screen on purpose: it's the number
 * the person is agreeing to. Nothing in it is smaller than 15px.
 *
 * Props
 *   receivedLabel  "You receive" | "You received"
 *   disbursed, fee, total (integers), date (string), showHints (bool)
 */
export default function Receipt({ receivedLabel = "You receive", disbursed, fee, total, date, showHints = true }) {
  const rows = [
    {
      icon: <ArrowDownLeft size={20} weight="bold" />,
      label: receivedLabel,
      hint: "Into your NovaPay wallet",
      value: <Money amount={disbursed} className="text-hf-ink-900" />,
    },
    {
      icon: <Percent size={20} weight="bold" />,
      label: "One-time fee",
      hint: (
        <>
          3% of <Money amount={disbursed} weight="normal" />. No interest.
        </>
      ),
      value: <Money amount={fee} className="text-hf-ink-900" />,
    },
    {
      icon: <CalendarBlank size={20} weight="bold" />,
      label: "Taken from your wallet on",
      hint: "Your next payday",
      value: <span className="text-hf-body font-semibold text-hf-ink-900">{date}</span>,
    },
  ];

  return (
    <dl className="overflow-hidden rounded-hf-lg bg-white shadow-hf-soft">
      <div className="divide-y divide-hf-line px-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 py-4">
            <IconBadge size="sm">{row.icon}</IconBadge>
            <div className="min-w-0 flex-1">
              <dt className="text-hf-body text-hf-ink-900">{row.label}</dt>
              {showHints && row.hint ? (
                <p className="text-hf-body text-hf-ink-700">{row.hint}</p>
              ) : null}
            </div>
            <dd className="shrink-0 text-right">{row.value}</dd>
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden bg-gradient-to-br from-hf-navy-800 to-hf-navy-900 px-5 py-5 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-hf-blue-600/40 blur-2xl"
        />
        <div className="relative flex items-end justify-between gap-3">
          <dt className="text-hf-body text-hf-blue-100">Total you repay</dt>
          <dd>
            <Money amount={total} size="h1" className="text-white" />
          </dd>
        </div>
      </div>
    </dl>
  );
}

/**
 * Timeline — NovaKit Hi-Fi
 * The advance in time, two points only: what lands today and what leaves on
 * payday. No day counts (the prototype doesn't know "today"). The line draws
 * itself once; under reduced motion it's simply there.
 */
export function Timeline({ disbursed, total, date, startLabel = "Today" }) {
  const points = [
    { when: startLabel, what: <>
        <Money amount={disbursed} /> into your wallet
      </> },
    { when: date, what: <>
        <Money amount={total} /> taken from your wallet
      </> },
  ];
  return (
    <ol className="relative grid grid-cols-2 gap-4" aria-label="Repayment timeline">
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.25 }}
        className="absolute left-[12px] right-[calc(50%-4px)] top-[11px] h-[2px] origin-left bg-gradient-to-r from-hf-blue-600 to-hf-navy-900"
      />
      {points.map((p, i) => (
        <li key={i} className="relative">
          <span
            aria-hidden="true"
            className={
              "relative z-10 mb-3 grid h-6 w-6 place-items-center rounded-full ring-4 ring-white " +
              (i === 0 ? "bg-hf-blue-600" : "bg-hf-navy-900")
            }
          >
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
          <p className="text-hf-body font-semibold text-hf-ink-900">{p.when}</p>
          <p className="text-hf-body text-hf-ink-700">{p.what}</p>
        </li>
      ))}
    </ol>
  );
}
