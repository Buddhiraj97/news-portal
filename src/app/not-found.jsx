import EmptyState from "@/components/EmptyState";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return <div className="container page"><EmptyState title="Page not found" message="The page you are looking for does not exist." /></div>;
}
