/**
 * Decline copy, per internal denial_reason. Shared by the wireframe and the
 * high-fidelity view so the two can never say different things.
 *
 * `home` / `homeAction` are the Home card. Eligibility is known before the user
 * taps anything, so Home says it quietly: what's needed (income) or simply
 * "not available" (credit, other). The reason itself stays behind the tap,
 * never on Home, where someone else may be looking at the phone.
 *
 * `why` sits directly under the heading. `next` is shown only where there's no
 * direct action (credit_score, other); for income, `why` already says what to do.
 *
 * Names the real reason in everyday words, and only offers a next step when one
 * actually exists. `other` isn't in the demo switcher; its copy is here so the
 * screen never falls back to a blank or vague message.
 */
export const DECLINE_COPY = {
  income_unverified: {
    heading: "Verify your salary to see the offer",
    why: "To lend you before the payday, we need to verify your proof of income, for that purpose, share your salary slip to unlock the offers.",
    nextTitle: "What you can do",
    next: "Share a recent payslip or bank statement. Once we've confirmed your income, we'll let you know whether an advance is available to you.",
    canVerify: true,
    home: "We need to verify your salary before we can offer an advance.",
    homeAction: "See what's needed",
  },
  credit_score: {
    heading: "We can't offer you an advance right now",
    why: "This is based on your credit score, which comes from your history of borrowing and repaying.",
    nextTitle: "What this means",
    next: "There's nothing you can do in the app to change this decision today. If you think something in your credit history is wrong, NovaPay support can tell you where it came from.",
    canVerify: false,
    home: "Not available to you right now.",
    homeAction: "See why",
  },
  other: {
    heading: "We can't offer you an advance right now",
    why: "Our checks didn't meet the conditions for this advance. We can't share more detail in the app.",
    nextTitle: "What this means",
    next: "If you have questions, NovaPay support can help.",
    canVerify: false,
    home: "Not available to you right now.",
    homeAction: "See why",
  },
};

export const declineCopyFor = (reason) => DECLINE_COPY[reason] || DECLINE_COPY.other;
