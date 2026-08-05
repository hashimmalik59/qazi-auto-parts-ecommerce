import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useProducts } from "../hooks/useProducts"; // ✅ Naya import
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts(); // ✅ Firestore se products fetch karo
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } =
    useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-4xl text-[#d4af37]"></i>
      </div>
    );
  }

  // ✅ Product ko Firestore ke products array mein se dhundho
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-400">Product not found</h2>
        <Link to="/products" className="mt-4 text-[#d4af37] hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    showToast(`${product.name} added to cart!`, "success");
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(product.id);
      showToast(`${product.name} added to wishlist!`, "success");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-[#d4af37]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-[#d4af37]">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#d4af37]">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left: Images */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-[#0a0a0a] border-2 border-[#d4af37]/30 rounded-2xl p-4 md:p-8 flex items-center justify-center h-64 md:h-96">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.src = "/Assets/placeholder.png";
              }}
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-4 md:space-y-6">
          <div>
            <p className="text-[10px] text-[#d4af37] uppercase tracking-widest font-bold mb-1">
              Genuine Spare Part
            </p>
            <h1 className="text-3xl md:text-4xl font-black italic text-[#d4af37]">
              {product.name}
            </h1>
            <p className="text-sm text-gray-400 mt-1">SKU: {product.sku}</p>
          </div>

          <div className="border-t border-[#333] pt-4">
            <p className="text-white text-3xl font-bold">
              ${product.price}{" "}
              <span className="text-gray-500 text-lg font-normal">/ pc</span>
            </p>
          </div>

          <div className="border-t border-[#333] pt-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              {product.description ||
                "Premium quality auto spare part. Manufactured to meet or exceed OEM specifications."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-lg font-black text-sm uppercase tracking-tighter transition-all ${added ? "bg-green-500 text-white" : "bg-[#d4af37] text-black hover:bg-yellow-500"}`}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            <button
              onClick={handleWishlistToggle}
              className="px-4 py-3 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
            >
              <i
                className={`fas fa-heart ${isInWishlist(product.id) ? "text-red-500" : ""}`}
              ></i>
            </button>

            <a
              href={`https://wa.me/8615158939407?text=Hi, I want to order ${encodeURIComponent(product.name)} (SKU: ${product.sku})`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
