import Image from "next/image";
import Reveal from "@/components/reveal/Reveal";

const facts = [
  { value: "750", label: "Hallmark stamped on every 18K piece" },
  { value: "100%", label: "Hand-finished and polished in our workshop" },
  { value: "Free", label: "Cleaning and re-polishing for life" },
];

export default function Atelier() {
  return (
    <section id="atelier" className="scroll-mt-20 bg-royal-900 text-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-12 md:py-32">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/banner3.jpg"
              alt="Gold jewelry in the MIM workshop"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Offset gold frame */}
          <div className="pointer-events-none absolute -bottom-5 -right-5 hidden h-full w-full border border-gold/50 md:block" />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-gold">The atelier</p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight md:text-5xl">
              Every piece starts as a sketch and an ingot of <em className="text-gold-light">gold</em>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ivory/70">
              Our goldsmiths cast, set and polish each ring, chain and pendant by hand. Before a
              piece leaves the bench it is weighed, checked for purity and hallmarked, so you
              always know exactly what you are wearing.
            </p>
          </Reveal>

          <dl className="mt-12 grid gap-8 border-t border-ivory/10 pt-10 sm:grid-cols-3">
            {facts.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 120}>
                <dt className="font-display text-4xl text-gold">{fact.value}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ivory/60">{fact.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
