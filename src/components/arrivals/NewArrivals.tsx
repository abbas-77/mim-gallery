"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCarousel from "@/components/productCarousel/ProductCarousel";
import Reveal from "@/components/reveal/Reveal";
import { products } from "@/data/products";
import { useI18n } from "@/providers/LocaleProvider";

export default function NewArrivals() {
  const { t } = useI18n();

  return (
    <section id="new-arrivals" className="scroll-mt-20 overflow-x-clip py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <ProductCarousel
            products={products}
            header={
              <>
                <p className="eyebrow text-gold-dark">{t.arrivals.eyebrow}</p>
                <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl rtl:text-3xl rtl:md:text-4xl">
                  {t.arrivals.title}
                </h2>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{t.arrivals.body}</p>
              </>
            }
          />
        </Reveal>

        <Reveal className="mt-14">
          <Link
            href="/#explore"
            className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-royal-900 rtl:text-sm"
          >
            <span className="link-underline">{t.arrivals.viewAll}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
