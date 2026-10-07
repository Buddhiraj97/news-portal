"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark, FaMagnifyingGlass } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/data/categories";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="header">
      <div className="container header-in">
        <Link href="/" className="logo" aria-label="NewsNepal home">News<span>Nepal</span></Link>
        <nav className="nav" aria-label="Main">
          {NAV_LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return <Link key={l.href} href={l.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{l.label}</Link>;
          })}
        </nav>
        <div className="actions">
          <Link href="/search" className="icon-btn" aria-label="Search"><FaMagnifyingGlass /></Link>
          <ThemeToggle />
          <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
