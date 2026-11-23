"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";
import Logo from "@/components/logo/Logo";
import { useI18n, useLocaleStore } from "@/providers/LocaleProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const toggleLocale = useLocaleStore((s) => s.toggleLocale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#new-arrivals", label: t.nav.newArrivals },
    { href: "/#atelier", label: t.nav.atelier },
    { href: "/#explore", label: t.nav.explore },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Transparent over the home hero, solid everywhere else
  const overlay = pathname === "/" && !scrolled && !open;

  const outline = overlay
    ? "border-ivory/40 hover:border-gold hover:text-gold-light"
    : "border-ink/15 hover:border-royal-900 hover:bg-royal-900 hover:text-ivory";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500 ${
        overlay
          ? "border-b border-transparent bg-transparent text-ivory"
          : "border-b border-ink/5 bg-ivory/90 text-ink backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 md:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label={t.brand}>
          <Logo
            title={t.brand}
            className={`h-11 w-auto transition-colors duration-500 ${overlay ? "text-gold" : "text-royal-900"}`}
          />
          <span className="hidden font-display text-lg font-medium sm:block">{t.brand}</span>
        </Link>

        <ul className="hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.2em] lg:flex rtl:text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.nav.switchLanguageLabel}
            className={`grid h-10 min-w-10 place-items-center border px-3 text-sm font-medium transition-colors duration-300 ${outline} ltr:font-[family-name:var(--font-vazir)]`}
          >
            {t.nav.switchLanguage}
          </button>
          <Link
            href="/login"
            className={`hidden h-10 items-center gap-2 border px-5 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:inline-flex rtl:text-sm ${outline}`}
          >
            <User className="h-4 w-4" strokeWidth={1.5} />
            {t.nav.account}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            className="p-2 lg:hidden"
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/5 bg-ivory px-6 pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col gap-5 font-display text-2xl">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="text-royal-900">
                {t.nav.account}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
