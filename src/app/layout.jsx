import "./globals.css";
import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import Footer from "@/components/Footer";
import { getNews } from "@/lib/newsApi";

export const metadata = {
  title: { default: "NewsNepal – Latest News from Nepal and the World", template: "%s | NewsNepal" },
  description: "Breaking news, politics, business, technology, sports and entertainment from Nepal and around the world.",
  keywords: ["Nepal news", "Kathmandu news", "politics", "business", "technology", "sports", "world news"],
  openGraph: { title: "NewsNepal", description: "Latest news from Nepal and the world.", type: "website", siteName: "NewsNepal" },
  twitter: { card: "summary_large_image", title: "NewsNepal", description: "Latest news from Nepal and the world." },
};

// Runs before the page paints so dark mode does not flash
const themeScript = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children }) {
  const { articles } = await getNews("category", "general");
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <BreakingNews articles={articles} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
