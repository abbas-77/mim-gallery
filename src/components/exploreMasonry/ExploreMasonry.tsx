"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Heart, ZoomIn } from "lucide-react";
import gsap from "gsap";

export type ExploreItem = {
  id: string | number;
  src: string; // local path or configured remote domain
  alt?: string;
  title?: string;
  price?: string | number;
  badge?: string; // e.g. "New", "-20%"
};

interface ExploreMasonryProps {
  items: ExploreItem[];
  /**
   * Tailwind column classes. You can override if needed
   * e.g. "columns-1 sm:columns-2 md:columns-3 lg:columns-4"
   */
  columnsClassName?: string;
  /** Card class override for extra styling */
  cardClassName?: string;
  /** Animate on mount */
  withReveal?: boolean;
}

/**
 * ExploreMasonry – Pinterest-style, uneven-height image grid for product discovery.
 *
 * - Uses CSS multi-columns + `break-inside-avoid` to create a masonry layout.
 * - Lightweight, responsive, and works great with mixed image sizes.
 * - Optional GSAP reveal animation on first mount.
 *
 * Note: If you use external image URLs, add the host to `next.config.js > images.domains`.
 */
export default function ExploreMasonry({
  items,
  columnsClassName = "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5",
  cardClassName = "",
  withReveal = true,
}: ExploreMasonryProps) {
  const refs = useRef<HTMLDivElement[]>([]);

  // Clear and repopulate refs when items change
  useEffect(() => {
    refs.current = refs.current.slice(0, items.length);
  }, [items.length]);

  useEffect(() => {
    if (!withReveal) return;
    const elements = refs.current.filter(Boolean);
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 24 });
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.06,
    });
  }, [withReveal, items]);

  const formatted = useMemo(() => items, [items]);

  return (
    <div className="w-full px-5">
      {/* Header / Controls (optional): place filters or search here if you like */}
       <h2 className="text-4xl text-center font-[Playfair_Display] text-yellow-700 my-10">
          Explore
        </h2>

      {/* Masonry container */}
      <div className={`gap-4 ${columnsClassName}`}>
        {formatted.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
            className={`mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5 bg-white/5 backdrop-blur-sm ${cardClassName}`}
          >
            <div className="group relative">
              {/* Image wrapper (intrinsic ratio fallback for mixed sizes) */}
              <div className="relative w-full">
                {/* You can remove `fill` and set explicit width/height if you prefer fixed sizing */}
                <Image
                  src={item.src}
                  alt={item.alt || "product"}
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="w-full h-auto object-cover align-middle block transition-transform duration-300 group-hover:scale-[1.02]"
                  priority={i < 6}
                />

                {/* Overlay actions */}
                <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/50 via-black/10 to-transparent">
                  <span className="inline-flex items-center gap-1 text-white/95 text-sm font-medium">
                    <ZoomIn className="w-4 h-4" />
                    Quick view
                  </span>
                  <span className="inline-flex items-center gap-1 text-white/95 text-sm font-medium">
                    <Heart className="w-4 h-4" />
                    Save
                  </span>
                </div>

                {/* Badge */}
                {item.badge && (
                  <div className="absolute left-3 top-3 select-none rounded-full bg-black/70 text-white text-xs px-2 py-1">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Meta */}
              {(item.title || item.price) && (
                <div className="p-3">
                  {item.title && (
                    <div className="text-sm font-medium text-black/95">{item.title}</div>
                  )}
                  {typeof item.price !== "undefined" && (
                    <div className="text-xs text-black/70 mt-0.5">
                      {typeof item.price === "number" ? `€${item.price.toLocaleString()}` : item.price}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =======================
   Example usage (remove in prod)
======================= */
// import ExploreMasonry, { ExploreItem } from "./ExploreMasonry";
// const demoItems: ExploreItem[] = [
//   { id: 1, src: "/images/p1.jpg", title: "Hammered Ring", price: 129, badge: "New" },
//   { id: 2, src: "/images/tall1.jpg", title: "Pearl Necklace", price: 249 },
//   { id: 3, src: "/images/wide1.jpg", title: "Minimal Bracelet", price: 89, badge: "-20%" },
//   { id: 4, src: "/images/p2.jpg", title: "Classic Studs", price: 59 },
//   { id: 5, src: "/images/tall2.jpg", title: "Diamond Pendant", price: 399 },
//   { id: 6, src: "/images/wide2.jpg", title: "Stackable Rings", price: 149 },
//   // ...more
// ];
// <ExploreMasonry items={demoItems} />
