import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBrands } from "@/lib/brands";
import { GENERATORS, getGenerator } from "@/lib/generator/defs";
import { Wizard } from "@/components/Wizard";

export const dynamicParams = false;
export function generateStaticParams() { return GENERATORS.map((g) => ({ type: g.slug })); }
type Props = { params: Promise<{ type: string }>; searchParams: Promise<{ brand?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGenerator((await params).type);
  return g ? { title: g.title, description: g.description, alternates: { canonical: `/generator/${g.slug}/` } } : {};
}

export default async function Page({ params, searchParams }: Props) {
  const g = getGenerator((await params).type); if (!g) notFound();
  const { brand } = await searchParams;
  const brands = allBrands().map((b) => ({ slug: b.slug, name: b.name }));
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">{g.h1}</h1>
      <p className="text-muted">{g.intro}</p>
      <Wizard def={g} brands={brands} initialBrand={brands.some((b) => b.slug === brand) ? brand : undefined} />
    </div>
  );
}
