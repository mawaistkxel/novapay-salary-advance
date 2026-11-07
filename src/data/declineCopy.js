/**
 * Decline copy, per internal denial_reason. Shared by the wireframe and the
 * high-fidelity view so the two can never say different things.
 *
 * Names the real reason in everyday words, and only offers a next step when one
 * actually exists. `other` isn't in the demo switcher; its copy is here so the
 * screen never falls back to a blank or vague message.
 */
export const DECLINE_COPY = {
  income_unverified: {
    why: "We couldn't confirm your salary. To lend before payday, we need to see that you're paid a regular salary, and we don't have proof of that yet.",
    nextTitle: "What you can do",
    next: "Share a recent payslip or bank statement. Once we've confirmed your income, you can check for an offer again.",
    canVerify: true,
  },
  credit_score: {
    why: "This is based on your credit score, which comes from your history of borrowing and repaying.",
    nextTitle: "What this means",
    next: "There's nothing you can do in the app to change this decision today. If you think something in your credit history is wrong, NovaPay support can tell you where it came from.",
    canVerify: false,
  },
  other: {
    why: "Our checks didn't meet the conditions for this advance. We can't share more detail in the app.",
    nextTitle: "What this means",
    next: "If you have questions, NovaPay support can help.",
    canVerify: false,
  },
};

export const declineCopyFor = (reason) => DECLINE_COPY[reason] || DECLINE_COPY.other;
