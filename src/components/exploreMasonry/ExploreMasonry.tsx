"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reveal/Reveal";
import type { Product } from "@/data/products";
import { useI18n } from "@/providers/LocaleProvider";
import { formatKarat, formatWeight } from "@/i18n/format";

interface ExploreMasonryProps {
  products: Product[];
  /** Demo only: repeat the list so the masonry has some depth */
  rounds?: number;
  columnsClassName?: string;
}

export default function ExploreMasonry({
  products,
  rounds = 3,
  columnsClassName = "columns-2 md:columns-3 lg:columns-4",
}: ExploreMasonryProps) {
  const { t, locale } = useI18n();
  const items = Array.from({ length: rounds }, (_, round) =>
    products.map((p) => ({ key: `${round}-${p.id}`, product: p, showBadge: round === 0 }))
  ).flat();

  return (
    <section id="explore" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gold-dark">{t.explore.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl rtl:text-3xl rtl:md:text-4xl">{t.explore.title}</h2>
          </div>
          <p className="max-w-sm leading-relaxed text-muted">{t.explore.body}</p>
        </Reveal>

        <div className={`gap-4 md:gap-6 ${columnsClassName}`}>
          {items.map(({ key, product, showBadge }, i) => {
            const name = product.name[locale];
            return (
              <Reveal key={key} delay={(i % 4) * 90} className="mb-4 break-inside-avoid md:mb-6">
                <Link href={`/products/${product.id}`} aria-label={name} className="group relative block overflow-hidden bg-sand">
                  <Image
                    src={product.image}
                    alt={name || t.explore.fallbackAlt}
                    width={800}
                    height={1000}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="block h-auto w-full transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.05]"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-royal-950/80 via-royal-950/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-5">
                    <div className="flex items-end justify-between gap-3 text-ivory">
                      <div className="min-w-0">
                        <p className="font-display text-lg leading-tight md:text-xl rtl:md:text-lg">{name}</p>
                        <p className="mt-1 text-xs tracking-[0.14em] text-gold-light tabular-nums">
                          {formatKarat(product.karat, locale)} · {formatWeight(product.weight, locale)}
                        </p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-light rtl:-scale-x-100" strokeWidth={1.5} />
                    </div>
                  </div>

                  {showBadge && product.badge && (
                    <span className="eyebrow absolute start-3 top-3 bg-ivory/90 px-2 py-1 !text-[10px] !tracking-[0.2em] text-royal-900 rtl:!text-xs">
                      {product.badge[locale]}
                    </span>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
