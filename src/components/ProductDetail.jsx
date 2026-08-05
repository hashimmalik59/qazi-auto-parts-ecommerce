import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  // Related products (same category, exclude current)
  const related = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="pt-20 text-center text-gray-400">
        <h2 className="text-2xl mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="text-[#d4af37] underline"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappLink = `https://wa.me/8615158939407?text=${encodeURIComponent(
    `Hi Qazi Auto Parts, I want to order:\n\nProduct: ${product.name}\nSKU: ${product.sku}\nQuantity: ${qty}\nPrice: $${product.price * qty}\n\nPlease confirm availability.`,
  )}`;

  return (
    <div className="pt-10 pb-24 md:pb-10 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#d4af37] mb-6 flex items-center gap-2 transition"
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>

        {/* Product Info Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="bg-[#0a0a0a] rounded-3xl p-8 flex items-center justify-center border border-[#222]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-80 object-contain"
              onError={(e) => {
                e.target.src = "/Assets/placeholder.png";
              }}
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">
                {product.sku}
              </p>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="text-2xl transition"
              >
                <i
                  className={`fas fa-heart ${isInWishlist(product.id) ? "text-red-500" : "text-gray-600"}`}
                ></i>
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-black italic text-white mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-[#d4af37] mb-6">
              ${product.price}{" "}
              <span className="text-gray-500 text-lg font-normal">/ piece</span>
            </p>

            {/* Stock Badge */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  product.stock > 10
                    ? "bg-green-500/20 text-green-400"
                    : product.stock > 0
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }`}
              >
                {product.stock > 10
                  ? "✓ In Stock"
                  : product.stock > 0
                    ? `⚠ Only ${product.stock} left`
                    : "✗ Out of Stock"}
              </span>
              <span className="text-gray-500 text-sm">
                <i className="fas fa-shipping-fast mr-1"></i> Worldwide Shipping
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed mb-8">
              Genuine {product.name} for all major brands. High-quality OEM
              replacement part with warranty. Compatible with multiple vehicle
              models. Contact us for exact fitment details.
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-[#d4af37]/50 rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-[#d4af37] hover:bg-[#d4af37]/10 transition"
                >
                  -
                </button>
                <span className="px-4 py-2 text-white font-bold w-12 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-4 py-2 text-[#d4af37] hover:bg-[#d4af37]/10 transition"
                >
                  +
                </button>
              </div>
              <span className="text-gray-500 text-sm">
                Total:{" "}
                <span className="text-white font-bold">
                  ${product.price * qty}
                </span>
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-xl font-black uppercase text-sm tracking-tighter transition-all ${
                  added
                    ? "bg-green-500 text-white"
                    : product.stock === 0
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-[#d4af37] text-black hover:bg-white"
                }`}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl font-black uppercase text-sm tracking-tighter bg-[#25D366] text-white hover:bg-[#1da851] transition text-center flex items-center justify-center gap-2"
              >
                <i className="fab fa-whatsapp"></i> Order on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold uppercase italic mb-6 text-white">
              Related <span className="text-[#d4af37]">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
