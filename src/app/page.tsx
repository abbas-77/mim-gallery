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
  { id: 7, src: "/images/product1.jpg", title: "Hammered Ring", price: 129, badge: "New" },
  { id: 8, src: "/images/product2.jpg", title: "Pearl Necklace", price: 249 },
  { id: 9, src: "/images/product5.jpg", title: "Minimal Bracelet", price: 89, badge: "-20%" },
  { id: 10, src: "/images/product7.jpg", title: "Classic Studs", price: 59 },
  { id: 11, src: "/images/product4.jpg", title: "Diamond Pendant", price: 399 },
  { id: 12, src: "/images/product3.jpg", title: "Stackable Rings", price: 149 },
  { id: 13, src: "/images/product1.jpg", title: "Hammered Ring", price: 129, badge: "New" },
  { id: 14, src: "/images/product2.jpg", title: "Pearl Necklace", price: 249 },
  { id: 15, src: "/images/product5.jpg", title: "Minimal Bracelet", price: 89, badge: "-20%" },
  { id: 16, src: "/images/product7.jpg", title: "Classic Studs", price: 59 },
  { id: 17, src: "/images/product4.jpg", title: "Diamond Pendant", price: 399 },
  { id: 18, src: "/images/product3.jpg", title: "Stackable Rings", price: 149 },
  // ...more
];

  return (
    <div className="bg-[#fdf6ec] pb-5">
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
