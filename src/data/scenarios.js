/**
 * Prototype data. Product rules come from PRODUCT_REFERENCE.md:
 * tiers 5,000 / 10,000 / 15,000, a one-time fee of 3% of the amount disbursed,
 * repaid in full on the next payday. The payday (28 Jul) matches the starter's
 * "Salary credited 28 Jun".
 */
export const TIERS = [5000, 10000, 15000];
export const FEE_RATE = 0.03;
export const PAYDAY = "28 Jul";
export const STARTING_BALANCE = 4250;

export const feeFor = (amount) => Math.round(amount * FEE_RATE);
export const totalFor = (amount) => amount + feeFor(amount);

/**
 * Demo scenarios, chosen from the switcher outside the phone frame.
 * Field names follow the dataset glossary where one exists.
 */
export const SCENARIOS = {
  approved: {
    label: "Approved, limit Rs 10,000",
    decision: "approved",
    limit: 10000,
  },
  haircut: {
    label: "Approved, amount reduced after checks",
    decision: "approved",
    limit: 10000,
    // Risk checks cut a Rs 10,000 request to the next tier down.
    haircutTo: 5000,
  },
  acceptFails: {
    label: "Approved, Accept fails once",
    decision: "approved",
    limit: 10000,
    failFirstAccept: true,
  },
  declinedIncome: {
    label: "Declined: income not verified",
    decision: "denied",
    denial_reason: "income_unverified",
  },
  declinedCredit: {
    label: "Declined: credit score",
    decision: "denied",
    denial_reason: "credit_score",
  },
};

/** The amount actually disbursed for a request, after any haircut. */
export function disbursedFor(scenario, applied) {
  if (scenario.haircutTo && applied > scenario.haircutTo) return scenario.haircutTo;
  return applied;
}
