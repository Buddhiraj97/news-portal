import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import ShareButtons from "@/components/ShareButtons";
import BackButton from "@/components/BackButton";
import NewsGrid from "@/components/NewsGrid";
import TrendingNews from "@/components/TrendingNews";
import { decodeId, getNews } from "@/lib/newsApi";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const a = decodeId(id);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.description,
    openGraph: { title: a.title, description: a.description, images: a.image && a.image.startsWith("http") ? [a.image] : [] },
    twitter: { card: "summary_large_image", title: a.title, description: a.description },
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const article = decodeId(id);
  if (!article) notFound();

  const { articles } = await getNews("category", "general");
  const related = articles.filter((a) => a.url !== article.url);

  return (
    <div className="container page">
      <article className="article">
        <BackButton />
        <span className="tag" style={{ marginTop: 20 }}>{article.category || "news"}</span>
        <h1>{article.title}</h1>
        <p className="meta">{article.source} · {formatDate(article.publishedAt)}</p>
        <div className="img-wrap article-img">
          <SafeImage src={article.image} alt={article.title} priority sizes="(max-width: 900px) 100vw, 800px" />
        </div>
        <ShareButtons title={article.title} />
        <p className="article-text">{article.description || "No summary is available for this article."}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn">Read Full Article</a>
      </article>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Related News</h2></div>
          <NewsGrid articles={related.slice(0, 3)} />
          <div style={{ marginTop: 32 }}><TrendingNews articles={related.slice(3, 8)} title="Recommended for you" /></div>
        </section>
      )}
    </div>
  );
}
