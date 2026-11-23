export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  karat: "18K" | "21K" | "24K";
  /** Weight in grams */
  weight: number;
  image: string;
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Gold & Diamond Set",
    category: "Sets",
    price: 1000,
    karat: "18K",
    weight: 14.2,
    image: "/images/product1.jpg",
    description:
      "A matched necklace and earring set in 18K yellow gold, set with brilliant-cut diamonds and finished by hand.",
    badge: "New",
  },
  {
    id: "2",
    name: "Heart Earrings",
    category: "Earrings",
    price: 800,
    karat: "18K",
    weight: 4.6,
    image: "/images/product2.jpg",
    description: "Soft, rounded hearts with a high-polish finish. Light enough to wear every day.",
  },
  {
    id: "3",
    name: "Stacking Ring Set",
    category: "Rings",
    price: 1200,
    karat: "18K",
    weight: 7.8,
    image: "/images/product3.jpg",
    description: "Three slim bands, one hammered, one plain and one twisted. Wear them together or apart.",
  },
  {
    id: "4",
    name: "Classic Gold Set",
    category: "Sets",
    price: 1200,
    karat: "21K",
    weight: 18.5,
    image: "/images/product4.jpg",
    description: "A traditional 21K set with a rich, warm colour, made for weddings and family occasions.",
  },
  {
    id: "5",
    name: "Love Pendant",
    category: "Necklaces",
    price: 800,
    karat: "18K",
    weight: 3.9,
    image: "/images/product5.jpg",
    description: "A small heart pendant on a fine cable chain, adjustable from 40 to 45 cm.",
    badge: "-20%",
  },
  {
    id: "6",
    name: "Chain Gold Set",
    category: "Chains",
    price: 1000,
    karat: "18K",
    weight: 12.1,
    image: "/images/product6.jpg",
    description: "A curb chain necklace and matching bracelet with a secure lobster clasp.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number) => priceFormatter.format(value);
