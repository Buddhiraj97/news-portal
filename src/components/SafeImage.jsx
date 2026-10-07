"use client";
import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/images/placeholder.svg";

// Next.js Image that falls back to a placeholder if the picture is missing or broken.
export default function SafeImage({ src, alt = "", priority = false, sizes = "(max-width: 768px) 100vw, 33vw" }) {
  const [failed, setFailed] = useState(false);
  const finalSrc = !src || failed ? FALLBACK : src;
  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={finalSrc === FALLBACK}
      onError={() => setFailed(true)}
    />
  );
}
