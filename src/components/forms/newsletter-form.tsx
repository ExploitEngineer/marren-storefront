"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("You're on the list.", { description: "Look out for 10% off your first frame." });
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-4" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/5 p-1.5 focus-within:border-white/40">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          className="w-full bg-transparent px-3 py-2 text-sm text-oat-50 placeholder:text-oat-100/45 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[7px] bg-oat-50 px-4 text-sm font-medium text-oat-900 transition-colors hover:bg-white"
        >
          Join
          <ArrowRight className="size-4" />
        </button>
      </div>
      <p className="mt-2.5 text-xs text-oat-100/50">One thoughtful email a month. Unsubscribe anytime.</p>
    </form>
  );
}
