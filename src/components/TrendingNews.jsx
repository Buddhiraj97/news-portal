import Link from "next/link";

export default function TrendingNews({ articles, title = "Trending" }) {
  if (!articles.length) return null;
  return (
    <section className="panel">
      <h2 className="panel-title">{title}</h2>
      <ol className="trending">
        {articles.map((a, i) => (
          <li key={a.id}>
            <span className="trend-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <Link href={`/news/${a.id}`}>{a.title}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
