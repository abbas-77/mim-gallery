"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Heart, ZoomIn } from "lucide-react";
import gsap from "gsap";

export type ExploreItem = {
  id: string | number;
  src: string;
  alt?: string;
  title?: string;
  price?: string | number;
  badge?: string;
};

interface ExploreMasonryProps {
  items: ExploreItem[];
  columnsClassName?: string;
  cardClassName?: string;
  withReveal?: boolean;
}

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
       <h2 className="text-4xl text-center font-[Playfair_Display] text-yellow-700 my-10">
          Explore
        </h2>

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
              <div className="relative w-full">
                <Image
                  src={item.src}
                  alt={item.alt || "product"}
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="w-full h-auto object-cover align-middle block transition-transform duration-300 group-hover:scale-[1.02]"
                  priority={i < 6}
                />

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

                {item.badge && (
                  <div className="absolute left-3 top-3 select-none rounded-full bg-black/70 text-white text-xs px-2 py-1">
                    {item.badge}
                  </div>
                )}
              </div>

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
