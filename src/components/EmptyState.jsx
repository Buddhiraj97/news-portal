import Link from "next/link";

export default function EmptyState({ title = "No articles found", message = "Try a different search or browse the latest news." }) {
  return (
    <div className="state">
      <h2>{title}</h2>
      <p>{message}</p>
      <Link href="/latest" className="btn">Browse latest news</Link>
    </div>
  );
}
