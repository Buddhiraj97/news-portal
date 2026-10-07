"use client";
import { useState } from "react";

export default function Newsletter({ compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "error"

  function submit(e) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? "success" : "error");
    if (valid) setEmail("");
  }

  return (
    <section className={`newsletter${compact ? " newsletter-compact" : ""}`}>
      <h2>Stay Updated</h2>
      <p>Get the latest news directly in your inbox.</p>
      <form onSubmit={submit} noValidate>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-label="Email address" />
        <button type="submit" className="btn">Subscribe</button>
      </form>
      <p className={`form-msg ${status || ""}`} role="status">
        {status === "success" && "Thanks for subscribing!"}
        {status === "error" && "Please enter a valid email address."}
      </p>
    </section>
  );
}
