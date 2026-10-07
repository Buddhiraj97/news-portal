"use client";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { VISIBLE_CATEGORIES } from "@/data/categories";

export default function MobileMenu({ open, onClose }) {
  return (
    <div className={`mobile-menu${open ? " open" : ""}`} id="mobile-menu" aria-hidden={!open}>
      <SearchBar onDone={onClose} />
      <nav aria-label="Mobile">
        <Link href="/" onClick={onClose} tabIndex={open ? 0 : -1}>Home</Link>
        <Link href="/latest" onClick={onClose} tabIndex={open ? 0 : -1}>Latest</Link>
        {VISIBLE_CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} onClick={onClose} tabIndex={open ? 0 : -1}>{c.label}</Link>
        ))}
      </nav>
    </div>
  );
}
