import NewArrivals from "@/components/arrivals/NewArrivals";
import Atelier from "@/components/atelier/Atelier";
import FullScreenSlider from "@/components/fullScreenSlider/FullScreenSlider";
import ExploreMasonry, { type ExploreItem } from "@/components/exploreMasonry/ExploreMasonry";
import { formatPrice, products } from "@/data/products";

// Demo gallery: the product list repeated so the masonry has some depth
const exploreItems: ExploreItem[] = [0, 1, 2].flatMap((round) =>
  products.map((p) => ({
    id: `${round}-${p.id}`,
    src: p.image,
    title: p.name,
    price: formatPrice(p.price),
    badge: round === 0 ? p.badge : undefined,
    href: `/products/${p.id}`,
  }))
);

export default function Home() {
  return (
    <>
      <FullScreenSlider />
      <NewArrivals />
      <Atelier />
      <ExploreMasonry items={exploreItems} />
    </>
  );
}
