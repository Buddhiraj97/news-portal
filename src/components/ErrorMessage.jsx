"use client";
import { useRouter } from "next/navigation";

export default function ErrorMessage({ title = "Unable to load news.", message = "Please check your internet connection or try again.", onRetry }) {
  const router = useRouter();
  return (
    <div className="state" role="alert">
      <h2>{title}</h2>
      <p>{message}</p>
      <button className="btn" onClick={onRetry || (() => router.refresh())}>Try Again</button>
    </div>
  );
}
