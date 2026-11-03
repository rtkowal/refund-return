/** Letter generator definitions. Legal facts here are ONLY ones verified against official text in research/ snapshots. */
export type Field = { key: string; label: string; type: "text" | "date" | "select" | "textarea"; options?: [string, string][]; placeholder?: string };
export type Law = { text: string; cite: string; url: string };
export type GeneratorDef = {
  slug: string; title: string; h1: string; intro: string; description: string;
  usesBrand: boolean; storyPlaceholder: string; fields: Field[]; laws: Law[]; recipientHint: string; instructions: string; filename: string;
};

const PAYMENT: [string, string][] = [["credit_card", "Credit card"], ["debit_card", "Debit card"], ["paypal", "PayPal"], ["bnpl", "Klarna / Afterpay / Affirm"], ["cash", "Cash"], ["other", "Other"]];
const MAIL_ORDER: Law = { text: "Under the FTC Mail, Internet or Telephone Order Rule, a seller must ship within the time it stated, or within 30 days if it stated no time (50 days if you applied to the seller for credit to pay).", cite: "16 CFR 435.2", url: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-435" };
const REG_Z: Law = { text: "Under the Fair Credit Billing Act (Regulation Z), you can dispute a billing error, including goods not delivered as agreed, by writing to your card issuer within 60 days after the first statement showing the charge was sent.", cite: "12 CFR 1026.13", url: "https://www.consumerfinance.gov/rules-policy/regulations/1026/13/" };
const DOT: Law = { text: "Under the US DOT refund rule, an airline must refund you if it cancels your flight or makes a significant change (including departing 3 or more hours earlier/later on a domestic itinerary, or 6 or more hours on an international one) and you don't accept the alternative. Refunds are due within 7 business days for card purchases and 20 calendar days for other payment methods.", cite: "14 CFR 260", url: "https://www.ecfr.gov/current/title-14/chapter-II/subchapter-A/part-260" };
const EU261: Law = { text: "Under EU Regulation 261/2004 (Article 7), compensation is EUR 250 for flights of 1,500 km or less, EUR 400 for intra-EU flights over 1,500 km and other flights of 1,500–3,500 km, and EUR 600 for all other flights.", cite: "Regulation (EC) No 261/2004, Art. 7", url: "https://eur-lex.europa.eu/eli/reg/2004/261/oj" };

export const GENERATORS: GeneratorDef[] = [
  { slug: "refund-request", title: "Refund Request Letter Generator", h1: "Write a refund request letter", filename: "refund-request",
    intro: "Answer a few questions. We add the store's verified policy where we have it.", description: "Get a refund or return request letter that cites the store's own policy. Free, no sign-up.",
    usesBrand: true, storyPlaceholder: "e.g. I bought a coffee maker online on Oct 2. It stopped working after a week and they won't take it back.",
    recipientHint: "the store's customer service", laws: [],
    instructions: "Ask for the outcome the customer wants, citing the store's policy facts where they apply.",
    fields: [
      { key: "orderDate", label: "Order date", type: "date" },
      { key: "channel", label: "Bought", type: "select", options: [["online", "Online"], ["in_store", "In store"], ["marketplace", "From a marketplace seller"]] },
      { key: "receipt", label: "Proof of purchase", type: "select", options: [["order_email", "Order email / account"], ["yes", "Paper receipt"], ["no", "None"]] },
      { key: "outcome", label: "What you want", type: "select", options: [["refund", "Refund"], ["exchange", "Exchange"], ["repair", "Repair"], ["store_credit", "Store credit"]] },
      { key: "payment", label: "Paid with", type: "select", options: PAYMENT },
    ] },
  { slug: "order-never-arrived", title: "Order Never Arrived Letter", h1: "Order never arrived: ask for your money back", filename: "order-not-received",
    intro: "For online, phone or mail orders that didn't ship or never showed up.", description: "A letter for orders that never arrived, citing the FTC Mail Order Rule's shipping deadline.",
    usesBrand: true, storyPlaceholder: "e.g. I ordered a jacket on Sept 20. Tracking hasn't moved in three weeks and the seller stopped replying.",
    recipientHint: "the seller", laws: [MAIL_ORDER], instructions: "Ask for a full refund (or immediate shipment if the customer prefers) for an order that was not delivered. Mention the shipping-time rule only as stated in LAWS.",
    fields: [
      { key: "orderDate", label: "Order date", type: "date" },
      { key: "promisedDate", label: "Promised delivery date (if any)", type: "date" },
      { key: "outcome", label: "What you want", type: "select", options: [["refund", "Full refund"], ["ship_now", "Ship it now"]] },
      { key: "payment", label: "Paid with", type: "select", options: PAYMENT },
    ] },
  { slug: "chargeback-letter", title: "Credit Card Dispute Letter", h1: "Dispute a credit card charge", filename: "card-dispute",
    intro: "A billing-error letter to your card issuer. Send it within 60 days of the statement.", description: "A credit card billing-error dispute letter under the Fair Credit Billing Act. Free template.",
    usesBrand: false, storyPlaceholder: "e.g. I was charged $129 by an online store on Oct 3 for an order that never arrived. The store won't respond.",
    recipientHint: "the card issuer's billing-error/dispute address (not the payment address)", laws: [REG_Z],
    instructions: "Write to the CARD ISSUER, not the merchant. Identify the charge (merchant, date, amount, [Account number last 4 digits]), state why it is a billing error, ask for it to be investigated and credited, and note the attempts to resolve it with the merchant.",
    fields: [
      { key: "merchant", label: "Merchant name", type: "text" },
      { key: "chargeDate", label: "Charge date", type: "date" },
      { key: "amount", label: "Amount (USD)", type: "text", placeholder: "129.00" },
      { key: "statementDate", label: "Statement date showing the charge", type: "date" },
      { key: "reason", label: "Reason", type: "select", options: [["not_received", "Not received"], ["not_as_described", "Not as agreed / defective"], ["wrong_amount", "Wrong amount"], ["not_authorized", "I didn't authorize it"], ["refund_not_credited", "Refund promised but not credited"]] },
    ] },
  { slug: "cancel-subscription", title: "Subscription Cancellation Letter", h1: "Cancel a subscription in writing", filename: "cancellation",
    intro: "A clear cancellation notice that asks for written confirmation and an end to charges.", description: "A subscription or membership cancellation letter asking for written confirmation. Free template.",
    usesBrand: false, storyPlaceholder: "e.g. I've tried to cancel my gym membership online twice but it keeps charging me $39.99 a month.",
    recipientHint: "the company's cancellation or customer service contact", laws: [],
    instructions: "State clearly that the customer cancels effective immediately, ask for written confirmation, that no further charges be made, and (if applicable) a refund of charges made after the first cancellation attempt. Do not cite any law.",
    fields: [
      { key: "company", label: "Company / service", type: "text" },
      { key: "accountId", label: "Account or member number (optional)", type: "text" },
      { key: "firstAttempt", label: "When you first tried to cancel (optional)", type: "date" },
      { key: "refundAsk", label: "Also ask for a refund of later charges?", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
    ] },
  { slug: "airline-refund", title: "Airline Refund Request (US DOT rule)", h1: "Ask an airline for a refund", filename: "airline-refund",
    intro: "For a US flight that was cancelled or significantly changed, when you didn't accept the alternative.", description: "An airline refund request citing the US DOT automatic refund rule (14 CFR 260). Free template.",
    usesBrand: false, storyPlaceholder: "e.g. My Delta flight from Atlanta to Denver on Oct 12 was cancelled. I didn't take the rebooking and they offered only a voucher.",
    recipientHint: "the airline's refunds department", laws: [DOT],
    instructions: "Ask for a refund to the original form of payment, not a voucher. Cite the DOT rule only as stated in LAWS. Include [Confirmation code] and [Ticket number].",
    fields: [
      { key: "airline", label: "Airline", type: "text" },
      { key: "flightDate", label: "Flight date", type: "date" },
      { key: "route", label: "Route (from → to)", type: "text", placeholder: "ATL → DEN" },
      { key: "what", label: "What happened", type: "select", options: [["cancelled", "Cancelled"], ["significant_change", "Significantly changed / delayed"], ["downgraded", "Downgraded"]] },
      { key: "payment", label: "Paid with", type: "select", options: PAYMENT },
    ] },
  { slug: "flight-compensation", title: "Flight Delay Compensation Claim (EU261 / UK261)", h1: "Claim flight delay or cancellation compensation", filename: "flight-compensation",
    intro: "For flights departing the EU or UK, or arriving there on an EU/UK airline. You can claim yourself for free.", description: "A flight compensation claim letter under EU261/UK261. Free, no commission.",
    usesBrand: false, storyPlaceholder: "e.g. My London to Barcelona flight on Sept 5 arrived 4 hours late because of a technical problem.",
    recipientHint: "the operating airline's claims department", laws: [EU261],
    instructions: "Claim compensation under Regulation 261/2004. For EU flights, use the EUR amounts in LAWS. For UK-regulated flights, refer to 'UK Regulation 261/2004' and do NOT state a GBP amount. Ask for payment within 14 days. Do not claim compensation is guaranteed (extraordinary circumstances can exempt the airline).",
    fields: [
      { key: "airline", label: "Operating airline", type: "text" },
      { key: "flightNumber", label: "Flight number", type: "text" },
      { key: "flightDate", label: "Flight date", type: "date" },
      { key: "route", label: "Route (from → to)", type: "text", placeholder: "LHR → BCN" },
      { key: "what", label: "What happened", type: "select", options: [["delay_3h", "Arrived 3+ hours late"], ["cancelled", "Cancelled at short notice"], ["denied", "Denied boarding (overbooked)"]] },
      { key: "regime", label: "Flight regulated by", type: "select", options: [["eu", "EU (EU261)"], ["uk", "UK (UK261)"], ["unsure", "Not sure"]] },
    ] },
  { slug: "demand-letter", title: "Demand Letter Template", h1: "Write a final demand letter", filename: "demand-letter",
    intro: "A last formal request before small claims court. Use it after your earlier requests were ignored.", description: "A free demand letter template for consumer refund disputes, before small claims.",
    usesBrand: true, storyPlaceholder: "e.g. A contractor took a $1,200 deposit in August, never started the work, and ignores my messages.",
    recipientHint: "the business", laws: [],
    instructions: "A formal final demand: facts, amount owed ([Amount]), a deadline of 14 days, and that if unpaid the customer intends to file in small claims court. Do not cite statutes. Do not threaten anything else.",
    fields: [
      { key: "amount", label: "Amount owed (USD)", type: "text" },
      { key: "incidentDate", label: "Date of purchase or incident", type: "date" },
      { key: "priorAttempts", label: "Earlier attempts (dates, how)", type: "text", placeholder: "Emailed Oct 1 and Oct 10" },
    ] },
  { slug: "regulator-complaint", title: "Consumer Complaint Draft (FTC, CFPB, State AG)", h1: "Draft a complaint to a regulator", filename: "complaint",
    intro: "A clear summary you can paste into the official complaint form. You file it yourself.", description: "Draft a consumer complaint to paste into the FTC, CFPB or your state attorney general's form.",
    usesBrand: true, storyPlaceholder: "e.g. An online store took my payment for a sofa in July, never delivered and refuses a refund.",
    recipientHint: "the regulator's complaint form (the user will paste it)", laws: [],
    instructions: "Write a factual complaint summary (not a letter to the company): who, what, when, amount, what was tried, what outcome is wanted. Neutral tone. No legal conclusions. End with the list of attachments the user should add: receipts, emails, screenshots.",
    fields: [
      { key: "agency", label: "Where you'll file", type: "select", options: [["ftc", "FTC (reportfraud.ftc.gov)"], ["cfpb", "CFPB (banks, cards, loans)"], ["state_ag", "State attorney general"], ["dot", "US DOT (airlines)"]] },
      { key: "amount", label: "Amount involved (USD)", type: "text" },
      { key: "incidentDate", label: "Date", type: "date" },
    ] },
];
export const getGenerator = (slug: string) => GENERATORS.find((g) => g.slug === slug);
