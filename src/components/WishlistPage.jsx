import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { Link, useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useCart();
  const navigate = useNavigate();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="animate-fade-in pt-10 pb-24 md:pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black italic text-[#d4af37] mb-8">
          My Wishlist ({wishlist.length})
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-heart text-6xl text-gray-800 mb-6"></i>
            <p className="text-gray-400 text-lg mb-4">No saved products yet</p>
            <Link
              to="/products"
              className="bg-[#d4af37] text-black px-8 py-3 rounded-full font-bold hover:bg-white transition inline-block"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="bg-black border-2 border-[#d4af37]/30 rounded-2xl overflow-hidden relative hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all duration-400"
              >
                <div className="h-48 bg-[#0a0a0a] flex items-center justify-center p-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.src = "/Assets/placeholder.png";
                    }}
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-extrabold text-[#d4af37] italic mb-2">
                    {p.name}
                  </h3>
                  <p className="text-white font-bold mb-3">${p.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="flex-1 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs hover:bg-white transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="px-3 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
