"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reveal/Reveal";

export type ExploreItem = {
  id: string | number;
  src: string;
  alt?: string;
  title?: string;
  price?: string;
  badge?: string;
  href?: string;
};

interface ExploreMasonryProps {
  items: ExploreItem[];
  columnsClassName?: string;
}

export default function ExploreMasonry({
  items,
  columnsClassName = "columns-2 md:columns-3 lg:columns-4",
}: ExploreMasonryProps) {
  return (
    <section id="explore" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gold-dark">Explore</p>
            <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">The full gallery</h2>
          </div>
          <p className="max-w-sm leading-relaxed text-muted">
            Rings, chains, earrings and sets. Tap any piece to see its karat, weight and price.
          </p>
        </Reveal>

        <div className={`gap-4 md:gap-6 ${columnsClassName}`}>
          {items.map((item, i) => {
            const card = (
              <div className="group relative overflow-hidden bg-sand">
                <Image
                  src={item.src}
                  alt={item.alt || item.title || "Jewelry piece"}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="block h-auto w-full transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-royal-950/80 via-royal-950/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-5">
                  <div className="flex items-end justify-between gap-3 text-ivory">
                    <div className="min-w-0">
                      {item.title && <p className="font-display text-lg leading-tight md:text-xl">{item.title}</p>}
                      {item.price && <p className="mt-1 text-xs tracking-[0.14em] text-gold-light tabular-nums">{item.price}</p>}
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-light" strokeWidth={1.5} />
                  </div>
                </div>

                {item.badge && (
                  <span className="eyebrow absolute left-3 top-3 bg-ivory/90 px-2 py-1 !text-[10px] !tracking-[0.2em] text-royal-800">
                    {item.badge}
                  </span>
                )}
              </div>
            );

            return (
              <Reveal key={item.id} delay={(i % 4) * 90} className="mb-4 break-inside-avoid md:mb-6">
                {item.href ? (
                  <Link href={item.href} aria-label={item.title}>
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
