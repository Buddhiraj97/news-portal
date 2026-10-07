import Link from "next/link";
import NewsGrid from "@/components/NewsGrid";
import Pagination from "@/components/Pagination";
import DemoNotice from "@/components/DemoNotice";
import EmptyState from "@/components/EmptyState";
import { getNews, PAGE_SIZE, HAS_PAGINATION } from "@/lib/newsApi";

export const metadata = { title: "Latest News", description: "The newest headlines from Nepal and around the world." };

export default async function LatestPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page) || 1);
  const sort = sp.sort === "oldest" ? "oldest" : "newest";

  const { articles, isDemo, error } = await getNews("category", "general", page);
  const sorted = [...articles].sort((a, b) => {
    const diff = new Date(b.publishedAt) - new Date(a.publishedAt);
    return sort === "newest" ? diff : -diff;
  });

  return (
    <div className="container page">
      <div className="section-head">
        <h1>Latest News</h1>
        <div className="sort" role="group" aria-label="Sort articles">
          <Link href="/latest?sort=newest" className={sort === "newest" ? "active" : ""}>Newest</Link>
          <Link href="/latest?sort=oldest" className={sort === "oldest" ? "active" : ""}>Oldest</Link>
        </div>
      </div>
      <DemoNotice isDemo={isDemo} error={error} />
      {sorted.length ? <NewsGrid articles={sorted} /> : <EmptyState />}
      <Pagination basePath="/latest" page={page} params={{ sort }} hasNext={HAS_PAGINATION && articles.length >= PAGE_SIZE} />
    </div>
  );
}
