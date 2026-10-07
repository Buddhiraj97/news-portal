"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar({ defaultValue = "", onDone }) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  function submit(e) {
    e.preventDefault(); // Enter key also submits the form
    const q = value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    if (onDone) onDone();
  }

  return (
    <form className="searchbar" onSubmit={submit} role="search">
      <input type="search" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search news…" aria-label="Search news" />
      <button type="submit" aria-label="Search"><FaMagnifyingGlass /></button>
    </form>
  );
}
