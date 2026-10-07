import Link from "next/link";

export default function BreakingNews({ articles = [] }) {
  const items = articles.slice(0, 8);
  if (!items.length) return null;
  // The list is shown twice so the scrolling loop has no gap.
  const loop = [...items, ...items];
  return (
    <div className="ticker" role="region" aria-label="Breaking news">
      <span className="ticker-label">Breaking</span>
      <div className="ticker-track">
        <div className="ticker-move">
          {loop.map((a, i) => (
            <Link key={i} href={`/news/${a.id}`} tabIndex={i >= items.length ? -1 : 0}>{a.title}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
