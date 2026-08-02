import { useState, useMemo } from "react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ProductsPage({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Filter + Search + Sort — teeno ek saath
  const filtered = useMemo(() => {
    let result = [...products];

    // 1. Category filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Search filter (from Navbar)
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 3. Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="animate-fade-in pt-10 pb-24 md:pb-10">
      {/* Header */}
      <div className="bg-[#0a0a0a] py-16 text-center px-4 mb-10">
        <h1 className="text-4xl md:text-5xl font-black italic text-[#d4af37] mb-2">
          All Products
        </h1>
        <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-bold">
          Premium Quality • Worldwide Shipping • Competitive Pricing
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Category Buttons + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 whitespace-nowrap text-xs font-bold uppercase transition-all ${
                  activeCategory === cat.id
                    ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                    : "border-[#222] bg-[#111] text-gray-400 hover:border-[#d4af37]/50"
                }`}
              >
                <i className={`fas ${cat.icon}`}></i> {cat.name}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#111] border border-[#222] rounded-lg px-4 py-2 text-sm text-gray-300 focus:border-[#d4af37] focus:outline-none"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        {/* Count */}
        <p className="text-gray-500 text-sm mb-6">
          Showing {filtered.length} products
        </p>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-search text-4xl text-gray-700 mb-4"></i>
            <p className="text-gray-400 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
