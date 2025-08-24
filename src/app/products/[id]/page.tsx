'use client'

import { useParams } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";

const demoProducts = [
  { id: "1", src: "/images/product1.jpg", title: "Hammered Ring", price: 129, description: "Elegant hammered design." },
  { id: "2", src: "/images/tall1.jpg", title: "Pearl Necklace", price: 249, description: "Genuine pearls, handcrafted." },
  { id: "3", src: "/images/wide1.jpg", title: "Minimal Bracelet", price: 89, description: "Simple and elegant." },
];

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const product = demoProducts.find(p => p.id === id);

  if (!product) return <div className="p-10 text-center">محصول پیدا نشد!</div>;

  return (
    <div className="max-w-4xl mx-auto p-5 flex flex-col md:flex-row gap-8">
      {/* عکس محصول */}
      <div className="flex-1">
        <Image src={product.src} alt={product.title} width={600} height={600} className="w-full h-auto rounded-2xl"/>
      </div>

      {/* توضیحات محصول */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-xl text-gray-700">€{product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        {/* دکمه‌ها */}
        <div className="flex gap-3 mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">خرید</button>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-1"><Heart className="w-4 h-4"/> ذخیره</button>
        </div>
      </div>
    </div>
  );
}
