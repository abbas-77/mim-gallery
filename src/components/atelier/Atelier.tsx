"use client";

import Image from "next/image";
import Logo from "@/components/logo/Logo";
import Reveal from "@/components/reveal/Reveal";
import { useI18n } from "@/providers/LocaleProvider";

export default function Atelier() {
  const { t } = useI18n();
  const a = t.atelier;

  return (
    <section id="atelier" className="scroll-mt-20 overflow-x-clip bg-royal-900 text-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-12 md:py-32">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src="/images/banner3.jpg" alt={a.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          {/* Offset gold frame */}
          <div className="pointer-events-none absolute -bottom-5 -end-5 hidden h-full w-full border border-gold/50 md:block" />
        </Reveal>

        <div>
          <Reveal>
            <Logo className="mb-8 h-14 w-auto text-gold" title={t.brand} />
            <p className="eyebrow text-gold">{a.eyebrow}</p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight md:text-5xl rtl:text-3xl rtl:md:text-4xl">
              {a.titleBefore}
              <em className="text-gold-light">{a.titleEm}</em>
              {a.titleAfter}
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ivory/70">{a.body}</p>
          </Reveal>

          <dl className="mt-12 grid gap-8 border-t border-ivory/10 pt-10 sm:grid-cols-3">
            {a.facts.map((fact, i) => (
              <Reveal key={i} delay={i * 120}>
                <dt className="font-display text-4xl text-gold rtl:text-3xl">{fact.value}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ivory/60">{fact.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
