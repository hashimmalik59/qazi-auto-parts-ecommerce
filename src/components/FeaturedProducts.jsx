import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  // Featured products: Headlight(20), Roof(4), Quarter Panel(8), Brake Pads(30), etc.
  const featuredIds = [20, 4, 8, 30, 24, 36];
  const featured = products.filter((p) => featuredIds.includes(p.id));

  return (
    <section className="py-16 px-4 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase italic tracking-tighter text-white">
          <span className="text-[#d4af37]">Featured</span> Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="border-2 border-[#d4af37] text-[#d4af37] px-8 py-3 rounded-full font-bold hover:bg-[#d4af37] hover:text-black transition inline-flex items-center gap-2"
          >
            View All Products <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
