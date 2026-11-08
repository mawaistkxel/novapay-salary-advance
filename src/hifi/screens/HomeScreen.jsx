import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Buildings,
  DeviceMobile,
  Eye,
  EyeSlash,
  HandCoins,
  HourglassMedium,
  PaperPlaneTilt,
  Plus,
  QrCode,
  Receipt as ReceiptIcon,
  Wallet,
} from "@phosphor-icons/react";
import {
  Avatar,
  Button,
  IconBadge,
  Illustration,
  declineIllustration,
  Logo,
  Money,
  QuickAction,
  RoundButton,
  StatusBar,
  TabBar,
  Tile,
  TxRow,
} from "..";
import { PAYDAY } from "../../data/scenarios";
import { declineCopyFor } from "../../data/declineCopy";

const spring = { type: "spring", stiffness: 260, damping: 30 };
const list = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: spring } };

/**
 * Home (high fidelity). Same props and states as the wireframe Home: available,
 * declined (per reason), active advance, documents submitted. Eligibility is
 * known upfront, so there's no "check" step that can end in a no.
 *
 * Layout follows the reference: greeting, a glass balance card with one liquid
 * navy control, round glass quick actions, then the salary advance and recent
 * activity over a slate haze, with a floating glass tab bar. Wallet controls the
 * prototype doesn't build call onUnavailable, which says so.
 */
export default function HomeScreen({
  balance,
  advance,
  declineReason,
  documentsSubmitted,
  onSeeOffer,
  onSeeDecline,
  onUnavailable,
}) {
  const [hidden, setHidden] = useState(false);
  const notHere = (what) => onUnavailable?.(what);
  const isOffer = !advance && !documentsSubmitted && !declineReason;
  // Documents sent: the whole card is the navy status panel (my call), no title row.
  const isChecking = !advance && documentsSubmitted;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-hf-page">
      {/* Light from the top right, slate haze rising from the bottom (decorative). */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white blur-3xl" />
      <div aria-hidden="true" className="hf-haze pointer-events-none absolute inset-x-0 bottom-0 h-[58%]" />

      <StatusBar tone="dark" className="relative" />
      <main className="hf-home-main relative flex-1 overflow-y-auto px-5 pb-32 pt-1">
        <motion.div variants={list} initial="hidden" animate="show" className="space-y-5">
          <motion.header variants={rise} className="flex items-center gap-3">
            {/* The logo is the page title, so it's the h1 (replaces a hidden one). */}
            <Logo as="h1" className="flex-1" />
            <RoundButton label="Notifications" onClick={() => notHere("Notifications")}>
              <Bell size={20} />
            </RoundButton>
          </motion.header>

          <motion.section variants={rise} aria-label="Wallet" className="hf-glass hf-glass-light hf-grain relative isolate overflow-hidden rounded-hf-lg p-5">
            <div className="flex items-center gap-2">
              <Wallet aria-hidden="true" size={18} className="text-hf-ink-700" />
              <p className="flex-1 text-hf-body text-hf-ink-700">Available balance</p>
              <RoundButton
                tone="navy"
                label={hidden ? "Show balance" : "Hide balance"}
                pressed={hidden}
                onClick={() => setHidden((h) => !h)}
              >
                {hidden ? <EyeSlash size={18} /> : <Eye size={18} />}
              </RoundButton>
            </div>
            <div className="mt-4 h-[46px] text-hf-ink-900">
              {hidden ? (
                <span className="text-hf-hero">
                  <span className="sr-only">Balance hidden</span>
                  <span aria-hidden="true">
                    <span className="mr-2 text-[20px] opacity-70">Rs</span>••••••
                  </span>
                </span>
              ) : (
                <Money amount={balance} size="hero" />
              )}
            </div>
          </motion.section>

          <motion.section variants={rise} aria-label="Quick actions">
            <div className="grid grid-cols-4 gap-2">
              <QuickAction icon={<PaperPlaneTilt size={22} />} label="Send" onClick={() => notHere("Send")} />
              <QuickAction icon={<Plus size={22} />} label="Add money" onClick={() => notHere("Add money")} />
              <QuickAction icon={<ReceiptIcon size={22} />} label="Pay bills" onClick={() => notHere("Pay bills")} />
              <QuickAction icon={<QrCode size={22} />} label="Scan" onClick={() => notHere("Scan to pay")} />
            </div>
          </motion.section>

          <motion.div variants={rise}>
            {/* The offer is the one navy surface on Home: attention from contrast and
                plain facts, not hype. Every later state (active, declined, documents
                sent) goes back to light glass: no loud card for bad news or a debt. */}
            <Tile tone={isOffer || isChecking ? "navy" : "strong"} className={isOffer ? "space-y-3.5 p-5" : isChecking ? "p-5" : "space-y-4 p-5"}>
              {renderAdvance()}
            </Tile>
          </motion.div>

          <motion.section variants={rise} aria-labelledby="hf-recent">
            <h2 id="hf-recent" className="mb-3 text-hf-h2 font-normal text-hf-ink-900">
              Recent activity
            </h2>
            <Tile tone="strong" as="ul" className="divide-y divide-hf-line/80 px-4 py-1">
              {advance ? (
                <TxRow
                  icon={<HandCoins size={20} />}
                  title="Salary advance"
                  subtitle={`Today, repaid ${PAYDAY}`}
                  amount={advance.disbursed}
                  direction="advance"
                />
              ) : null}
              <TxRow leading={<Avatar initials="AK" size="sm" />} title="Sent to Ahmed K." subtitle="Today, 2:14 PM" amount={1500} direction="out" />
              <TxRow icon={<Buildings size={20} />} title="Salary credited" subtitle="28 Jun" amount={68000} direction="in" />
              <TxRow icon={<DeviceMobile size={20} />} title="Mobile top-up" subtitle="27 Jun" amount={500} direction="out" />
            </Tile>
          </motion.section>
        </motion.div>
      </main>
      <TabBar active="home" onUnavailable={notHere} />
    </div>
  );

  // A render helper, not a nested component (that would remount on every render).
  function label(extra = null, leading = null) {
    return (
      <div className="flex items-center gap-3">
        {leading || (
          <IconBadge size="sm" tone="grey">
            <HandCoins size={20} />
          </IconBadge>
        )}
        <p className="flex-1 text-hf-body font-medium text-hf-ink-900">Salary advance</p>
        {extra}
      </div>
    );
  }

  function renderAdvance() {
    if (advance) {
      return (
        <>
          {label(<span className="rounded-full bg-hf-navy-50 px-2.5 py-1 text-hf-small font-medium text-hf-navy-700">Active</span>)}
          {/* The two facts that matter, made scannable (8 Nov): the amount large, the
              date in primary ink. Calm, not alarming: no colour, no countdown. */}
          <div>
            <p>
              <Money amount={advance.total} size="h1" className="text-hf-ink-900" />
            </p>
            <p className="mt-1 text-hf-body text-hf-ink-700">
              will be taken from your wallet on <span className="font-medium text-hf-ink-900">{PAYDAY}</span>.
            </p>
          </div>
        </>
      );
    }
    if (documentsSubmitted) {
      return (
        <>
          <h2 className="sr-only">Salary advance</h2>
          <div className="flex gap-3">
            <HourglassMedium aria-hidden="true" size={22} className="shrink-0 text-hf-navy-100" />
            <p className="text-hf-body text-white">We're checking the document you sent. We'll let you know when it's done.</p>
          </div>
        </>
      );
    }
    if (declineReason) {
      // Quiet, and no reason on Home: it shows what's needed or "not available",
      // and the reason sits one tap away. Never an offer they can't have.
      const copy = declineCopyFor(declineReason);
      return (
        <>
          {label(
            null,
            // A 40px circle like the other states, tinted so it shows on the white card.
            <IconBadge size="sm" tone="soft">
              <Illustration name={declineIllustration(declineReason)} size="sm" />
            </IconBadge>,
          )}
          <p className="text-hf-body text-hf-ink-700">{copy.home}</p>
          <Button onClick={onSeeDecline}>
            {copy.homeAction}
          </Button>
        </>
      );
    }
    return (
      <>
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/20"
          >
            <HandCoins size={18} />
          </span>
          <h2 className="flex-1 text-hf-body font-medium text-hf-navy-100">Need cash before payday?</h2>
        </div>
        <p className="text-hf-body text-hf-navy-100">
          Repaid automatically on your next payday. One fee of 3%, no interest.
        </p>
        <Button variant="inverse" size="lg" onClick={onSeeOffer}>
          See amounts and cost
        </Button>
        {/* Depth: two faint rings in the top-right corner (decorative). Last child,
            so it doesn't shift the vertical rhythm. */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 -z-10 !mt-0">
          <div className="h-44 w-44 rounded-full ring-1 ring-white/10" />
          <div className="absolute -inset-8 rounded-full ring-1 ring-white/[0.06]" />
        </div>
      </>
    );
  }
}
