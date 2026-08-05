import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const { products, loading } = useProducts();

  // ✅ Loading state handle karo
  if (loading) {
    return (
      <section className="py-16 px-4 bg-[#080808] flex justify-center items-center">
        <i className="fas fa-spinner fa-spin text-4xl text-[#d4af37]"></i>
      </section>
    );
  }

  // ✅ Featured products: Un products ko filter karo jinka badge "popular" hai
  // Ya agar aapne Firestore mein koi flag daala hai (jaise isFeatured: true)
  const featured = products.filter(
    (p) => p.badge === "popular" || p.badge === "searched",
  );

  // ✅ Agar featured products nahi mile, toh random 4 products dikhao
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <section className="py-16 px-4 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase italic tracking-tighter text-white">
          <span className="text-[#d4af37]">Featured</span> Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
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
