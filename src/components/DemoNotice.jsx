export default function DemoNotice({ isDemo, error }) {
  if (!isDemo) return null;
  return (
    <p className="notice" role="status">
      Showing demo news. Connect your News API to receive live updates.
      {error ? ` (${error})` : ""}
    </p>
  );
}
