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
  Money,
  QuickAction,
  RoundButton,
  StatusBar,
  TabBar,
  Tile,
  Timeline,
  TxRow,
} from "..";
import { PAYDAY } from "../../data/scenarios";

// Prototype persona. Photo: Mahnoor Ikram on Unsplash (Unsplash License, free to
// use): https://unsplash.com/photos/mA8tRLbBeDk. Loaded from Unsplash's CDN,
// face-cropped at 2x; if it can't load, Avatar falls back to the initials.
const USER = {
  first: "Sana",
  last: "Mirza",
  initials: "SM",
  photo: "https://images.unsplash.com/photo-1734865812496-b2fe2e1a56ca?w=96&h=96&fit=crop&crop=faces&auto=format&q=80",
};

const spring = { type: "spring", stiffness: 260, damping: 30 };
const list = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: spring } };

/**
 * Home (high fidelity). Same props and states as the wireframe Home: not checked
 * yet, checking, active advance, declined, documents submitted.
 *
 * Layout follows the reference: greeting, a glass balance card with one liquid
 * navy control, round glass quick actions, then the salary advance and recent
 * activity over a slate haze, with a floating glass tab bar. Wallet controls the
 * prototype doesn't build call onUnavailable, which says so.
 */
export default function HomeScreen({
  balance,
  advance,
  declined,
  documentsSubmitted,
  checking,
  onSeeOffer,
  onSeeDecline,
  onUnavailable,
}) {
  const [hidden, setHidden] = useState(false);
  const notHere = (what) => onUnavailable?.(what);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-hf-page">
      {/* Light from the top right, slate haze rising from the bottom (decorative). */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white blur-3xl" />
      <div aria-hidden="true" className="hf-haze pointer-events-none absolute inset-x-0 bottom-0 h-[58%]" />

      <StatusBar tone="dark" className="relative" />
      <main className="relative flex-1 overflow-y-auto px-5 pb-32 pt-1">
        <h1 className="sr-only">NovaPay home</h1>
        <motion.div variants={list} initial="hidden" animate="show" className="space-y-6">
          <motion.header variants={rise} className="flex items-center gap-3">
            <Avatar initials={USER.initials} src={USER.photo} />
            <div className="min-w-0 flex-1">
              <p className="text-hf-small text-hf-ink-700">Welcome back</p>
              <p className="text-[17px] font-medium leading-tight tracking-tight text-hf-ink-900">
                {USER.first} {USER.last}
              </p>
            </div>
            <RoundButton label="Notifications" onClick={() => notHere("Notifications")}>
              <Bell size={20} />
            </RoundButton>
          </motion.header>

          <motion.section variants={rise} aria-label="Wallet" className="hf-glass hf-grain relative isolate overflow-hidden rounded-hf-lg p-5">
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
            <Tile tone="strong" className="space-y-4 p-5">
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
  function label(extra = null) {
    return (
      <div className="flex items-center gap-3">
        <IconBadge size="sm">
          <HandCoins size={20} />
        </IconBadge>
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
          <p className="text-hf-body text-hf-ink-700">
            <Money amount={advance.total} className="text-hf-ink-900" /> will be taken from your wallet on {PAYDAY},
            your next payday.
          </p>
          <div className="rounded-hf-md bg-hf-mist p-4">
            <Timeline disbursed={advance.disbursed} total={advance.total} date={PAYDAY} />
          </div>
        </>
      );
    }
    if (documentsSubmitted) {
      return (
        <>
          {label()}
          <div className="flex gap-3 rounded-hf-md bg-hf-mist p-4">
            <HourglassMedium aria-hidden="true" size={22} className="shrink-0 text-hf-navy-600" />
            <p className="text-hf-body text-hf-ink-900">We're checking the document you sent. We'll let you know when it's done.</p>
          </div>
        </>
      );
    }
    if (declined) {
      // Don't keep inviting someone to an offer they were just declined for.
      return (
        <>
          {label()}
          <p className="text-hf-body text-hf-ink-700">Not available to you right now.</p>
          <Button variant="secondary" onClick={onSeeDecline}>
            See why and what you can do
          </Button>
        </>
      );
    }
    return (
      <>
        {label()}
        <div className="space-y-1">
          <p className="text-[20px] leading-[26px] tracking-[-0.02em] text-hf-ink-900">Need cash before payday?</p>
          <p className="text-hf-body text-hf-ink-700">
            You may qualify for a NovaPay salary advance. Checking won't take any money.
          </p>
        </div>
        <Button size="lg" loading={checking} onClick={onSeeOffer}>
          {checking ? "Checking…" : "See your offer"}
        </Button>
      </>
    );
  }
}
