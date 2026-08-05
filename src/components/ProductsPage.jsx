import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { categories } from "../data/categories";
import ProductCard from "../components/ProductCard";

export default function ProductsPage({ searchQuery }) {
  const { products, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-500">
        <i className="fas fa-spinner fa-spin text-4xl text-[#d4af37]"></i>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pt-10 pb-24 md:pb-10">
      <div className="bg-[#0a0a0a] py-16 text-center px-4 mb-10">
        <h1 className="text-4xl md:text-5xl font-black italic text-[#d4af37] mb-2">
          All Products
        </h1>
        <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-bold">
          Premium Quality • Worldwide Shipping • Competitive Pricing
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Filters: Category + Sort Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          {/* Category Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2 text-sm text-gray-300 focus:border-[#d4af37] focus:outline-none appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon && <i className={`fas ${cat.icon} mr-2`}></i>}
                  {cat.name}
                </option>
              ))}
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2 text-sm text-gray-300 focus:border-[#d4af37] focus:outline-none appearance-none cursor-pointer"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Showing {filtered.length} products
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-search text-4xl text-gray-700 mb-4"></i>
            <p className="text-gray-400 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
