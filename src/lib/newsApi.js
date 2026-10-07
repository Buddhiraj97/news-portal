// ALL news requests go through this file.
// Provider: NewsData.io (supports Nepal with country=np).
// To use a different provider, change buildUrl() and normalize() below (see README).
import { cache } from "react";
import { demoNews } from "@/data/demoNews";
import { getCategory } from "@/data/categories";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const configuredUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;
const API_URL = configuredUrl && configuredUrl.startsWith("http") ? configuredUrl : "https://newsdata.io/api/1";
export const PAGE_SIZE = 10;
// NewsData.io uses "next page tokens" instead of page numbers, so Next/Previous buttons are turned off.
export const HAS_PAGINATION = false;

const hasKey = () => Boolean(API_KEY) && !API_KEY.startsWith("YOUR_");

// Article pages are opened by id. The id holds the article data itself,
// so the article page does not need another API request.
function encodeId(a) {
  const small = { t: a.title, d: a.description, u: a.url, i: a.image, s: a.source, p: a.publishedAt, c: a.category };
  return Buffer.from(JSON.stringify(small)).toString("base64url");
}

export function decodeId(id) {
  try {
    const x = JSON.parse(Buffer.from(id, "base64url").toString("utf8"));
    if (!x.t || !x.u) return null;
    return { title: x.t, description: x.d, url: x.u, image: x.i, source: x.s, publishedAt: x.p, category: x.c, id };
  } catch {
    return null;
  }
}

// Turns one API article into the shape the whole app uses.
function normalize(raw, category) {
  const date = raw.pubDate ? `${raw.pubDate.replace(" ", "T")}Z` : raw.publishedAt || null; // NewsData dates are UTC
  const article = {
    title: raw.title || "Untitled article",
    description: raw.description || "",
    url: raw.link || raw.url || "#",
    image: raw.image_url || raw.image || null,
    source: raw.source_name || raw.source?.name || "Unknown source",
    publishedAt: date,
    category: (Array.isArray(raw.category) ? raw.category[0] : raw.category) || category || "news",
  };
  return { ...article, id: encodeId(article) };
}

// Builds the request URL. Change this for another provider.
function buildUrl(kind, value) {
  const params = new URLSearchParams({ apikey: API_KEY, language: "en" });
  if (kind === "search") {
    params.set("q", value);
  } else {
    const cat = getCategory(value);
    params.set("category", cat?.api || "top");
    if (!cat?.global) params.set("country", "np"); // np = Nepal
  }
  return `${API_URL}/latest?${params}`;
}

async function request(url) {
  const res = await fetch(url, { next: { revalidate: 900 } });
  if (res.status === 401 || res.status === 403) throw new Error("The API key is invalid or not allowed.");
  if (res.status === 429) throw new Error("API rate limit reached. Please try again later.");
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.status === "error") throw new Error(data?.results?.message || `The news API returned an error (${res.status}).`);
  return Array.isArray(data.results) ? data.results : [];
}

// Small pause between requests to stay friendly with the free plan.
let lastCall = 0;
async function throttle() {
  const now = Date.now();
  const wait = Math.max(0, lastCall + 250 - now);
  lastCall = now + wait;
  if (wait) await new Promise((r) => setTimeout(r, wait));
}

function demoFor(kind, value) {
  let list = demoNews;
  if (kind === "search") {
    const q = value.toLowerCase();
    list = demoNews.filter((a) => `${a.title} ${a.description}`.toLowerCase().includes(q));
  } else if (value !== "general") {
    list = demoNews.filter((a) => a.category === value);
  }
  return list.map((a) => normalize(a, a.category));
}

/**
 * kind  = "category" (value = category slug) or "search" (value = search text)
 * Always returns { articles, isDemo, error } and never throws.
 */
export const getNews = cache(async (kind = "category", value = "general") => {
  if (!hasKey()) return { articles: demoFor(kind, value), isDemo: true, error: null };

  try {
    await throttle();
    let results = await request(buildUrl(kind, value));
    // Nepal has few articles in some categories: if empty, show worldwide ones instead
    if (!results.length && kind === "category") {
      const cat = getCategory(value);
      const url = new URL(buildUrl(kind, value));
      url.searchParams.delete("country");
      if (!cat?.global) { await throttle(); results = await request(url.toString()); }
    }
    const articles = results.filter((a) => a.title).map((a) => normalize(a, kind === "category" ? value : null));
    return { articles, isDemo: false, error: null };
  } catch (err) {
    const message = err instanceof TypeError ? "Network error. Check your internet connection." : err.message;
    return { articles: demoFor(kind, value), isDemo: true, error: message };
  }
});
