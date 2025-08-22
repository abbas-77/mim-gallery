'use client'
import ProductCard from "@/components/productCard/ProductCard";
import SearchBar from "@/components/searchBar/SearchBar";
import LandingBanner from "@/components/landingBanner/LandingBanner";
import { useState } from "react";
import NewArrivals from "@/components/arrivals/NewArrivals";
import FullScreenSlider from "@/components/fullScreenSlider/FullScreenSlider";
import ExploreMasonry, { ExploreItem } from "@/components/exploreMasonry/ExploreMasonry";


export default function Home() {
   const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const demoItems: ExploreItem[] = [
  { id: 1, src: "/images/product1.jpg", title: "Hammered Ring", price: 129, badge: "New" },
  { id: 2, src: "/images/product2.jpg", title: "Pearl Necklace", price: 249 },
  { id: 3, src: "/images/product5.jpg", title: "Minimal Bracelet", price: 89, badge: "-20%" },
  { id: 4, src: "/images/product7.jpg", title: "Classic Studs", price: 59 },
  { id: 5, src: "/images/product4.jpg", title: "Diamond Pendant", price: 399 },
  { id: 6, src: "/images/product3.jpg", title: "Stackable Rings", price: 149 },
  { id: 1, src: "/images/product1.jpg", title: "Hammered Ring", price: 129, badge: "New" },
  { id: 2, src: "/images/product2.jpg", title: "Pearl Necklace", price: 249 },
  { id: 3, src: "/images/product5.jpg", title: "Minimal Bracelet", price: 89, badge: "-20%" },
  { id: 4, src: "/images/product7.jpg", title: "Classic Studs", price: 59 },
  { id: 5, src: "/images/product4.jpg", title: "Diamond Pendant", price: 399 },
  { id: 6, src: "/images/product3.jpg", title: "Stackable Rings", price: 149 },
  { id: 1, src: "/images/product1.jpg", title: "Hammered Ring", price: 129, badge: "New" },
  { id: 2, src: "/images/product2.jpg", title: "Pearl Necklace", price: 249 },
  { id: 3, src: "/images/product5.jpg", title: "Minimal Bracelet", price: 89, badge: "-20%" },
  { id: 4, src: "/images/product7.jpg", title: "Classic Studs", price: 59 },
  { id: 5, src: "/images/product4.jpg", title: "Diamond Pendant", price: 399 },
  { id: 6, src: "/images/product3.jpg", title: "Stackable Rings", price: 149 },
  // ...more
];

  return (
    <div className="bg-gradient-to-b from-white to-[#fdf6ec]">
      <FullScreenSlider />
      {/* <SearchBar 
      value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      /> */}
      <NewArrivals />
      <ExploreMasonry items={demoItems} />
    </div>
  );
}
