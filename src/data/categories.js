// Each category is used for the menu, the category pages, and the API request.
// api    = category name understood by the news API (NewsData.io)
// global = true means "do not limit to Nepal" (used for World news)
export const CATEGORIES = [
  { slug: "general", label: "Top Headlines", api: "top", hidden: true },
  { slug: "politics", label: "Politics", api: "politics" },
  { slug: "business", label: "Business", api: "business" },
  { slug: "technology", label: "Technology", api: "technology" },
  { slug: "sports", label: "Sports", api: "sports" },
  { slug: "entertainment", label: "Entertainment", api: "entertainment" },
  { slug: "world", label: "World", api: "world", global: true },
  { slug: "health", label: "Health", api: "health" },
  { slug: "education", label: "Education", api: "education" },
  { slug: "lifestyle", label: "Lifestyle", api: "lifestyle" },
];

export const VISIBLE_CATEGORIES = CATEGORIES.filter((c) => !c.hidden);

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);

// Links shown in the desktop header
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/latest", label: "Latest" },
  { href: "/category/politics", label: "Politics" },
  { href: "/category/business", label: "Business" },
  { href: "/category/technology", label: "Technology" },
  { href: "/category/sports", label: "Sports" },
  { href: "/category/entertainment", label: "Entertainment" },
];
