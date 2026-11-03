/** Shown next to every fact: official source + last-verified date. */
export function SourceStamp({ url, verifiedAt }: { url: string; verifiedAt: string }) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return (
    <p className="text-xs text-muted">
      Source: <a href={url} rel="nofollow noopener" target="_blank" className="underline">{host}</a>
      {" · "}Last verified <time dateTime={verifiedAt}>{verifiedAt}</time>
    </p>
  );
}
