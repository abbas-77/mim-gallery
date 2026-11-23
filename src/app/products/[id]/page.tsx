"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Heart, ShieldCheck, Sparkles, Truck } from "lucide-react";
import ProductCarousel from "@/components/productCarousel/ProductCarousel";
import Reveal from "@/components/reveal/Reveal";
import { getProduct, hallmarkOf, products } from "@/data/products";
import { useI18n } from "@/providers/LocaleProvider";
import { formatKarat, formatNumber, formatWeight } from "@/i18n/format";

const assuranceIcons = [ShieldCheck, Truck, Sparkles];

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { t, locale } = useI18n();
  const product = getProduct(params?.id ?? "");
  const [saved, setSaved] = useState(false);
  const p = t.product;

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center gap-6 px-6 pt-20 text-center">
        <p className="eyebrow text-gold-dark">{p.notFoundEyebrow}</p>
        <h1 className="font-display text-4xl">{p.notFoundTitle}</h1>
        <Link href="/#explore" className="link-underline text-sm font-semibold uppercase tracking-[0.2em] text-royal-900">
          {p.backToGallery}
        </Link>
      </div>
    );
  }

  const related = products.filter((item) => item.id !== product.id);
  const specs = [
    { label: p.karat, value: formatKarat(product.karat, locale) },
    { label: p.weight, value: formatWeight(product.weight, locale) },
    { label: p.hallmark, value: formatNumber(hallmarkOf[product.karat], locale) },
  ];

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
        <Link
          href="/#explore"
          className="group mb-10 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-royal-900 rtl:text-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1" />
          {p.gallery}
        </Link>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="group relative aspect-[4/5] overflow-hidden bg-sand">
              <Image
                src={product.image}
                alt={product.name[locale]}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-lux)] group-hover:scale-110"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="flex flex-col">
            <p className="eyebrow text-gold-dark">{product.category[locale]}</p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl rtl:md:text-5xl">
              {product.name[locale]}
            </h1>
            <p className="mt-8 max-w-md leading-relaxed text-muted">{product.description[locale]}</p>

            <dl className="mt-10 grid grid-cols-3 border-y border-ink/10 py-6">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="eyebrow !text-[10px] text-muted rtl:!text-xs">{spec.label}</dt>
                  <dd className="mt-2 font-display text-2xl tabular-nums rtl:text-xl">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex gap-3">
              <button
                type="button"
                className="flex-1 bg-royal-900 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-royal-800 rtl:text-sm"
              >
                {p.addToBag}
              </button>
              <button
                type="button"
                onClick={() => setSaved((v) => !v)}
                aria-pressed={saved}
                aria-label={saved ? p.unsave : p.save}
                className="grid w-14 place-items-center border border-ink/15 text-royal-900 transition-colors duration-300 hover:border-gold"
              >
                <Heart className={`h-5 w-5 ${saved ? "fill-gold text-gold" : ""}`} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="mt-10 space-y-4">
              {p.assurances.map((text, i) => {
                const Icon = assuranceIcons[i];
                return (
                  <li key={text} className="flex items-center gap-3 text-sm text-muted">
                    <Icon className="h-5 w-5 text-gold-dark" strokeWidth={1.5} />
                    {text}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>

      <section className="overflow-x-clip border-t border-ink/10 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <ProductCarousel
            products={related}
            header={
              <>
                <p className="eyebrow text-gold-dark">{p.relatedEyebrow}</p>
                <h2 className="mt-4 font-display text-4xl font-medium rtl:text-3xl">{p.relatedTitle}</h2>
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
