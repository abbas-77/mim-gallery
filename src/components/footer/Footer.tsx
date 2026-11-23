import Link from "next/link";

const shop = [
  { href: "/#new-arrivals", label: "New arrivals" },
  { href: "/#explore", label: "All pieces" },
  { href: "/#atelier", label: "Our atelier" },
];

const care = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-royal-950 text-ivory/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[2fr_1fr_1fr] md:px-12">
        <div>
          <Link href="/" className="font-display text-3xl font-medium tracking-[0.3em] text-ivory">
            MIM<span className="text-gold">.</span>
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">
            Fine gold jewelry, hand-finished and hallmarked. Made to be worn every day and
            handed down.
          </p>
        </div>

        <nav aria-label="Shop">
          <p className="eyebrow text-gold">Shop</p>
          <ul className="mt-5 space-y-3 text-sm">
            {shop.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Customer care">
          <p className="eyebrow text-gold">Customer care</p>
          <ul className="mt-5 space-y-3 text-sm">
            {care.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-xs md:flex-row md:px-12">
          <p>&copy; {new Date().getFullYear()} MIM Gallery. All rights reserved.</p>
          <p className="tracking-[0.16em] uppercase">18K · 21K · 24K gold</p>
        </div>
      </div>
    </footer>
  );
}
