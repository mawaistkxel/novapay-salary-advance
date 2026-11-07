import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  Bell,
  DeviceMobile,
  Eye,
  EyeSlash,
  HandCoins,
  HourglassMedium,
  PaperPlaneTilt,
  Plus,
  Receipt as ReceiptIcon,
} from "@phosphor-icons/react";
import {
  Avatar,
  Button,
  HeroBackdrop,
  IconBadge,
  Money,
  QuickAction,
  StatusBar,
  TabBar,
  Tile,
  Timeline,
  TxRow,
} from "..";
import { PAYDAY } from "../../data/scenarios";

const USER = { first: "Sana", initials: "SM" };

/**
 * Home (high fidelity). Same props and states as the wireframe Home: not checked
 * yet, checking, active advance, declined, documents submitted. Controls outside
 * the salary advance call onUnavailable, which says plainly that they're not part
 * of this prototype.
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
    <div className="relative flex min-h-0 flex-1 flex-col bg-hf-blue-700">
      <StatusBar tone="light" className="relative z-10 bg-hf-blue-700" />
      <main className="relative flex flex-1 flex-col overflow-y-auto">
        <h1 className="sr-only">NovaPay home</h1>

        <section className="hf-on-blue relative shrink-0 px-5 pb-12 text-white [@media(max-height:700px)]:pb-10" aria-label="Wallet">
          <HeroBackdrop />
          <div className="relative">
            <div className="flex items-center gap-3 pt-2">
              <Avatar initials={USER.initials} />
              <div className="min-w-0 flex-1">
                <p className="text-[17px] font-semibold leading-tight tracking-tight">Hi, {USER.first}</p>
                <p className="text-hf-small text-white">NovaPay wallet</p>
              </div>
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => notHere("Notifications")}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.14] shadow-hf-glass backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95"
              >
                <Bell size={20} weight="bold" />
              </button>
            </div>

            <div className="mt-8 [@media(max-height:700px)]:mt-4">
              <div className="flex items-center gap-2">
                <p className="text-hf-body text-white">Available balance</p>
                <button
                  type="button"
                  onClick={() => setHidden((h) => !h)}
                  aria-pressed={hidden}
                  aria-label={hidden ? "Show balance" : "Hide balance"}
                  className="-m-2 grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
                >
                  {hidden ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
                </button>
              </div>
              <div className="mt-1 h-12">
                {hidden ? (
                  <span className="text-hf-hero tracking-[0.08em]">
                    <span className="sr-only">Balance hidden</span>
                    <span aria-hidden="true">Rs ••••••</span>
                  </span>
                ) : (
                  <Money amount={balance} size="hero" className="text-white" />
                )}
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2 [@media(max-height:700px)]:mt-4">
              <QuickAction icon={<PaperPlaneTilt size={18} weight="bold" />} label="Send" onClick={() => notHere("Send")} />
              <QuickAction icon={<Plus size={18} weight="bold" />} label="Top up" onClick={() => notHere("Top up")} />
              <QuickAction icon={<ReceiptIcon size={18} weight="bold" />} label="Pay bills" onClick={() => notHere("Pay bills")} />
            </div>
          </div>
        </section>

        <motion.div
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 26 }}
          className="relative -mt-6 flex-1 space-y-4 rounded-t-hf-lg bg-hf-page px-4 pb-28 pt-5 shadow-hf-sheet"
        >
          <Tile className="space-y-4 p-5">{renderAdvance()}</Tile>

          <Tile className="px-5 pb-2 pt-5">
            <h2 className="text-hf-h2 text-hf-ink-900">Recent activity</h2>
            <ul className="mt-1 divide-y divide-hf-line">
              {advance ? (
                <TxRow
                  icon={<HandCoins size={20} weight="bold" />}
                  title="Salary advance"
                  subtitle={`Today · repaid ${PAYDAY}`}
                  amount={advance.disbursed}
                  direction="advance"
                />
              ) : null}
              <TxRow icon={<PaperPlaneTilt size={20} weight="bold" />} title="Sent to Ahmed K." subtitle="Today, 2:14 PM" amount={1500} direction="out" />
              <TxRow icon={<ArrowDownLeft size={20} weight="bold" />} title="Salary credited" subtitle="28 Jun" amount={68000} direction="in" />
              <TxRow icon={<DeviceMobile size={20} weight="bold" />} title="Mobile top-up" subtitle="27 Jun" amount={500} direction="out" />
            </ul>
          </Tile>
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
          <HandCoins size={18} weight="bold" />
        </IconBadge>
        <p className="flex-1 text-hf-body font-semibold text-hf-ink-900">Salary advance</p>
        {extra}
      </div>
    );
  }

  function renderAdvance() {
    if (advance) {
      return (
        <>
          {label(
            <span className="rounded-full bg-hf-blue-50 px-2.5 py-1 text-hf-small text-hf-blue-700">Active</span>
          )}
          <p className="text-hf-body text-hf-ink-700">
            <Money amount={advance.total} className="text-hf-ink-900" /> will be taken from your wallet on{" "}
            {PAYDAY}, your next payday.
          </p>
          <div className="rounded-hf-sm bg-hf-mist p-4">
            <Timeline disbursed={advance.disbursed} total={advance.total} date={PAYDAY} />
          </div>
        </>
      );
    }
    if (documentsSubmitted) {
      return (
        <>
          {label()}
          <div className="flex gap-3 rounded-hf-sm bg-hf-mist p-4">
            <HourglassMedium aria-hidden="true" size={22} weight="duotone" className="shrink-0 text-hf-blue-700" />
            <p className="text-hf-body text-hf-ink-900">
              We're checking the document you sent. We'll let you know when it's done.
            </p>
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
          <p className="text-hf-h2 text-hf-ink-900">Need cash before payday?</p>
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
