import { notFound } from "next/navigation";
import NewsGrid from "@/components/NewsGrid";
import Pagination from "@/components/Pagination";
import DemoNotice from "@/components/DemoNotice";
import EmptyState from "@/components/EmptyState";
import { getNews, PAGE_SIZE, HAS_PAGINATION } from "@/lib/newsApi";
import { getCategory } from "@/data/categories";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat || cat.hidden) return { title: "Category not found" };
  return { title: `${cat.label} News`, description: `Latest ${cat.label.toLowerCase()} news from Nepal and the world.` };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const sp = await searchParams;
  const cat = getCategory(category);
  if (!cat || cat.hidden) notFound();

  const page = Math.max(1, parseInt(sp.page) || 1);
  const { articles, isDemo, error } = await getNews("category", category, page);

  return (
    <div className="container page">
      <div className="section-head"><h1>{cat.label}</h1></div>
      <DemoNotice isDemo={isDemo} error={error} />
      {articles.length ? <NewsGrid articles={articles} /> : <EmptyState />}
      <Pagination basePath={`/category/${category}`} page={page} hasNext={HAS_PAGINATION && articles.length >= PAGE_SIZE} />
    </div>
  );
}
