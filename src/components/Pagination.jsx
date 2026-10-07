import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function Pagination({ basePath, page, params = {}, hasNext }) {
  const href = (p) => `${basePath}?${new URLSearchParams({ ...params, page: String(p) })}`;
  if (page <= 1 && !hasNext) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      {page > 1 ? <Link href={href(page - 1)} className="btn btn-ghost"><FaArrowLeft aria-hidden="true" /> Previous</Link> : <span />}
      <span>Page {page}</span>
      {hasNext ? <Link href={href(page + 1)} className="btn">Next <FaArrowRight aria-hidden="true" /></Link> : <span />}
    </nav>
  );
}
