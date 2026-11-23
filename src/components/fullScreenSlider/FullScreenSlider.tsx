"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

interface Slide {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/banner1.jpg",
    eyebrow: "The gold collection",
    title: "Gold, made to be kept",
    description: "Timeless 18K pieces, hand-finished at our bench and hallmarked 750.",
  },
  {
    id: 2,
    image: "/images/banner2.jpg",
    eyebrow: "Diamond sets",
    title: "Light, held in gold",
    description: "Brilliant-cut diamonds in settings designed to catch every angle.",
  },
  {
    id: 3,
    image: "/images/banner3.jpg",
    eyebrow: "Modern minimal",
    title: "Less, in solid gold",
    description: "Clean lines and quiet shapes for the jewelry you never take off.",
  },
  {
    id: 4,
    image: "/images/banner4.jpg",
    eyebrow: "Engagement",
    title: "For the question",
    description: "Engagement rings sized, engraved and finished to order.",
  },
];

const AUTOPLAY_DELAY = 6000;

export default function FullScreenSlider() {
  const [active, setActive] = useState(0);

  return (
    <section className="hero relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-royal-950">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1400}
        loop
        keyboard={{ enabled: true }}
        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        pagination={{ el: ".hero-pagination", clickable: true }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-media absolute inset-0 overflow-hidden">
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-royal-950/90 via-royal-950/50 to-royal-950/10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-royal-950/70 to-transparent" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12">
              <div className="hero-copy max-w-xl text-ivory">
                <p className="eyebrow text-gold-light">{slide.eyebrow}</p>
                <h2 className="mt-6 font-display text-5xl font-medium leading-[1.02] md:text-7xl">
                  {slide.title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75 md:text-lg">
                  {slide.description}
                </p>
                <div className="mt-10">
                  <Link
                    href="/#new-arrivals"
                    className="group inline-flex items-center gap-3 bg-gold px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-royal-950 transition-colors duration-300 hover:bg-gold-light"
                  >
                    Shop the collection
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 pb-10 md:px-12">
          <div className="pointer-events-auto flex items-center gap-5 text-ivory">
            <span className="font-display text-xl tabular-nums">
              {String(active + 1).padStart(2, "0")}
              <span className="text-ivory/40"> / {String(slides.length).padStart(2, "0")}</span>
            </span>
            <div className="hero-pagination" />
          </div>
          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              className="hero-prev grid h-12 w-12 place-items-center border border-ivory/30 text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-royal-950"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="hero-next grid h-12 w-12 place-items-center border border-ivory/30 text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-royal-950"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
