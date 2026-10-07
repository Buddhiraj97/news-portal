"use client";
import { useEffect, useState } from "react";
import { FaFacebookF, FaXTwitter, FaWhatsapp, FaLink } from "react-icons/fa6";

export default function ShareButtons({ title }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  async function copy() {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }

  return (
    <div className="share" aria-label="Share this article">
      <span>Share:</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><FaFacebookF /></a>
      <a href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><FaXTwitter /></a>
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><FaWhatsapp /></a>
      <button onClick={copy} aria-label="Copy link"><FaLink /></button>
      {copied && <small role="status">Link copied</small>}
    </div>
  );
}
