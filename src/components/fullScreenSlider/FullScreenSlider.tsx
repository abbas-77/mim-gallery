// components/FullScreenSliderGSAP.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/banner1.jpg",
    title: "Elegant Gold Collection",
    description: "Discover timeless designs crafted with passion and precision.",
  },
  {
    id: 2,
    image: "/images/banner2.jpg",
    title: "Luxury Diamond Sets",
    description: "Sparkle in every moment with our exclusive diamond pieces.",
  },
  {
    id: 3,
    image: "/images/banner3.jpg",
    title: "Modern Minimal Jewelry",
    description: "Simplicity meets elegance in our latest modern collection.",
  },
  {
    id: 4,
    image: "/images/banner4.jpg",
    title: "Classic Engagement Rings",
    description: "Celebrate love with our exquisite engagement ring designs.",
  },
];

export default function FullScreenSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const sliderRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);

  const animateSlide = (newIndex: number, dir: "left" | "right") => {
  if (!sliderRef.current) return;

  const slidesEls = sliderRef.current.children;
  const currentSlide = slidesEls[current] as HTMLElement;
  const nextSlide = slidesEls[newIndex] as HTMLElement;

  // hide text of next slide before animation
  const nextText = textRefs.current[newIndex];
  if (nextText) {
    gsap.set(nextText.children, { opacity: 0, y: 40 });
  }

  gsap.set(nextSlide, {
    x: dir === "right" ? "100%" : "-100%",
    zIndex: 2,
  });
  gsap.set(currentSlide, { zIndex: 1 });

  gsap
    .timeline()
    .to(
      currentSlide,
      {
        x: dir === "right" ? "-100%" : "100%",
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    )
    .to(
      nextSlide,
      {
        x: "0%",
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // animate text AFTER slide transition
          if (nextText) {
            gsap.to(nextText.children, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              delay: 0.3, // تاخیر برای اینکه متن بعد از تصویر بیاد
              ease: "power3.out",
            });
          }
        },
      },
      0
    );
};


  const goToSlide = (index: number, dir: "left" | "right") => {
    if (index === current) return;
    animateSlide(index, dir);
    setDirection(dir);
    setCurrent(index);
  };

  const nextSlide = () => {
    goToSlide((current + 1) % slides.length, "right");
  };

  const prevSlide = () => {
    goToSlide((current - 1 + slides.length) % slides.length, "left");
  };

  // Auto slide
  useEffect(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      if (!isHovering.current) nextSlide();
    }, 5000);
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [current]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      {/* Slides */}
      <div ref={sliderRef} className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute top-0 left-0 w-full h-full bg-center bg-cover flex items-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              zIndex: index === current ? 2 : 1,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Text */}
            <div
              ref={(el) => {
                if (el) textRefs.current[index] = el;
              }}
              className="relative z-10 px-10 md:px-20 text-white max-w-2xl"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() =>
              goToSlide(index, index > current ? "right" : "left")
            }
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
