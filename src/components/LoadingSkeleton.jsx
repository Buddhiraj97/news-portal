import HeroSkeleton from "./HeroSkeleton";
import NewsCardSkeleton from "./NewsCardSkeleton";

export default function LoadingSkeleton({ hero = false, count = 6 }) {
  return (
    <div className="container page" aria-busy="true" aria-label="Loading news">
      {hero && <HeroSkeleton />}
      <div className="grid" style={{ marginTop: 24 }}>
        {Array.from({ length: count }).map((_, i) => <NewsCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
