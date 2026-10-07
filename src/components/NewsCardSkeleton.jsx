export default function NewsCardSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <div className="sk" style={{ aspectRatio: "16/10" }} />
      <div className="card-body">
        <div className="sk" style={{ height: 12, width: "30%" }} />
        <div className="sk" style={{ height: 18 }} />
        <div className="sk" style={{ height: 18, width: "80%" }} />
        <div className="sk" style={{ height: 12, width: "50%" }} />
      </div>
    </div>
  );
}
