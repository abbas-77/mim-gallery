import NewArrivals from "@/components/arrivals/NewArrivals";
import Atelier from "@/components/atelier/Atelier";
import FullScreenSlider from "@/components/fullScreenSlider/FullScreenSlider";
import ExploreMasonry from "@/components/exploreMasonry/ExploreMasonry";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <FullScreenSlider />
      <NewArrivals />
      <Atelier />
      <ExploreMasonry products={products} />
    </>
  );
}
