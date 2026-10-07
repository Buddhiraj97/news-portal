import Link from "next/link";
import TrendingNews from "./TrendingNews";
import Newsletter from "./Newsletter";
import { timeAgo } from "@/lib/utils";

export default function Sidebar({ articles = [] }) {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <TrendingNews articles={articles.slice(0, 5)} title="Trending" />
      <TrendingNews articles={articles.slice(3, 8)} title="Most Read" />
      <section className="panel">
        <h2 className="panel-title">Latest Updates</h2>
        <ul className="updates">
          {articles.slice(0, 4).map((a) => (
            <li key={a.id}><time>{timeAgo(a.publishedAt)}</time><Link href={`/news/${a.id}`}>{a.title}</Link></li>
          ))}
        </ul>
      </section>
      <div className="ad" aria-label="Advertisement placeholder">Advertisement<br /><small>300 × 250</small></div>
      <Newsletter compact />
    </aside>
  );
}
