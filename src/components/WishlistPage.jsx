import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../hooks/useProducts"; // ✅ Naya import
import { useToast } from "../context/ToastContext";

export default function WishlistPage() {
  const { wishlist, wishlistCount, clearWishlist, removeFromWishlist } =
    useCart();
  const { user } = useAuth();
  const { products, loading } = useProducts(); // ✅ Firestore se products fetch karo
  const { showToast } = useToast();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-400">
        <i className="fas fa-heart text-6xl mb-4 text-[#d4af37]"></i>
        <p className="text-xl font-bold mb-2">
          Please login to view your wishlist
        </p>
        <Link
          to="/login"
          className="bg-[#d4af37] text-black font-bold py-2 px-6 rounded-lg hover:bg-white transition"
        >
          Login
        </Link>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-400">
        <i className="fas fa-heart text-6xl mb-4 text-gray-600"></i>
        <p className="text-xl font-bold mb-2">Your wishlist is empty</p>
        <Link
          to="/products"
          className="bg-[#d4af37] text-black font-bold py-2 px-6 rounded-lg hover:bg-white transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-black italic text-[#d4af37]">
            My Wishlist
          </h2>
          <p className="text-gray-400">{wishlistCount} items saved</p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={async () => {
              if (
                window.confirm(
                  "Are you sure you want to clear your entire wishlist?",
                )
              ) {
                await clearWishlist();
                showToast("Wishlist cleared!", "info");
              }
            }}
            className="px-4 py-2 bg-red-600/20 border border-red-500 text-red-500 font-bold text-sm rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map((productId) => {
          const product = products.find((p) => p.id === productId);
          if (!product) return null;
          return (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                  showToast("Removed from wishlist", "info");
                }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕ Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
