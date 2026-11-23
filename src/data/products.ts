import type { Localized } from "@/i18n/config";

export type Karat = "18K" | "21K" | "24K";

export interface Product {
  id: string;
  name: Localized;
  category: Localized;
  price: number;
  karat: Karat;
  /** Weight in grams */
  weight: number;
  image: string;
  description: Localized;
  badge?: Localized;
}

const badges = {
  new: { en: "New", fa: "جدید" },
  limited: { en: "Limited", fa: "تعداد محدود" },
} satisfies Record<string, Localized>;

export const products: Product[] = [
  {
    id: "1",
    name: { en: "Gold & Diamond Set", fa: "سرویس طلا و الماس" },
    category: { en: "Sets", fa: "سرویس" },
    price: 1000,
    karat: "18K",
    weight: 14.2,
    image: "/images/product1.jpg",
    description: {
      en: "A matched necklace and earring set in 18K yellow gold, set with brilliant-cut diamonds and finished by hand.",
      fa: "سرویس گردنبند و گوشواره از طلای زرد ۱۸ عیار با نگین‌های الماس برلیان و پرداخت دستی.",
    },
    badge: badges.new,
  },
  {
    id: "2",
    name: { en: "Heart Earrings", fa: "گوشواره قلب" },
    category: { en: "Earrings", fa: "گوشواره" },
    price: 800,
    karat: "18K",
    weight: 4.6,
    image: "/images/product2.jpg",
    description: {
      en: "Soft, rounded hearts with a high-polish finish. Light enough to wear every day.",
      fa: "قلب‌های نرم و گرد با پرداخت براق؛ آن‌قدر سبک که هر روز بپوشید.",
    },
  },
  {
    id: "3",
    name: { en: "Stacking Ring Set", fa: "ست انگشتر چندتایی" },
    category: { en: "Rings", fa: "انگشتر" },
    price: 1200,
    karat: "18K",
    weight: 7.8,
    image: "/images/product3.jpg",
    description: {
      en: "Three slim bands, one hammered, one plain and one twisted. Wear them together or apart.",
      fa: "سه رینگ باریک: چکشی، ساده و تابیده. با هم یا جدا بپوشید.",
    },
  },
  {
    id: "4",
    name: { en: "Classic Gold Set", fa: "سرویس طلای کلاسیک" },
    category: { en: "Sets", fa: "سرویس" },
    price: 1200,
    karat: "21K",
    weight: 18.5,
    image: "/images/product4.jpg",
    description: {
      en: "A traditional 21K set with a rich, warm colour, made for weddings and family occasions.",
      fa: "سرویس سنتی ۲۱ عیار با رنگی گرم و پررنگ، برای عروسی و مناسبت‌های خانوادگی.",
    },
  },
  {
    id: "5",
    name: { en: "Love Pendant", fa: "آویز قلب" },
    category: { en: "Necklaces", fa: "گردنبند" },
    price: 800,
    karat: "18K",
    weight: 3.9,
    image: "/images/product5.jpg",
    description: {
      en: "A small heart pendant on a fine cable chain, adjustable from 40 to 45 cm.",
      fa: "آویز قلب کوچک روی زنجیر ظریف، قابل تنظیم از ۴۰ تا ۴۵ سانتی‌متر.",
    },
    badge: badges.limited,
  },
  {
    id: "6",
    name: { en: "Chain Gold Set", fa: "سرویس زنجیر طلا" },
    category: { en: "Chains", fa: "زنجیر" },
    price: 1000,
    karat: "18K",
    weight: 12.1,
    image: "/images/product6.jpg",
    description: {
      en: "A curb chain necklace and matching bracelet with a secure lobster clasp.",
      fa: "گردنبند و دستبند زنجیر کارتیه با قفل طوطی محکم.",
    },
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

/** Fineness stamped on the piece (parts per thousand) */
export const hallmarkOf: Record<Karat, number> = { "18K": 750, "21K": 875, "24K": 999 };
