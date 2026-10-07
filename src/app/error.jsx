"use client";
import ErrorMessage from "@/components/ErrorMessage";

export default function Error({ reset }) {
  return <div className="container page"><ErrorMessage onRetry={reset} /></div>;
}
