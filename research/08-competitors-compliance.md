# 08 — DoNotPay lessons → our claims policy (DRAFT)

**The facts:**
- The FTC final order was approved 5–0 on **2025-01-16** and announced on **2025-02-11**.
- DoNotPay must pay **$193,000** and notify 2021–23 subscribers.
- It is barred from claiming the service performs like a lawyer without substantiation.
- Sources: [FTC case page](https://www.ftc.gov/legal-library/browse/cases-proceedings/donotpay), [Slashdot/FTC](https://tech.slashdot.org/story/25/02/11/1932223/).
- Note: the brief's "Feb 2025" date is the announcement; the order itself is dated January.

**Banned copy on refund-return.com** (lint this in CI):
- "lawyer", "attorney-grade", "AI lawyer", "robot lawyer", "legal representation"
- "guaranteed", "get your money back", "win your case"
- Success rates or "X% of users got refunds", unless we hold measured, substantiated data
- "as good as a lawyer", "replaces legal advice"

**Allowed copy:** "letter templates and information", "drafts a letter based on your answers", "cites the rules that may apply", "reviewed by [named attorney] on [date]" (only when actually reviewed).

**Testability:**
- Every claim about the tool maps to a test, e.g. "cites your state's law" → the generator output for a CA case includes the §1723 cite.
- Keep a `claims.md` registry listing each claim, the test that backs it, and its owner.
