/**
 * Decline copy, per internal denial_reason. Shared by the wireframe and the
 * high-fidelity view so the two can never say different things.
 *
 * `home` / `homeAction` are the Home card. Eligibility is known before the user
 * taps anything, so Home says it quietly: what's needed (income) or simply
 * "not available" (credit, other). The reason itself stays behind the tap,
 * never on Home, where someone else may be looking at the phone.
 *
 * Names the real reason in everyday words, and only offers a next step when one
 * actually exists. `other` isn't in the demo switcher; its copy is here so the
 * screen never falls back to a blank or vague message.
 */
export const DECLINE_COPY = {
  income_unverified: {
    why: "We couldn't confirm your salary. To lend before payday, we need to see that you're paid a regular salary, and we don't have proof of that yet.",
    nextTitle: "What you can do",
    next: "Share a recent payslip or bank statement. Once we've confirmed your income, we'll let you know whether an advance is available to you.",
    canVerify: true,
    home: "We need to confirm your salary before we can offer an advance.",
    homeAction: "See what's needed",
  },
  credit_score: {
    why: "This is based on your credit score, which comes from your history of borrowing and repaying.",
    nextTitle: "What this means",
    next: "There's nothing you can do in the app to change this decision today. If you think something in your credit history is wrong, NovaPay support can tell you where it came from.",
    canVerify: false,
    home: "Not available to you right now.",
    homeAction: "See why",
  },
  other: {
    why: "Our checks didn't meet the conditions for this advance. We can't share more detail in the app.",
    nextTitle: "What this means",
    next: "If you have questions, NovaPay support can help.",
    canVerify: false,
    home: "Not available to you right now.",
    homeAction: "See why",
  },
};

export const declineCopyFor = (reason) => DECLINE_COPY[reason] || DECLINE_COPY.other;
