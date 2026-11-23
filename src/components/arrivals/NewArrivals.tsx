import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCarousel from "@/components/productCarousel/ProductCarousel";
import Reveal from "@/components/reveal/Reveal";
import { products } from "@/data/products";

export default function NewArrivals() {
  return (
    <section id="new-arrivals" className="scroll-mt-20 overflow-x-clip py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <ProductCarousel
            products={products}
            header={
              <>
                <p className="eyebrow text-gold-dark">New arrivals</p>
                <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">
                  Fresh from the bench
                </h2>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">
                  Our newest pieces in 18K and 21K gold. Each one is made in small numbers, so
                  once a piece is gone it may not come back.
                </p>
              </>
            }
          />
        </Reveal>

        <Reveal className="mt-14">
          <Link
            href="/#explore"
            className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-royal-800"
          >
            <span className="link-underline">View all pieces</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
