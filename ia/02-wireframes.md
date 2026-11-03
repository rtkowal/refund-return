# Page-template wireframes (ASCII, mobile-first, single H1)

## Brand hub: /brands/costco/
```
[breadcrumb: Home › Brands › Costco]
H1  Costco Return Policy (verified Nov 3, 2026)
┌ Answer-first (2 sentences, AIO-citable) ───────────────────────────┐
│ Most items: no fixed deadline (satisfaction guarantee).            │
│ Electronics & major appliances: 90 days from receipt.              │
└────────────────────────────────────────────────────────────────────┘
┌ Fact card (from policy_rules) ────────────────┬───────────────────┐
│ Default window   none (guarantee)             │ Source: costco.com│
│ Electronics      90 days from receipt         │ Last verified:    │
│ Membership fee   refundable any time          │ 2026-11-03        │
│ Non-returnable   tickets, gift cards, metals… │ [change log ›]    │
└───────────────────────────────────────────────┴───────────────────┘
[Your rights may go further → state law callout (geo/state picker)]
H2 Common questions → facet links (electronics · TV · mattress · no receipt)
H2 Write your return/refund request  [embedded generator, step 1]
H2 If Costco says no → escalation ladder (chargeback · regulator · demand letter)
H2 FAQ (PAA-derived, FAQPage schema)
[CTA: Start your return on costco.com → /go/costco]  "Not affiliated with Costco"
[ad slot: reserved 300×250, below the fold only]
```

## Facet: /brands/walmart/without-receipt/
```
H1  Walmart Returns Without a Receipt
Answer box (only from reviewed rules + source link) · conditions list · what to bring
H2 Alternatives (order history, card lookup) · H2 Generator CTA · links to peer facets
```

## Generator: /generator/refund-request/ (prawomat-style)
```
Step 1  "What happened?" [free text] + [brand autocomplete]
Step 2  3–6 adaptive questions (date · channel · condition · receipt · outcome wanted · payment method)
Step 3  Facts we found: "Under Walmart's policy you have until {date}" [source]; "{State} law…" [source]
Step 4  Letter (editable) · tone: polite / firm / final · [Copy] [PDF] [DOCX] [blank template]
Step 5  Exit modal: "File with {Brand} →" /go/brand · secondary: card dispute guide · flight claim (if flight)
        footer line: templates and information, not legal advice · not affiliated with {Brand}
```

## Cancel: /cancel/planet-fitness/
```
H1 How to Cancel Planet Fitness · answer box (verified official path + date)
Steps · what to keep as proof · if they won't cancel (ROSCA, state auto-renewal law, card-block fallback) · cancellation-letter generator
```

## Flights: /flights/uk261/
```
H1 UK261 Flight Delay Compensation · eligibility checker (distance → £220/£350/£520; ≥3h arrival delay)
→ Option A: claim yourself (letter generator) · Option B: claim firm (partner, fee shown upfront)
```
