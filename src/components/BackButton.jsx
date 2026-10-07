"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();
  return <button className="btn btn-ghost" onClick={() => router.back()}><FaArrowLeft aria-hidden="true" /> Back</button>;
}
