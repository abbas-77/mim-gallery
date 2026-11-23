"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";

type Props = {
  product: Product;
  sizes?: string;
};

const ProductCard = ({ product, sizes = "(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw" }: Props) => {
  const [saved, setSaved] = useState(false);
  const href = `/products/${product.id}`;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link href={href} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 bg-royal-950/0 transition-colors duration-500 group-hover:bg-royal-950/10" />
        </Link>

        <span className="eyebrow absolute left-4 top-4 bg-ivory/90 px-2.5 py-1 !text-[10px] !tracking-[0.2em] text-royal-800">
          {product.badge ?? product.karat}
        </span>

        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ivory/90 text-royal-800 transition-transform duration-300 hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-gold text-gold" : ""}`} strokeWidth={1.5} />
        </button>

        <Link
          href={href}
          className="absolute inset-x-4 bottom-4 translate-y-3 bg-royal-900 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory opacity-0 transition-all duration-500 ease-[var(--ease-lux)] hover:bg-royal-800 group-hover:translate-y-0 group-hover:opacity-100"
        >
          View details
        </Link>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-medium leading-tight">
            <Link href={href} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-muted">
            {product.karat} gold · {product.weight} g
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold tabular-nums text-royal-800">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
