"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, FreeMode, Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/productCard/ProductCard";
import type { Product } from "@/data/products";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

type Props = {
  products: Product[];
  /** Rendered on the left of the arrow buttons */
  header?: React.ReactNode;
};

export default function ProductCarousel({ products, header }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const syncEdges = (s: SwiperType) => setEdges({ start: s.isBeginning, end: s.isEnd });

  const arrowClass =
    "grid h-12 w-12 place-items-center border border-ink/15 text-ink transition-colors duration-300 hover:border-royal-800 hover:bg-royal-800 hover:text-ivory disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0 flex-1">{header}</div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous products" className={arrowClass} disabled={edges.start} onClick={() => swiper?.slidePrev()}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next products" className={arrowClass} disabled={edges.end} onClick={() => swiper?.slideNext()}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[FreeMode, Scrollbar, Keyboard, Mousewheel, A11y]}
        className="product-swiper !overflow-visible"
        slidesPerView={1.15}
        spaceBetween={20}
        speed={700}
        freeMode={{ enabled: true, sticky: true, momentumRatio: 0.6 }}
        mousewheel={{ forceToAxis: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: { slidesPerView: 2.1, spaceBetween: 24 },
          1024: { slidesPerView: 3.1, spaceBetween: 28 },
          1280: { slidesPerView: 4, spaceBetween: 32 },
        }}
        onSwiper={(s) => {
          setSwiper(s);
          syncEdges(s);
        }}
        onSlideChange={syncEdges}
        onReachBeginning={syncEdges}
        onReachEnd={syncEdges}
        onProgress={syncEdges}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
