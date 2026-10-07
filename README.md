# NewsNepal – Next.js News Portal

A modern, responsive news website built with **Next.js (App Router)**, **JavaScript**, and plain **CSS**. It loads live news from the NewsData.io API and shows demo articles when no API key is set, so it always works.

## Features
- Home page with breaking-news ticker, hero, latest news, trending, category sections, sidebar and newsletter
- Latest news (sorting + pagination), 9 category pages, search (`/search?q=nepal`), article pages with share buttons and related news
- Mobile menu, sticky header, dark/light mode (saved in localStorage)
- Skeleton loaders, error and empty states, image fallbacks
- Demo data fallback when the API is missing or fails
- SEO metadata, keyboard focus styles, ARIA labels

## Technologies
Next.js 15, React 19, JavaScript (no TypeScript), CSS, React Icons (Font Awesome 6), Fetch API.

## Folder Structure
```
src/app          Pages (page.jsx = a page, layout.jsx = shared layout, globals.css = all styles)
src/components   Reusable parts (Header, NewsCard, Sidebar, ...)
src/lib          newsApi.js (all API requests) and utils.js (date helpers)
src/data         categories.js (menu + categories) and demoNews.js (fallback news)
public/images    placeholder.svg (default image)
```

## Installation
1. Install [Node.js](https://nodejs.org) 18.18 or newer.
2. Extract the ZIP and open the folder in a terminal.
3. Run `npm install`

## API Setup
1. Create a free account at https://newsdata.io and copy your API key from the dashboard.
2. Copy `.env.example` and rename the copy to `.env.local` (one is already included).
3. Replace `YOUR_API_KEY_HERE` with your key.

## Environment Variables
| Name | Meaning |
|---|---|
| `NEXT_PUBLIC_NEWS_API_KEY` | Your API key |
| `NEXT_PUBLIC_NEWS_API_URL` | API base address (default `https://newsdata.io/api/1`) |

The key is only used in server code, never written into the source files. Never upload `.env.local` to GitHub (`.gitignore` already blocks it).

**Nepal news:** requests use `country=np`, so the home page, Latest and category pages show news from Nepali sources. World news and search are not limited to Nepal. If Nepal has no article in a category, worldwide articles are shown instead.

**Free-plan limits (NewsData.io):** about 200 credits (requests) per day, 30 per 15 minutes, 10 articles per request, and articles may be delayed by about 12 hours. Next/Previous buttons are turned off because this API uses tokens instead of page numbers. Results are cached for 15 minutes to save requests.

## Running Locally
```
npm run dev
```
Open http://localhost:3000. Restart the command after editing `.env.local`.

## Building for Production
```
npm run build
npm start
```

## Troubleshooting
- **"Showing demo news" banner**: no key set, or the API returned an error. The message in brackets tells you why.
- **Invalid key**: check for spaces or quotes around the key, then restart `npm run dev`.
- **Rate limit**: you used your daily requests. Wait, or upgrade the API plan.
- **Images missing**: some sites block hotlinking; the placeholder is shown instead.
- **Port in use**: run `npm run dev -- -p 3001`.

## How to Change API Provider
Edit only `src/lib/newsApi.js`:
1. Change `buildUrl()` to create the new provider's request address.
2. Change `normalize()` so the new field names map to `title, description, url, image, source, publishedAt`.
3. Update the two values in `.env.local`.

## How to Add a New Category
Add a line to `CATEGORIES` in `src/data/categories.js`, for example `{ slug: "science", label: "Science", api: "science" }`. The page `/category/science` and the mobile menu update automatically. Add it to `NAV_LINKS` to show it in the desktop header too.

## How to Change Website Logo
The logo is text in `src/components/Header.jsx` and `Footer.jsx` (`News<span>Nepal</span>`). Edit the words there. The browser icon is `src/app/icon.svg`.

## How to Change Colors
Open `src/app/globals.css`. All colors are variables at the top (`--primary`, `--navy`, `--bg`, ...). Dark mode colors are under `[data-theme=dark]`.

## Git and GitHub
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## How to Deploy to Vercel
1. Push the project to GitHub (above).
2. Go to https://vercel.com, click **Add New → Project**, and import the repository.
3. Under **Environment Variables**, add `NEXT_PUBLIC_NEWS_API_KEY` and `NEXT_PUBLIC_NEWS_API_URL`.
4. Click **Deploy**.
5. Open the live link and check the home page, a category, search and an article.
