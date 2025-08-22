'use client'
import ProductCard from "@/components/productCard/ProductCard";
import SearchBar from "@/components/searchBar/SearchBar";
import LandingBanner from "@/components/landingBanner/LandingBanner";
import { useState } from "react";
import NewArrivals from "@/components/arrivals/NewArrivals";


export default function Home() {
   const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };
  const products = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/300',
    title: 'Modern Apartment',
    price: 120000,
    description: 'A cozy apartment in the city center.',
    location: 'Tehran, Iran',
    meters: 85,
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/300',
    title: 'Luxury Villa',
    price: 450000,
    description: 'A beautiful villa with private pool.',
    location: 'Shiraz, Iran',
    meters: 250,
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/300',
    title: 'Studio Flat',
    price: 70000,
    description: 'Compact studio flat ideal for singles.',
    location: 'Isfahan, Iran',
    meters: 45,
  },
  {
    id: 4,
    imageUrl: 'https://via.placeholder.com/300',
    title: 'Studio Flat',
    price: 70000,
    description: 'Compact studio flat ideal for singles.',
    location: 'Isfahan, Iran',
    meters: 45,
  },
  {
    id: 5,
    imageUrl: 'https://via.placeholder.com/300',
    title: 'Studio Flat',
    price: 70000,
    description: 'Compact studio flat ideal for singles.',
    location: 'Isfahan, Iran',
    meters: 45,
  },
];
  return (
    <div>
      <LandingBanner />
      <SearchBar 
      value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <NewArrivals />
       <div className="px-20 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          imageUrl={product?.imageUrl}
          title={product.title}
          price={product.price}
          description={product.description}
          location={product.location}
          meters={product.meters}
        />
      ))}
    </div>
    </div>
  );
}
