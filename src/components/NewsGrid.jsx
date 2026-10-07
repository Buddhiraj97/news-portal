import NewsCard from "./NewsCard";

export default function NewsGrid({ articles }) {
  return (
    <div className="grid">
      {articles.map((a) => <NewsCard key={a.id} article={a} />)}
    </div>
  );
}
