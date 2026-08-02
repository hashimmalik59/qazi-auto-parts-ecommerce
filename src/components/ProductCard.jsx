import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, isWishlisted, toggleWishlist } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="bg-black border-2 border-[#d4af37]/30 rounded-2xl overflow-hidden cursor-pointer group relative hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all duration-400"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Badges */}
      {product.badge === "popular" && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 animate-pulse">
          🔥 TOP
        </span>
      )}
      {product.badge === "searched" && (
        <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
          🔍 SEARCHED
        </span>
      )}

      {/* Image */}
      <div className="h-48 bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/Assets/placeholder.png";
          }}
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-[#d4af37] transition z-20"
        >
          <i
            className={`fas fa-heart ${isWishlisted(product.id) ? "text-red-500" : "text-gray-400"}`}
          ></i>
        </button>
      </div>

      {/* Info */}
      <div className="p-5 text-center">
        <p className="text-[10px] text-[#d4af37] uppercase tracking-widest font-bold mb-1">
          Genuine Spare Part
        </p>
        <h3 className="text-lg font-extrabold text-[#d4af37] italic mb-2">
          {product.name}
        </h3>
        <p className="text-white font-bold text-xl mb-3">
          ${product.price}{" "}
          <span className="text-gray-600 text-sm font-normal">/ pc</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className={`flex-1 py-2 rounded-lg font-extrabold text-xs uppercase tracking-tighter transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-[#d4af37] text-black hover:bg-yellow-500"
            }`}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>

          <a
            href={`https://wa.me/8615158939407?text=Hi, I want to order ${encodeURIComponent(product.name)} (SKU: ${product.sku})`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-2 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition text-xs flex items-center justify-center"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
