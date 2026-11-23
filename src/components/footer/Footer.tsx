"use client";

import Link from "next/link";
import Logo from "@/components/logo/Logo";
import { useI18n } from "@/providers/LocaleProvider";
import { formatNumber } from "@/i18n/format";

export default function Footer() {
  const { t, locale } = useI18n();
  const f = t.footer;

  const columns = [
    {
      title: f.shop,
      links: [
        { href: "/#new-arrivals", label: t.nav.newArrivals },
        { href: "/#explore", label: f.allPieces },
        { href: "/#atelier", label: f.ourAtelier },
      ],
    },
    {
      title: f.care,
      links: [
        { href: "/contact", label: f.contact },
        { href: "/privacy", label: f.privacy },
        { href: "/terms", label: f.terms },
      ],
    },
  ];

  return (
    <footer id="contact" className="bg-royal-900 text-ivory/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[2fr_1fr_1fr] md:px-12">
        <div>
          <Link href="/" aria-label={t.brand} className="inline-block text-gold">
            <Logo variant="full" title={t.brand} className="h-28 w-auto" />
          </Link>
          {locale === "fa" && <p className="mt-4 font-display text-xl text-gold">{t.brand}</p>}
          <p className="mt-5 max-w-sm leading-relaxed">{f.blurb}</p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="eyebrow text-gold">{col.title}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline transition-colors hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-xs md:flex-row md:px-12">
          <p>{f.rights(formatNumber(new Date().getFullYear(), locale))}</p>
          <p className="uppercase tracking-[0.16em]">{f.karats}</p>
        </div>
      </div>
    </footer>
  );
}
