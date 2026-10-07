import HeroNews from "@/components/HeroNews";
import NewsGrid from "@/components/NewsGrid";
import Sidebar from "@/components/Sidebar";
import CategorySection from "@/components/CategorySection";
import Newsletter from "@/components/Newsletter";
import DemoNotice from "@/components/DemoNotice";
import EmptyState from "@/components/EmptyState";
import { getNews } from "@/lib/newsApi";

export const metadata = { title: "NewsNepal – Latest News from Nepal and the World" };

const SECTIONS = [
  { slug: "technology", title: "Technology" },
  { slug: "business", title: "Business" },
  { slug: "sports", title: "Sports" },
  { slug: "entertainment", title: "Entertainment" },
  { slug: "world", title: "World News" },
];

export default async function HomePage() {
  const [headlines, nepal, ...sections] = await Promise.all([
    getNews("category", "general"),
    getNews("search", "Nepal"),
    ...SECTIONS.map((s) => getNews("category", s.slug)),
  ]);

  const top = headlines.articles;
  const latest = nepal.articles.length ? nepal.articles : top;
  const sidebarArticles = top.length ? top : latest;
  const isDemo = headlines.isDemo || nepal.isDemo;
  const error = headlines.error || nepal.error;

  if (!top.length && !latest.length) return <div className="container page"><EmptyState /></div>;

  return (
    <div className="container page">
      <DemoNotice isDemo={isDemo} error={error} />
      <HeroNews articles={top.length ? top : latest} />
      <div className="layout">
        <div>
          <section className="section">
            <div className="section-head"><h2>Latest from Nepal</h2></div>
            <NewsGrid articles={latest.slice(0, 6)} />
          </section>
          {SECTIONS.map((s, i) => (
            <CategorySection key={s.slug} title={s.title} slug={s.slug} articles={sections[i].articles} />
          ))}
        </div>
        <Sidebar articles={sidebarArticles} />
      </div>
      <Newsletter />
    </div>
  );
}
