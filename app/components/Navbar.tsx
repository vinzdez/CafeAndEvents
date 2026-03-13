"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-stone-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AID Station Cafe"
            width={44}
            height={44}
            className=""
          />
          <span className="text-sm font-bold tracking-[0.15em] text-white uppercase">
            AID Station Cafe
          </span>
        </a>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          <a
            href="#events"
            className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors tracking-wide"
          >
            Events
          </a>
          <a
            href="#gallery"
            className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors tracking-wide"
          >
            Visit Cafe
          </a>
        </nav>
      </div>
    </header>
  );
}
