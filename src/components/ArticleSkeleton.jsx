export default function ArticleSkeleton() {
  return (
    <div className="container article" aria-hidden="true">
      <div className="sk" style={{ height: 14, width: "20%" }} />
      <div className="sk" style={{ height: 40, margin: "16px 0 8px" }} />
      <div className="sk" style={{ height: 40, width: "70%" }} />
      <div className="sk" style={{ aspectRatio: "16/9", margin: "24px 0" }} />
      <div className="sk" style={{ height: 16, margin: "8px 0" }} />
      <div className="sk" style={{ height: 16, width: "85%" }} />
    </div>
  );
}
