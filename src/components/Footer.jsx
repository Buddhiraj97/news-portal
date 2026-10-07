import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import { VISIBLE_CATEGORIES } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="logo">News<span>Nepal</span></p>
          <p className="footer-text">Independent reporting on Nepal and the world, from Kathmandu to the Himalayas.</p>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X"><FaXTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
        <nav aria-label="Categories">
          <h2>Categories</h2>
          <ul>{VISIBLE_CATEGORIES.map((c) => <li key={c.slug}><Link href={`/category/${c.slug}`}>{c.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Explore">
          <h2>Explore</h2>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/latest">Latest news</Link></li>
            <li><Link href="/search">Search</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container copy">© {new Date().getFullYear()} NewsNepal. News provided by a third-party news API.</div>
    </footer>
  );
}
