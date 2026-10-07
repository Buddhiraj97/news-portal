import SearchBar from "@/components/SearchBar";
import NewsGrid from "@/components/NewsGrid";
import Pagination from "@/components/Pagination";
import DemoNotice from "@/components/DemoNotice";
import EmptyState from "@/components/EmptyState";
import { getNews, PAGE_SIZE, HAS_PAGINATION } from "@/lib/newsApi";

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  return { title: q ? `Search results for "${q}"` : "Search" };
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp.q || "").trim();
  const page = Math.max(1, parseInt(sp.page) || 1);
  const result = q ? await getNews("search", q, page) : null;

  return (
    <div className="container page">
      <div className="section-head"><h1>{q ? `Search results for "${q}"` : "Search"}</h1></div>
      <div className="search-page"><SearchBar key={q} defaultValue={q} /></div>
      {!q && <EmptyState title="What are you looking for?" message="Type a topic such as Nepal, Kathmandu or cricket." />}
      {result && (
        <>
          <DemoNotice isDemo={result.isDemo} error={result.error} />
          {result.articles.length ? (
            <NewsGrid articles={result.articles} />
          ) : (
            <EmptyState title={`No results for "${q}"`} message="Check the spelling or try a different keyword." />
          )}
          <Pagination basePath="/search" page={page} params={{ q }} hasNext={HAS_PAGINATION && result.articles.length >= PAGE_SIZE} />
        </>
      )}
    </div>
  );
}
