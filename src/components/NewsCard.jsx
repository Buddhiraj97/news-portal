import Link from "next/link";
import { FaRegClock } from "react-icons/fa6";
import SafeImage from "./SafeImage";
import { timeAgo, truncate } from "@/lib/utils";

export default function NewsCard({ article }) {
  const href = `/news/${article.id}`;
  return (
    <article className="card">
      <Link href={href} className="img-wrap card-img" tabIndex={-1} aria-hidden="true">
        <SafeImage src={article.image} alt="" />
      </Link>
      <div className="card-body">
        <span className="tag">{article.category}</span>
        <h3><Link href={href}>{article.title}</Link></h3>
        <p>{truncate(article.description, 110)}</p>
        <div className="meta">
          <span>{article.source}</span>
          <span><FaRegClock aria-hidden="true" /> {timeAgo(article.publishedAt)}</span>
        </div>
        <Link href={href} className="read-more">Read more</Link>
      </div>
    </article>
  );
}
