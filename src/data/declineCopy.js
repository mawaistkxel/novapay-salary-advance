/**
 * Decline copy, per internal denial_reason. Shared by the wireframe and the
 * high-fidelity view so the two can never say different things.
 *
 * `home` / `homeAction` are the Home card. Eligibility is known before the user
 * taps anything, so Home says it quietly: what's needed (income) or simply
 * "not available" (credit, other). The reason itself stays behind the tap,
 * never on Home, where someone else may be looking at the phone.
 *
 * `why` sits directly under the heading; it's the only body text on the screen.
 *
 * Names the real reason in everyday words, and only offers a next step when one
 * actually exists. `other` isn't in the demo switcher; its copy is here so the
 * screen never falls back to a blank or vague message.
 */
export const DECLINE_COPY = {
  income_unverified: {
    heading: "Verify your income to see the\u00A0offer", // no-break space keeps "the offer" together,
    why: "To lend you before the payday, we need to verify your proof of income, for that purpose, share your salary slip to unlock the offers.",
    canVerify: true,
    home: "We need to verify your salary before we can offer an advance.",
    homeAction: "See what's needed",
  },
  credit_score: {
    heading: "We can't offer you an advance right now",
    why: "This is based on your credit score, which comes from your history of borrowing and repaying. If your credit score improves, an advance may become available. You'll see it on your home screen.",
    canVerify: false,
    home: "Not available to you right now.",
    homeAction: "See why",
  },
  other: {
    heading: "We can't offer you an advance right now",
    why: "Our checks didn't meet the conditions for this advance. We can't share more detail in the app.",
    canVerify: false,
    home: "Not available to you right now.",
    homeAction: "See why",
  },
};

export const declineCopyFor = (reason) => DECLINE_COPY[reason] || DECLINE_COPY.other;
