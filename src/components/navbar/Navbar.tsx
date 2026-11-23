"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";

const links = [
  { href: "/#new-arrivals", label: "New arrivals" },
  { href: "/#atelier", label: "Atelier" },
  { href: "/#explore", label: "Explore" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Transparent over the home hero, solid everywhere else
  const overlay = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500 ${
        overlay
          ? "border-b border-transparent bg-transparent text-ivory"
          : "border-b border-ink/5 bg-ivory/90 text-ink backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link href="/" className="font-display text-2xl font-medium tracking-[0.3em]">
          MIM<span className="text-gold">.</span>
        </Link>

        <ul className="hidden items-center gap-10 text-[12px] font-medium uppercase tracking-[0.2em] md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={`hidden items-center gap-2 border px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:inline-flex ${
              overlay
                ? "border-ivory/40 hover:border-gold hover:text-gold-light"
                : "border-ink/15 hover:border-royal-800 hover:bg-royal-800 hover:text-ivory"
            }`}
          >
            <User className="h-4 w-4" strokeWidth={1.5} />
            Account
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-2 md:hidden"
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/5 bg-ivory px-6 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col gap-5 font-display text-2xl">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="text-royal-800">
                Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
