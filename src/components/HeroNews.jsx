import Link from "next/link";
import SafeImage from "./SafeImage";
import { timeAgo } from "@/lib/utils";

function HeroItem({ article, big }) {
  return (
    <article className={`hero-item${big ? " hero-main" : ""}`}>
      <div className="img-wrap hero-img">
        <SafeImage src={article.image} alt="" priority={big} sizes={big ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} />
      </div>
      <div className="hero-text">
        <span className="tag tag-light">{article.category}</span>
        {big ? <h1><Link href={`/news/${article.id}`}>{article.title}</Link></h1> : <h2><Link href={`/news/${article.id}`}>{article.title}</Link></h2>}
        <div className="meta meta-light">{article.source} · {timeAgo(article.publishedAt)}</div>
      </div>
    </article>
  );
}

export default function HeroNews({ articles }) {
  if (!articles.length) return null;
  const [main, a, b] = articles;
  return (
    <section className="hero" aria-label="Featured news">
      <HeroItem article={main} big />
      {a && <HeroItem article={a} />}
      {b && <HeroItem article={b} />}
    </section>
  );
}
