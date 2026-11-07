import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Toast } from "./novakit";
import { Toast as HfToast } from "./hifi";
import HomeScreen from "./screens/HomeScreen";
import AmountScreen from "./screens/AmountScreen";
import TermsScreen from "./screens/TermsScreen";
import DoneScreen from "./screens/DoneScreen";
import DeclineScreen from "./screens/DeclineScreen";
import VerifyIncomeScreen from "./screens/VerifyIncomeScreen";
import HfHomeScreen from "./hifi/screens/HomeScreen";
import HfAmountScreen from "./hifi/screens/AmountScreen";
import HfTermsScreen from "./hifi/screens/TermsScreen";
import HfDoneScreen from "./hifi/screens/DoneScreen";
import HfDeclineScreen from "./hifi/screens/DeclineScreen";
import HfVerifyIncomeScreen from "./hifi/screens/VerifyIncomeScreen";
import DemoSwitcher from "./DemoSwitcher";
import ViewToggle from "./ViewToggle";
import {
  SCENARIOS,
  STARTING_BALANCE,
  disbursedFor,
  feeFor,
  totalFor,
} from "./data/scenarios";

// Simulated network/risk-check delays, so loading states are visible.
const CHECK_MS = 900;
const ACCEPT_MS = 1100;

// Two visual layers over one flow. Both screen sets take identical props, so
// the state machine below is shared and the two views can't drift apart.
const SCREENS = {
  wire: {
    Home: HomeScreen,
    Amount: AmountScreen,
    Terms: TermsScreen,
    Done: DoneScreen,
    Decline: DeclineScreen,
    Verify: VerifyIncomeScreen,
  },
  hifi: {
    Home: HfHomeScreen,
    Amount: HfAmountScreen,
    Terms: HfTermsScreen,
    Done: HfDoneScreen,
    Decline: HfDeclineScreen,
    Verify: HfVerifyIncomeScreen,
  },
};

// The view lives in the URL (?view=hifi) so a link can open either one.
function viewFromUrl() {
  if (typeof window === "undefined") return "wire";
  return new URLSearchParams(window.location.search).get("view") === "hifi" ? "hifi" : "wire";
}

const INITIAL = {
  screen: "home", // home | amount | terms | done | declined | verify
  applied: null, // applied_amount
  disbursed: null, // disbursed_amount (after any haircut)
  consent: false,
  busy: null, // which action is loading: check | quote | accept | upload
  acceptError: false,
  acceptAttempts: 0,
  advance: null, // { disbursed, fee, total } once accepted
  declined: false,
  documentsSubmitted: false,
};

/**
 * Salary-advance prototype. Screens are a small state machine in this file
 * (no router). The demo scenario switcher sits outside the phone frame.
 */
export default function App() {
  const [scenarioKey, setScenarioKey] = useState("approved");
  const [view, setView] = useState(viewFromUrl);
  const [s, setS] = useState(INITIAL);
  const [toast, setToast] = useState(null);
  const timers = useRef([]);

  const scenario = SCENARIOS[scenarioKey];
  const update = (patch) => setS((prev) => ({ ...prev, ...patch }));

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms));
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function showToast(message, icon) {
    setToast({ message, icon });
    later(() => setToast(null), 3200);
  }

  function reset(nextKey = scenarioKey) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setToast(null);
    setScenarioKey(nextKey);
    setS(INITIAL);
  }

  // Home → eligibility check → amount (approved) or decline.
  function seeOffer() {
    update({ busy: "check" });
    later(() => {
      if (scenario.decision === "approved") update({ busy: null, screen: "amount" });
      else update({ busy: null, screen: "declined", declined: true });
    }, CHECK_MS);
  }

  // Amount → risk check on the requested amount (haircut happens here) → terms.
  function seeFullCost() {
    update({ busy: "quote" });
    later(() => {
      update({
        busy: null,
        screen: "terms",
        disbursed: disbursedFor(scenario, s.applied),
        consent: false,
        acceptError: false,
      });
    }, CHECK_MS);
  }

  function accept() {
    if (s.busy) return;
    update({ busy: "accept", acceptError: false });
    const attempt = s.acceptAttempts + 1;
    later(() => {
      if (scenario.failFirstAccept && attempt === 1) {
        update({ busy: null, acceptError: true, acceptAttempts: attempt });
        return;
      }
      update({
        busy: null,
        acceptAttempts: attempt,
        screen: "done",
        advance: { disbursed: s.disbursed, fee: feeFor(s.disbursed), total: totalFor(s.disbursed) },
      });
    }, ACCEPT_MS);
  }

  function notNow() {
    update({ screen: "home", applied: null, disbursed: null, consent: false, acceptError: false });
    showToast("No advance taken. Nothing has changed in your wallet.", null);
  }

  function upload() {
    update({ busy: "upload" });
    later(() => {
      update({ busy: null, screen: "home", documentsSubmitted: true });
      showToast("Document sent. We'll let you know when we've checked it.");
    }, ACCEPT_MS);
  }

  // Switching view keeps the flow state: same screen, same choices.
  function changeView(next) {
    setView(next);
    const url = new URL(window.location.href);
    if (next === "hifi") url.searchParams.set("view", "hifi");
    else url.searchParams.delete("view");
    window.history.replaceState(null, "", url);
  }

  // Hi-fi Home has wallet controls the prototype doesn't build; say so plainly.
  function unavailable(what) {
    showToast(`${what} isn't part of this prototype. Only the salary advance works here.`, null);
  }

  const hifi = view === "hifi";
  const S = SCREENS[view];
  const balance = STARTING_BALANCE + (s.advance ? s.advance.disbursed : 0);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={
          "min-h-screen w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 py-6 transition-colors duration-500 " +
          (hifi ? "bg-gradient-to-br from-hf-blue-100 via-hf-page to-hf-blue-50" : "")
        }
      >
        {/* Fixed height, never taller than the viewport, so overlays (Toast, BottomSheet)
            pin to the visible bottom of the screen. Content scrolls inside each screen. */}
        <div
          data-view={view}
          className={
            "relative w-[390px] max-w-full shrink-0 h-[min(844px,calc(100dvh-48px))] flex flex-col rounded-[28px] overflow-hidden " +
            (hifi
              ? "font-geist bg-hf-page shadow-hf-float sm:rounded-[44px] sm:ring-[7px] sm:ring-hf-ink-900"
              : "bg-white shadow-xl border border-neutral-300")
          }
        >
          {renderScreen()}
          {hifi ? (
            <HfToast open={!!toast} message={toast?.message} icon={toast?.icon === null ? null : "check"} />
          ) : (
            <Toast open={!!toast} message={toast?.message} icon={toast?.icon} />
          )}
        </div>

        <div className="w-[calc(100%-32px)] max-w-[390px] lg:w-64 space-y-5">
          <ViewToggle value={view} onChange={changeView} />
          <DemoSwitcher
            scenarios={SCENARIOS}
            value={scenarioKey}
            onChange={(key) => reset(key)}
            onReset={() => reset()}
          />
        </div>
      </div>
    </MotionConfig>
  );

  function renderScreen() {
    switch (s.screen) {
      case "amount":
        return (
          <S.Amount
            key="amount"
            limit={scenario.limit}
            value={s.applied}
            onChange={(applied) => update({ applied })}
            onBack={() => update({ screen: "home" })}
            onContinue={seeFullCost}
            checking={s.busy === "quote"}
          />
        );
      case "terms":
        return (
          <S.Terms
            key="terms"
            applied={s.applied}
            disbursed={s.disbursed}
            consent={s.consent}
            onConsent={(consent) => update({ consent })}
            accepting={s.busy === "accept"}
            acceptError={s.acceptError}
            onAccept={accept}
            onDecline={notNow}
            onBack={() => update({ screen: "amount", acceptError: false })}
          />
        );
      case "done":
        return (
          <S.Done
            key="done"
            {...s.advance}
            onDone={() => update({ screen: "home" })}
          />
        );
      case "declined":
        return (
          <S.Decline
            key="declined"
            reason={scenario.denial_reason}
            onVerify={() => update({ screen: "verify" })}
            onHome={() => update({ screen: "home" })}
          />
        );
      case "verify":
        return (
          <S.Verify
            key="verify"
            uploading={s.busy === "upload"}
            onUpload={upload}
            onBack={() => update({ screen: "declined" })}
          />
        );
      default:
        return (
          <S.Home
            key="home"
            balance={balance}
            advance={s.advance}
            declined={s.declined}
            documentsSubmitted={s.documentsSubmitted}
            checking={s.busy === "check"}
            onSeeOffer={seeOffer}
            onSeeDecline={() => update({ screen: "declined" })}
            onUnavailable={unavailable}
          />
        );
    }
  }
}
