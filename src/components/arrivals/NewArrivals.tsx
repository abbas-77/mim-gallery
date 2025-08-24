// components/NewArrivals.tsx
import { FC } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Gold + Diamond Set", price: 1000, image: "/images/product1.jpg" },
  { id: 2, name: "Heart Shape Earrings", price: 800, image: "/images/product2.jpg" },
  { id: 3, name: "Ring Set", price: 1200, image: "/images/product3.jpg" },
  { id: 4, name: "Gold Set", price: 1200, image: "/images/product4.jpg" },
  { id: 5, name: "Love Gold Pendant", price: 800, image: "/images/product5.jpg" },
  { id: 6, name: "Chain Gold Set", price: 1000, image: "/images/product6.jpg" },
];

const NewArrivals: FC = () => {

  return (
    <section className="bg-gradient-to-b from-white to-[#fdf6ec] py-14 px-4 font-sans">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-[Playfair_Display] text-yellow-700 mb-4">
          New Arrivals
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-[15px]">
          Step into the world of brilliance with our latest creations. From timeless
          classics to modern designs, our New Arrivals are crafted to celebrate every
          moment in style. Explore these fresh, one-of-a-kind pieces before they’re gone.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative rounded-xl overflow-hidden shadow-sm group"
          >
            {/* Favorite Icon */}
            <button className="absolute top-4 right-4 bg-white rounded-full p-1.5 shadow hover:scale-110 transition z-10">
              <Heart className="w-5 h-5 text-gray-400" />
            </button>

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[420px] object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <h3 className="text-white text-lg font-medium">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yellow-400 font-semibold text-lg">
                  ${product.price}
                </span>
                <Link href={`/products/${product.id}`} className="bg-white text-gray-800 px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-14">
        <button className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
          View All Product →
        </button>
      </div>
    </section>
  );
};

export default NewArrivals;
