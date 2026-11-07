/**
 * "How limits work" explainer, shared by the wireframe and the high-fidelity view.
 *
 * Says only what's true. How a limit is set or raised isn't defined anywhere
 * (an open question in CLAUDE.md), so this never names a basis or a way up.
 * The support line relies on the existing assumption that NovaPay support can
 * answer questions (docs/DECISIONS.md).
 */
const fmt = new Intl.NumberFormat("en-PK");

export const LIMIT_EXPLAINER_TITLE = "How limits work";

export function limitExplainerBody(limit) {
  return `Your limit is the most our checks allow for you right now: Rs ${fmt.format(limit)}. We can't lend above it, and we can't promise if or when it will go up. If you have questions about your limit, NovaPay support can help.`;
}
