import type { Metadata } from "next";
import { allBrands } from "@/lib/brands";
import { Wizard } from "./Wizard";

export const metadata: Metadata = {
  title: "Refund Request Letter Generator",
  description: "Describe what happened, answer a few questions, and get a refund request letter that cites the store's own policy. Free, no sign-up.",
  alternates: { canonical: "/generator/refund-request/" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ brand?: string }> }) {
  const { brand } = await searchParams;
  const brands = allBrands().map((b) => ({ slug: b.slug, name: b.name }));
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Write a refund request letter</h1>
      <p className="text-muted">Answer a few questions. We add the store&apos;s verified policy where we have it. You edit, copy and send it yourself.</p>
      <Wizard brands={brands} initialBrand={brands.some((b) => b.slug === brand) ? brand : undefined} />
    </div>
  );
}
