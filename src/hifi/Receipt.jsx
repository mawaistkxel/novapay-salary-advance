import { motion } from "framer-motion";
import { ArrowDownLeft, Percent, CalendarBlank } from "@phosphor-icons/react";
import Money from "./Money";
import { IconBadge } from "./Tile";

/**
 * Receipt — NovaKit Hi-Fi cost disclosure (the hi-fi CostBreakdown).
 * A <dl> in a glass card: You receive → One-time fee → Taken from your wallet on,
 * each with a glass icon chip and a body-size hint; then the total on a liquid
 * navy slab. The total is the loudest thing on the screen on purpose: it's the
 * number the person agrees to. Nothing in it is smaller than 15px.
 */
export default function Receipt({ receivedLabel = "You receive", disbursed, fee, total, date, showHints = true }) {
  const rows = [
    {
      icon: <ArrowDownLeft size={20} />,
      label: receivedLabel,
      hint: "Into your NovaPay wallet",
      value: <Money amount={disbursed} className="text-hf-ink-900" />,
    },
    {
      icon: <Percent size={20} />,
      label: "One-time fee",
      hint: (
        <>
          3% of <Money amount={disbursed} weight="normal" />. No interest.
        </>
      ),
      value: <Money amount={fee} className="text-hf-ink-900" />,
    },
    {
      icon: <CalendarBlank size={20} />,
      label: "Taken from your wallet on",
      hint: "Your next payday",
      value: <span className="text-hf-body font-medium text-hf-ink-900">{date}</span>,
    },
  ];

  return (
    <dl className="hf-glass overflow-hidden rounded-hf-lg p-1.5">
      <div className="divide-y divide-hf-line/80 px-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 py-3.5">
            <IconBadge size="sm">{row.icon}</IconBadge>
            <div className="min-w-0 flex-1">
              <dt className="text-hf-body text-hf-ink-900">{row.label}</dt>
              {showHints && row.hint ? <p className="text-hf-body text-hf-ink-700">{row.hint}</p> : null}
            </div>
            <dd className="shrink-0 text-right">{row.value}</dd>
          </div>
        ))}
      </div>
      <div className="hf-liquid relative mt-1.5 flex items-center justify-between gap-3 rounded-[22px] px-5 py-5 text-white">
        <dt className="text-hf-body text-hf-navy-100">Total you repay</dt>
        <dd>
          <Money amount={total} size="h1" className="text-white" />
        </dd>
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
    {
      when: startLabel,
      what: (
        <>
          <Money amount={disbursed} /> into your wallet
        </>
      ),
    },
    {
      when: date,
      what: (
        <>
          <Money amount={total} /> taken from your wallet
        </>
      ),
    },
  ];
  return (
    <ol className="relative grid grid-cols-2 gap-4" aria-label="Repayment timeline">
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.25 }}
        // Dashed and muted: the repayment hasn't happened yet.
        className="absolute left-[12px] right-[calc(50%-4px)] top-[11px] h-0 origin-left border-t border-dashed border-hf-ink-500"
      />
      {points.map((p, i) => (
        <li key={i} className="relative">
          <span
            aria-hidden="true"
            className={
              "relative mb-3 grid h-6 w-6 place-items-center rounded-full ring-4 ring-white/80 " +
              // Today is done (liquid navy); payday is still to come (hollow, inactive).
              (i === 0 ? "hf-liquid" : "border-2 border-hf-ink-500 bg-white")
            }
          >
            <span className={"h-1.5 w-1.5 rounded-full " + (i === 0 ? "bg-white" : "bg-hf-ink-500")} />
          </span>
          <p className="text-hf-body font-medium text-hf-ink-900">{p.when}</p>
          <p className="text-hf-body text-hf-ink-700">{p.what}</p>
        </li>
      ))}
    </ol>
  );
}
