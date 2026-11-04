export const SITE = {
  name: "refund-return.com",
  operator: "Digital Savages LLC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://refund-return.com",
  description:
    "Verified store return policies, refund rules and letter templates for US shoppers. Every fact links to its official source and shows when we last checked it.",
};

/** Global kill-switch: nothing is indexable until launch sign-off (CHECKPOINT 3). */
export const SITE_INDEXABLE = process.env.SITE_INDEXABLE === "true";
