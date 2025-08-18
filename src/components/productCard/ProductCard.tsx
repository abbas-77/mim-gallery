import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";

type Props = {
  imageUrl: string;
  title: string;
  price: number;
  description: string;
  location: string;
  meters: number;
};

const ProductCard = ({
  imageUrl,
  title,
  price,
  description,
  location,
  meters,
}: Props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:scale-105 duration-300">
      <Image
        src={imageUrl}
        alt="Product Image"
        width={300}
        height={200}
        className="object-cover w-full h-48"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-blue-600 font-bold text-sm">${price}</p>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex items-center text-gray-500 text-sm space-x-2 mt-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">{meters} m²</p>
      </div>
    </div>
  );
};

export default ProductCard;
