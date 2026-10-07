import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import NewsGrid from "./NewsGrid";

export default function CategorySection({ title, slug, articles }) {
  if (!articles.length) return null;
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        <Link href={`/category/${slug}`}>View all <FaChevronRight aria-hidden="true" /></Link>
      </div>
      <NewsGrid articles={articles.slice(0, 3)} />
    </section>
  );
}
