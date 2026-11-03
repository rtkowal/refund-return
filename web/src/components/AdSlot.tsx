/** Reserved ad space: fixed min-height so ads never shift layout (CLS). Renders nothing visible until ADS_ENABLED. */
export function AdSlot({ id, height = 280 }: { id: string; height?: number }) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") return null;
  return <aside aria-label="Advertisement" data-ad-slot={id} style={{ minHeight: height }} className="rounded-lg border border-dashed border-line" />;
}
