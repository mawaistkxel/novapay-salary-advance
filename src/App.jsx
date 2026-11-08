import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { IconContext } from "@phosphor-icons/react";
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
import PhoneNotification from "./PhoneNotification";
import PhoneDemo from "./PhoneDemo";
import ViewToggle from "./ViewToggle";
import {
  SCENARIOS,
  STARTING_BALANCE,
  disbursedFor,
  feeFor,
  totalFor,
} from "./data/scenarios";

// Simulated network/risk-check delays, so loading states are visible.
// CHECK_MS is the quote on the Amount screen (where a haircut can apply).
const CHECK_MS = 900;
const ACCEPT_MS = 1100;
// How long the payday reminder banner stays up, like a phone notification.
const REMINDER_MS = 8000;

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

// Phone mode (8 Nov): on a phone held upright (narrower than Tailwind's sm, 640px)
// the hi-fi app fills the screen: no device frame, no fake status bar, no
// wireframe. The demo controls move into a small "Demo" tab (PhoneDemo).
const PHONE_QUERY = "(max-width: 639px)";
function usePhone() {
  const [phone, setPhone] = useState(
    () => typeof window !== "undefined" && window.matchMedia(PHONE_QUERY).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY);
    const onChange = () => setPhone(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return phone;
}

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
  busy: null, // which action is loading: quote | accept | upload
  acceptError: false,
  acceptAttempts: 0,
  advance: null, // { disbursed, fee, total } once accepted
  documentsSubmitted: false,
  reminder: null, // id of the payday reminder notification while it's showing
};

/**
 * Salary-advance prototype. Screens are a small state machine in this file
 * (no router). The demo scenario switcher sits outside the phone frame.
 */
export default function App() {
  const [scenarioKey, setScenarioKey] = useState("approved");
  const [viewChoice, setView] = useState(viewFromUrl);
  const phone = usePhone();
  // A phone always gets the hi-fi app; the toggle and the wireframe stay on larger screens.
  const view = phone ? "hifi" : viewChoice;
  const [s, setS] = useState(INITIAL);
  const [toast, setToast] = useState(null);
  const timers = useRef([]);

  const scenario = SCENARIOS[scenarioKey];
  const update = (patch) => setS((prev) => ({ ...prev, ...patch }));

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms));
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // tone "caution" is for a failed action: shown longer, announced assertively.
  function showToast(message, icon, { title, tone, ms = 3200 } = {}) {
    const id = Date.now() + Math.random();
    setToast({ id, message, icon, title, tone });
    later(() => setToast((t) => (t && t.id === id ? null : t)), ms);
  }

  function reset(nextKey = scenarioKey) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setToast(null);
    setScenarioKey(nextKey);
    setS(INITIAL);
  }

  // Eligibility is pre-assessed (an assumption, see docs/DECISIONS.md), so Home
  // already knows the answer: approved users go straight to the amounts, and a
  // declined user never taps "check" only to be told no.
  const declineReason = scenario.decision === "approved" ? null : scenario.denial_reason || "other";

  function seeOffer() {
    update({ screen: "amount" });
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
        // Hi-fi shows the failure in the island at the top (like other feedback);
        // the wireframe keeps its inline caution Notice above Accept.
        if (view === "hifi") {
          showToast("No money was moved and nothing will be taken from your wallet. Please try again.", "warning", {
            title: "That didn't go through",
            tone: "caution",
            ms: 6000,
          });
        }
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

  // Demo panel (hi-fi only): send the payday reminder as a phone notification.
  // Only possible once an advance exists (the button is disabled before that).
  function sendReminder() {
    if (!s.advance) return;
    const id = Date.now() + Math.random();
    update({ reminder: id });
    later(() => setS((prev) => (prev.reminder === id ? { ...prev, reminder: null } : prev)), REMINDER_MS);
  }

  // Tapping the notification opens the app on Home, where the advance card has the facts.
  function openReminder() {
    update({ reminder: null, screen: "home" });
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

  const demoProps = {
    hifi,
    scenarios: SCENARIOS,
    value: scenarioKey,
    onChange: (key) => reset(key),
    onReset: () => reset(),
    canSendReminder: !!s.advance,
    onSendReminder: sendReminder,
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-device={phone ? "phone" : undefined}
        className={
          phone
            ? "h-[100dvh] w-full overflow-hidden bg-hf-page"
            : "min-h-screen w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 py-6 transition-colors duration-500 " +
              (hifi ? "hf-backdrop" : "")
        }
      >
        {/* Fixed height, never taller than the viewport, so overlays (Toast, BottomSheet)
            pin to the visible bottom of the screen. Content scrolls inside each screen.
            On a phone it's the whole screen: no frame, corners or ring. */}
        <div
          data-view={view}
          className={
            phone
              ? "relative flex h-full w-full flex-col overflow-hidden font-geist bg-hf-page"
              : "relative w-[390px] max-w-full shrink-0 h-[min(844px,calc(100dvh-48px))] flex flex-col rounded-[28px] overflow-hidden " +
                (hifi
                  ? "font-geist bg-hf-page shadow-hf-float sm:rounded-[44px] sm:ring-[7px] sm:ring-hf-ink-900"
                  : "bg-white shadow-xl border border-neutral-300")
          }
        >
          {/* Hi-fi icons are thin line glyphs, like the reference; screens opt into fill. */}
          <IconContext.Provider value={{ weight: hifi ? "light" : "regular" }}>{renderScreen()}</IconContext.Provider>
          {hifi ? (
            <HfToast
              open={!!toast}
              message={toast?.message}
              title={toast?.title}
              tone={toast?.tone}
              icon={toast?.icon === null ? null : toast?.icon || "check"}
            />
          ) : (
            <Toast open={!!toast} message={toast?.message} icon={toast?.icon} />
          )}
          {/* The payday reminder is a hi-fi-only addition; the wireframe is unchanged. */}
          {hifi ? <PhoneNotification open={!!s.reminder} total={s.advance?.total} onOpen={openReminder} /> : null}
        </div>

        {phone ? (
          <PhoneDemo {...demoProps} />
        ) : (
          <div className={"w-[calc(100%-32px)] max-w-[390px] space-y-5 " + (hifi ? "font-geist lg:w-72" : "lg:w-64")}>
            <ViewToggle value={view} onChange={changeView} />
            <DemoSwitcher {...demoProps} />
          </div>
        )}
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
            declineReason={declineReason}
            documentsSubmitted={s.documentsSubmitted}
            onSeeOffer={seeOffer}
            onSeeDecline={() => update({ screen: "declined" })}
            onUnavailable={unavailable}
          />
        );
    }
  }
}
